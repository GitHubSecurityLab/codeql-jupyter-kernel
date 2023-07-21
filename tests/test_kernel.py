import unittest
import jupyter_kernel_test

class MyKernelTests(jupyter_kernel_test.KernelTests):

    kernel_name = "codeql"
    language_name = "codeql"

    def test_codeql_kernel_register_database(self):
        self.flush_channels()
        reply, output_msgs = self.execute_helper(code='%set_database tests/codeql_db')
        self.assertEqual(output_msgs[0]["content"]["wait"], True)
        self.assertIn("Registering database ...", output_msgs[1]["content"]["data"]["text/plain"])
        self.assertEqual(output_msgs[2]["content"]["wait"], True)
        self.assertIn("Database registered!", output_msgs[3]["content"]["data"]["text/plain"])

if __name__ == '__main__':
    unittest.main()
