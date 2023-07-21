import logging
import os
import tempfile
import time
from subprocess import PIPE, Popen
from typing import Optional, Tuple

from .jsonrpc import RPC as JSONRPC
from .rawrpc import RPC as RawRPC


class CLIClient:
    """
    Represents a JSONRPC client to connect to CodeQL CLI Server
    """

    def __init__(self):
        self.cache = {"ram": []}
        self.conn = RawRPC(
            [
                "codeql",
                "execute",
                "cli-server",
                "--logdir",
                "/tmp/codeql_kernel_cliserver",
            ]
        )

    def stop(self):
        self.conn.stop()

    def resolve_ram(self) -> Tuple[Optional[str], Optional[list]]:
        if self.cache.get("ram"):
            return (None, self.cache.get("ram"))
        else:
            cmd = ["resolve", "ram", "--format=json"]
            (err, result) = self.conn.request(cmd)
            if err:
                return (err, None)
            self.cache["ram"] = [x for x in result if x.startswith("-J")]
            return (None, self.cache.get("ram"))

    def resolve_metadata(self, query) -> Tuple[Optional[str], dict]:
        cmd = ["resolve", "metadata", "--format=json", query]
        return self.conn.request(cmd)

    def resolve_database(self, db_path) -> Tuple[Optional[str], dict]:
        cmd = ["resolve", "database", "--format=json", db_path]
        return self.conn.request(cmd)

    def resolve_library_path(self, query) -> Tuple[Optional[str], Optional[dict]]:
        cmd = ["resolve", "library-path", "--format=json", "--query", query]
        return self.conn.request(cmd)

    def bqrs_info(self, bqrs_path) -> Tuple[Optional[str], dict]:
        cmd = ["bqrs", "info", "--format=json", bqrs_path]
        return self.conn.request(cmd)

    def bqrs_decode(self, bqrs_path) -> Tuple[Optional[str], Optional[str]]:
        (err, ram_opts) = self.resolve_ram()
        if err or not ram_opts:
            return (f"Error resolving ram options {err}", None)
        results_path = tempfile.NamedTemporaryFile(delete=False)
        cmd = [
            "bqrs",
            "decode",
            "--format=csv",
            f"-o={results_path.name}",
            "--entities=string,url",
            bqrs_path,
        ]
        cmd.extend(ram_opts)
        (err, _) = self.conn.request(cmd)
        if err:
            return (f"Error decoding bqrs file {err}", None)
        if os.path.exists(results_path.name):
            with open(results_path.name, "r") as f:
                data = f.read()
                # return json.loads(data)
                return (None, data)
        else:
            return ("Error decoding results", None)


class QueryClient:
    """
    Represents a JSONRPC client to connect to CodeQL Query Server
    """

    def __init__(self, on_progress=None, on_result=None):
        self._cli_client: CLIClient = CLIClient()
        cmd = ["codeql", "execute", "query-server2", "--threads=0", "--evaluator-log-level", "5"]
        # debug
        # cmd.extend(["--debug", "--tuple-counting", "-v", "--log-to-stderr"])
        # --save-cache --max-disk-cache XX
        (err, ram_opts) = self._cli_client.resolve_ram()
        if err or not ram_opts:
            return (f"Error resolving ram options {err}", None)
        cmd.extend(ram_opts)
        self._proc = Popen(cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE)
        handlers = {}
        if on_progress:
            handlers["ql/progressUpdated"] = on_progress
        self._conn = JSONRPC(
            handlers=handlers, stdout=self._proc.stdin, stdin=self._proc.stdout
        )
        self._progress_id = 0
        self._evaluate_id = 0
        self._db_metadata = {}
        # TODO: wait for query server to be ready
        time.sleep(2)

    def stop(self):
        if self._proc.stdin:
            self._proc.stdin.close()
        if self._proc.stdout:
            self._proc.stdout.close()
        self._proc.terminate()
        self._proc.wait()
        if self._cli_client:
            self._cli_client.stop()

    def next_progress_id(self) -> int:
        self._progress_id += 1
        return self._progress_id

    def next_evaluate_id(self) -> int:
        self._evaluate_id += 1
        return self._evaluate_id

    def register_database(self, db_path) -> Optional[str]:
        """
        Register a database with the query server
        """
        if not db_path.endswith("/"):
            db_path = db_path + "/"
        if not os.path.isdir(db_path):
            return f"Database path {db_path} is not a directory"

        (err, db_metadata) = self._cli_client.resolve_database(db_path)
        if err:
            return "Failed to resolve database metadata"

        # TODO: implement on-the-fly query patching

        params = {
            "body": {
                "databases": [db_path],
                "progressId": self.next_progress_id(),
            }
        }
        (err, _) = self._conn.request("evaluation/registerDatabases", args=params)

        if err:
            return err

        self._db_metadata = db_metadata
        self._db_metadata["path"] = db_path

        return None

    def run_query(
        self, query_path, quick_eval={}
    ) -> Tuple[Optional[str], Optional[str]]:
        logging.info(f"Running query {query_path}")
        bqrs_path = tempfile.NamedTemporaryFile(suffix=".bqrs").name
        target = {"query": {"xx": ""}}
        if bool(quick_eval):
            target = {
                "quickEval": {
                    "quickEvalPos": {
                        "fileName": query_path,
                        "line": quick_eval.get("startLine"),
                        "column": quick_eval.get("startColumn"),
                        "endLine": quick_eval.get("endLine"),
                        "endColumn": quick_eval.get("endColumn"),
                    }
                }
            }

        run_queries_params = {
            "body": {
                "db": self._db_metadata["path"],
                # TODO: get additional packs from ENV, command, config, etc.
                "additionalPacks": ["/Users/pwntester/src/github.com/github/codeql"],
                "externalInputs": [],
                "singletonExternalInputs": [],  # opts.templateValues or {},
                "outputPath": bqrs_path,
                "queryPath": query_path,
                "target": target,
            },
            "progressId": self.next_progress_id(),
        }

        (err, resp) = self._conn.request(
            "evaluation/runQuery", args=run_queries_params
        )

        if resp and resp["resultType"] != 0:
            return (resp["message"], None)

        if err:
            return (str(err), None)

        if os.path.exists(bqrs_path):
            (err, bqrs_info) = self._cli_client.bqrs_info(bqrs_path)
            if err:
                return (err, "")
            if not bqrs_info or not bqrs_info["result-sets"]:
                return ("Failed to get bqrs info", "")
            count = bqrs_info["result-sets"][0]["rows"]
            for result_set in bqrs_info["result-sets"]:
                if result_set["name"] == "#select":
                    count = result_set["rows"]
            if count > 0:
                return self._cli_client.bqrs_decode(bqrs_path)
            else:
                return (None, "No results")
        else:
            return (f"Failed to find results file at {bqrs_path}", "")
