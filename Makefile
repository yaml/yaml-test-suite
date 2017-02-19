MATRIX_REPO ?= git@github.com:perlpunk/yaml-test-matrix

default: help

help:
	@grep -E '^[-a-zA-Z0-9]+:' Makefile | cut -d: -f1

update: doc
	rm -fr test/name/ test/tags/
	perl bin/generate-links

.PHONY: doc
doc: ReadMe.pod

ReadMe.pod: doc/yaml-test-suite.swim
	swim --to=pod --complete --wrap < $< > $@

#------------------------------------------------------------------------------
data:
	git clone $$(git config remote.origin.url) -b data $@

data-update: data
	perl bin/generate-data

data-status:
	@(cd data; git add -Af .; git status --short)

data-diff:
	@(cd data; git add -Af .; git diff --cached)

data-push:
	@[ -z "$$(cd data; git status --short)" ] || { \
	    cd data; \
	    git add -Af .; \
	    git commit -m 'Regenerated data files'; \
	    git push --force origin data; \
	}

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
	       gh-pages/*.html
	cp -r matrix/matrix/html/css \
	      matrix/matrix/html/js \
	      matrix/matrix/html/*.html \
	      $<

gh-pages:
	git clone $$(git config remote.origin.url) -b $@ $@

#------------------------------------------------------------------------------
clean:
	rm -fr data matrix gh-pages

.PHONY: test
test:
	@echo "We don't run tests here."
