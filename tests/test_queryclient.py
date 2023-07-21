from .context import codeql_kernel as ck

test_db = "tests/codeql_db"
test_query = "tests/query.ql"
query_client = ck.QueryClient()

def test_register_database():
    (err, resp) = query_client.register_database(test_db)
    assert resp
    assert not err
    assert query_client._db_metadata
    assert query_client._db_metadata["datasetFolder"].endswith(test_db + "/db-python")

def test_run_query():
    query_client.register_database(test_db)
    (err, resp) = query_client.run_query(test_query)
    assert not err
    assert "URL for ma" in resp
