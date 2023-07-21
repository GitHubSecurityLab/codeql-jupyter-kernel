from .context import codeql_kernel as ck

client = ck.CLIClient()
test_db = "tests/codeql_db"
test_query = "tests/query.ql"
test_bqrs = "tests/test.bqrs"

# def test_resolve_non_exitent_database():
#     (err, resp) = client.resolve_database("foo")
#     assert err
#     assert not resp
#     assert err.startswith("A fatal error occurred: Database root ")

def test_resolve_ram():
    (err, res) = client.resolve_ram()
    assert not err
    assert any("Xmx" in opt for opt in res)

def test_resolve_metadata():
    (err, res) = client.resolve_metadata(test_query)
    assert not err
    assert res == { "kind": "path-problem", "id": "test"}

def test_resolve_database():
    (err, res) = client.resolve_database(test_db)
    assert not err
    assert res["sourceLocationPrefix"].endswith("tests/db")
    assert "columnKind"  in res.keys()
    assert "unicodeNewlines"  in res.keys()
    assert res["sourceArchiveZip"].endswith("tests/codeql_db/src.zip")
    assert res["sourceArchiveRoot"].endswith("tests/codeql_db/src")
    assert res["datasetFolder"].endswith("tests/codeql_db/db-python")
    assert res["logsFolder"].endswith("tests/codeql_db/log")
    assert res["languages"][0] == "python"
    assert res["scratchDir"].endswith("tests/codeql_db/working")

def test_resolve_library_path():
    (err, res) = client.resolve_library_path(test_query)
    assert not err and res
    assert res["libraryPath"][0].endswith("/tests")
    assert "python" in res["libraryPath"][1]
    assert res["dbscheme"].endswith("semmlecode.python.dbscheme")
    assert res["compilationCache"][0].endswith("tests/.cache")
    assert res["relativeName"] == "test/query.ql"
    assert res["qlPackName"] == "test"

def test_bqrs_info():
    (err, res) = client.bqrs_info(test_bqrs)
    assert not err
    assert res == {
        "compatible-query-kinds": ["Table", "Tree", "Graph"],
        "result-sets": [
            {
                "columns": [{"kind": "e", "name": "ma"}],
                "name": "#select",
                "rows": 1
            }
        ]
    }

def test_bqrs_decode():
    (err, res) = client.bqrs_decode(test_bqrs)
    assert not err
    assert res
    assert "URL for ma" in res

def test_consequent_requests():
    (err1, res1) = client.resolve_metadata(test_query)
    (err2, res2) = client.resolve_metadata(test_query)
    assert not err1 and not err2
    assert res1 == res2 and res1 == { "kind": "path-problem", "id": "test"}
