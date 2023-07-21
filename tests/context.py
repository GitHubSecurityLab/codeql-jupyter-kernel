""" Gives the test suite access to the code in the codelql kernel package.

This is just copied from and as recommended in the Hitchhicker's Guide to 
Python, see 
http://docs.python-guide.org/en/latest/writing/structure/#test-suite
"""

import os
import sys


sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import codeql_kernel
