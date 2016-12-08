.PHONY: data doc
ALL_TML := $(shell echo test/*.tml)
ALL_DATA := $(ALL_TML:test/%.tml=data/%)

default: help

help:
	@echo 'all - doc data'
	@echo 'doc - Generate the docs'
	@echo 'data - Generate data/ files from test/ files'
	@echo 'help   - Show help'

all: doc data

doc: ReadMe.pod

ReadMe.pod: doc/yaml-test-suite.swim
	swim --to=pod --complete --wrap < $< > $@

data: $(ALL_DATA)

data/%: test/%.tml
	@[ -d data ] || { \
	    git clone $$(git config remote.origin.url) -b data data; \
	    sleep 1; \
	    touch test/*.tml; \
	}
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

clean:
	rm -fr data libyaml-parser

docker-build:
	docker build -t yaml/yaml-test-suite .

docker-shell: docker-build
	docker run -it yaml/yaml-test-suite bash

test: data libyaml-parser/libyaml-parser
	bin/test-libyaml-parser.sh

libyaml-parser/libyaml-parser: libyaml-parser
	(cd $<; make build)

libyaml-parser:
	git clone https://github.com/ingydotnet/$@ $@
