import os
from io import StringIO
from tempfile import mkdtemp, mkstemp

import pandas as pd
import tree_sitter
from IPython.display import HTML
from metakernel import MetaKernel
import subprocess

from .codeql import QueryClient

__version__ = "0.0.1"


class CodeQLKernel(MetaKernel):
    implementation = "CodeQL Kernel"
    implementation_version = "1.0"
    language = "ql"
    language_version = "0.1"
    banner = "CodeQL Kernel - Experimental"
    language_info = {
        "mimetype": "text/x-codeql",
        "name": "codeql",
        "file_extension": ".ql",
        "help_links": MetaKernel.help_links,
    }

    def __init__(self, **kwargs):
        # get absolute path of running script
        here = os.path.dirname(os.path.abspath(__file__))
        self.QL_LANGUAGE = tree_sitter.Language(
            os.path.join(here, "tree-sitter-ql.so"), "ql"
        )
        self._select_query = self.QL_LANGUAGE.query(
            "(moduleMember (select)) @select_statement"
        )
        self._predicate_query = self.QL_LANGUAGE.query(
            """(moduleMember
                (annotation name: (annotName) @aname (#eq? @aname "query")).
                (classlessPredicate name: (predicateName) @pname)
               ) @annotated_query """
        )
        self._parser = tree_sitter.Parser()
        self._parser.set_language(self.QL_LANGUAGE)
        self._context = ""

        def on_progress(obj):
            self.Display(obj["message"], clear_output=True)

        def on_result(obj):
            self.Display(
                f"Query completed in {obj['evaluationTime']}!", clear_output=True
            )

        self._query_client: QueryClient = QueryClient(
            on_progress=on_progress, on_result=on_result
        )
        MetaKernel.__init__(self, **kwargs)
        print(kwargs)

    def get_usage(self):
        return "This is the CodeQL kernel."

    def parse_cell(self, cell):
        """
        parse the cell code using tree-sitter

        """
        tree = self._parser.parse(bytes(cell, "utf8"))
        select_statements = []
        query_predicates = []
        captures = self._select_query.captures(tree.root_node)
        for capture in captures:
            # capture[0] is the node, capture[1] is the capture name
            if capture[1] == "select_statement":
                start_point = capture[0].start_point
                end_point = capture[0].end_point
                select_statements.append((start_point, end_point))

        captures = self._predicate_query.captures(tree.root_node)
        for capture in captures:
            # capture[0] is the node
            # capture[1] is the capture name
            if capture[1] == "annotated_query":
                start_point = capture[0].start_point
                end_point = capture[0].end_point
                # extract the annotation name
                # check if its a query predicate
                for i, line in enumerate(cell.split("\n")):
                    if i == start_point[0]:
                        if (line[start_point[1]: start_point[1] + len("query")] == "query"):
                            query_predicates.append((start_point, end_point))
        return (select_statements, query_predicates)

    def evaluate(self, code, quick_eval=None):
        """
        Evaluate the given code and return the result.
        """
        try:
            if not self._query_client._db_metadata:
                self.Error_display("No database registered! Use %set_database to register a database.")
                return

            # create a temporary directory to hold the query pack and the query
            qlpack = "\n".join(
                [
                    "---",
                    "library: false",
                    "name: jupyter-kernel/temporary-qlpack",
                    "version: 0.0.1",
                    "dependencies:",
                    "  codeql/{}-all: '*'",
                    "",
                ]
            ).format(self._query_client._db_metadata["languages"][0])
            tmp_dir = mkdtemp(dir="/tmp", prefix="codeql_kernel")
            with open(os.path.join(tmp_dir, "qlpack.yml"), "w") as f:
                f.write(qlpack)
            subprocess.run("codeql pack install", cwd=tmp_dir, shell=True)
            fd, query_path = mkstemp(suffix=".ql", dir=tmp_dir, text=True)
            os.write(fd, bytearray(code, "utf-8"))
            os.close(fd)
            self.Display("Running query ...", clear_output=True)
            (err, resp) = self._query_client.run_query(
                query_path, quick_eval=quick_eval
            )
            if err:
                self.clear_output(wait=True)
                self.Error_display(
                    "Error running query: {}".format(err)
                )
            else:
                csv = StringIO(resp)
                chunks = (chunk for chunk in pd.read_csv(csv, chunksize=5000))
                df = pd.concat(chunks)
                self.Display(HTML(df.to_html()), clear_output=True)

        except Exception as e:
            self.Error_display("Error running query: {}".format(e))

    def do_execute_direct(self, code):
        """
        Execute the given code directly.
        """
        (select_statements, query_predicates) = self.parse_cell(code)
        if len(query_predicates) == 1 and len(select_statements) == 0:
            # we have exactly one query predicate:
            # add cell to the context and evaluate the query predicate
            offset = len(self._context.split("\n"))
            self._context += code + "\n"
            predicate = query_predicates[0][0]
            pred_line = predicate[0]
            pred_col = predicate[1]
            cell_lines = code.split("\n")
            words = cell_lines[pred_line].strip().split(" ")
            position = {
                "startLine": offset + pred_line,
                "endLine": offset + pred_line,
                "startColumn": pred_col + len(words[0]) + len(words[1]) + 3,
                "endColumn": pred_col + len(words[0]) + len(words[1]) + 3,
            }
            self.Display("Evaluating predicate '" + words[2].split("(")[0] + "'", clear_output=True)
            self.evaluate(self._context, quick_eval=position)
        elif len(select_statements) == 1:
            # we have exactly one select statement:
            # add cell to the context and evaluate the whole context
            self._context += code + "\n"
            self.Display("Evaluating select statement ...", clear_output=True)
            self.evaluate(self._context)
        else:
            self._context += code + "\n"

    def repr(self, data):
        return repr(data)

    def do_shutdown(self, restart):
        if self._query_client:
            self._query_client.stop()
        if restart:
            self.Print("Restarting kernel...")
            self.reload_magics()
            self.restart_kernel()
            self.Print("Done!")
        super(CodeQLKernel, self).do_shutdown(restart)


if __name__ == "__main__":
    CodeQLKernel.run_as_main()
