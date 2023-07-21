# Note: This is meant for codeql_kernel developer use only
.PHONY: data-files build install clean test

data-files: clean
	mkdir -p jupyter-data/share/jupyter/kernels/codeql
	cp codeql_kernel/kernel.json jupyter-data/share/jupyter/kernels/codeql
	cp codeql_kernel/images/* jupyter-data/share/jupyter/kernels/codeql/

install: data-files
	python build_treesitter.py
	pip install -e ".[test]"

clean:
	rm -rf jupyter-data
	rm -rf build
	rm -rf dist


build: data-files
	pip install build twine
	python -m build .
	twine check --strict dist/*

test: clean
	pytest
	make clean
