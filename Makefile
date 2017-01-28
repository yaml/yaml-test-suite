.PHONY: data doc
ALL_TML := $(shell echo test/*.tml)
ALL_DATA := $(ALL_TML:test/%.tml=data/%)

default: help

help:
	@echo 'all - doc data'
	@echo 'doc - Generate the docs'
	@echo 'data - Generate data/ files from test/ files'
	@echo 'help - Show help'

all: doc data

doc: ReadMe.pod

ReadMe.pod: doc/yaml-test-suite.swim
	swim --to=pod --complete --wrap < $< > $@

#------------------------------------------------------------------------------
.PHONY: matrix
matrix: gh-pages
	mkdir -p matrix
	for f in `YAML_EDITOR=$$PWD/../yaml-editor ./bin/run-framework-tests -l`; \
	    do YAML_EDITOR=$$PWD/../yaml-editor ./bin/run-framework-tests $$f; done
	./bin/create-matrix
	rm -fr gh-pages/*.html gh-pages/css/
	cp -r $@/html/*.html $@/html/css/ gh-pages/

gh-pages:
	git clone $$(git config remote.origin.url) -b $@ $@

matrix-push:
	@[ -z "$$(cd gh-pages; git status --short)" ] || { \
	    cd gh-pages; \
	    git add -Af .; \
	    git commit -m 'Regenerated matrix files'; \
	    git push --force origin gh-pages; \
	}

#------------------------------------------------------------------------------
.PHONY: data
data: clean-data $(ALL_DATA)

clean-data:
	@[ -d data ] || { \
	    git clone $$(git config remote.origin.url) -b data data; \
	    sleep 1; \
	    touch test/*.tml; \
	}
	rm -fr data/*

data/%: test/%.tml
	@rm -fr $@
	perl bin/generate-data $<
	@touch $@

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
clean:
	rm -fr data matrix
	git clean -dxf

.PHONY: test
test:
	@echo "We don't run tests here."
