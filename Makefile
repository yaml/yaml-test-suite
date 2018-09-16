export PATH := $(PWD)/node_modules/.bin:$(PATH)

MATRIX_REPO ?= git@github.com:perlpunk/yaml-test-matrix

default: help

help:
	@grep -E '^[-a-zA-Z0-9]+:' Makefile | cut -d: -f1

update: doc node_modules
	rm -fr test/name/ test/tags/
	bin/generate-links test/*.tml
	git add -A -f test/

.PHONY: doc
doc: ReadMe.pod

ReadMe.pod: doc/yaml-test-suite.swim
	swim --to=pod --complete --wrap < $< > $@

#------------------------------------------------------------------------------
data:
	git worktree add -f $@ $@

data-update: data node_modules
	rm -fr data/*
	bin/generate-data test/*.tml

data-status:
	@(cd data; git add -Af .; git status --short)

data-diff:
	@(cd data; git add -Af .; git diff --cached)

data-push:
	@[ -z "$$(cd data; git status --short)" ] || { \
	    cd data; \
	    git add -Af .; \
	    COMMIT=`cd ..; git rev-parse --short HEAD` ; \
	    git commit -m "Regenerated data from master $$COMMIT"; \
	    git push origin data; \
	}

node_modules:
	mkdir $@
	npm install coffeescript js-yaml jyj lodash testml-compiler
	rm -f package*

#------------------------------------------------------------------------------
matrix:
	git clone $(MATRIX_REPO) $@

matrix-build: matrix
	make -C $< $(@:matrix-%=%)

matrix-push: matrix-copy
	( \
	    cd gh-pages && \
	    git add -A . && \
	    git commit -m 'Regenerated matrix files' && \
	    git push \
	)

matrix-status:
	( \
	    cd gh-pages && \
	    git status \
	)

matrix-copy: gh-pages
	rm -fr gh-pages/css \
	       gh-pages/js \
	       gh-pages/*.html \
	       gh-pages/details \
	       gh-pages/sheet
	cp -r matrix/matrix/html/css \
	      matrix/matrix/html/js \
	      matrix/matrix/html/details \
	      matrix/matrix/html/sheet/ \
	      matrix/matrix/html/*.html \
	      $<

gh-pages:
	git worktree add $@ $@

#------------------------------------------------------------------------------
clean:
	rm -fr data matrix gh-pages
	rm -fr node_modules
	rm -f package*
	git worktree prune

.PHONY: test
test:
	@echo "We don't run tests here."
