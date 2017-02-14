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
	git clone $$(git config remote.origin.url) -b matrix $@

matrix-build: matrix
	make -C $< all

matrix-push: matrix
	make -C $< push

#------------------------------------------------------------------------------
clean:
	rm -fr data matrix

.PHONY: test
test:
	@echo "We don't run tests here."
