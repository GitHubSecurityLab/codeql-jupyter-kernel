# Note: This is meant for codeql_kernel developer use only
.PHONY: data-files build install clean test

data-files: clean
	mkdir -p jupyter-data/share/jupyter/kernels/codeql
	cp codeql_kernel/kernel.json jupyter-data/share/jupyter/kernels/codeql
	cp codeql_kernel/images/* jupyter-data/share/jupyter/kernels/codeql/

install: data-files
	python3 build_treesitter.py
	pip3 install -e ".[test]"

clean:
	rm -rf jupyter-data
	rm -rf build
	rm -rf dist


build: data-files
	pip3 install build twine
	python3 -m build .
	twine check --strict dist/*

test: clean
	pytest
	make clean
