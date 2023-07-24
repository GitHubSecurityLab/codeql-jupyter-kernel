# CodeQL kernel for Jupyter

A [Jupyter](http://jupyter.org/) kernel for executing CodeQL queries.

![image](https://github.com/GitHubSecurityLab/codeql-jupyter-kernel/assets/125701/e5a51347-c719-490a-bfd4-060f4c2920cd)

## Requirements
- [Jupyter](https://jupyter.org/)
- [CodeQL CLI binaries](https://github.com/github/codeql-cli-binaries)

## Local Installation 

To install from a git checkout, run:

```bash
$ pip install jupyter jupyterlab tree_sitter
$ make install
```

Verify installation:

Run `jupyter kernelspec list` and check that `codeql` is available as a Jupyter kernel:

```bash
$ jupyter kernelspec list      
Available kernels:
  codeql     /Users/pwntester/.pyenv/versions/3.8.13/share/jupyter/kernels/codeql
  python3    /Users/pwntester/.pyenv/versions/3.8.13/share/jupyter/kernels/python3
```

# Highlight extension

Jupyter-lab extension to highlight CodeQL syntax

## Local Installation

```bash
cd jupyterlab-codeql-highlight
npm install
jupyter labextension link .
```

# Commands

- `%set_database <CodeQL DB directory>`: Sets the Database for analysis.

# Example

```bash
cd example
jupyter-lab test.ipynb
```

Wait for each cell to run before running other cells.

# Disclaimer

This is an experimental project not maintained by the GitHub CodeQL teams.
Any contributions are welcomed!
