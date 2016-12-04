.PHONY: data doc
ALL_TML := $(shell echo test/*.tml)
ALL_DATA := $(ALL_TML:test/%.tml=data/%)
ALL_SWIM := $(shell echo doc/guide/*.swim)
ALL_GUIDE := $(ALL_SWIM:doc/guide/%.swim=guide/%.pod) guide/ReadMe.pod

default: help

help:
	@echo 'all - doc data guide'
	@echo 'doc - Generate the docs'
	@echo 'data - Generate data/ files from test/ files'
	@echo 'guide - Generate guide/ files from doc/guide/ files'
	@echo 'help   - Show help'

all: doc data guide

doc: ReadMe.pod

ReadMe.pod: doc/yaml-dev-kit.swim
	swim --to=pod --meta=guide/Meta --complete --wrap < $< > $@

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

guide: $(ALL_GUIDE)

guide/%.pod: doc/guide/%.swim
	@[ -d guide ] || { \
	    git clone $$(git config remote.origin.url) -b guide guide; \
	    sleep 1; \
	    touch doc/guide/*.swim; \
	}
	swim --to=pod --meta=guide/Meta --complete --wrap < $< > $@

guide/ReadMe.pod: doc/guide/index.swim
	swim --to=pod --meta=guide/Meta --complete --wrap < $< > $@

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

guide-status:
	@(cd guide; git add -Af .; git status --short)

guide-diff:
	@(cd guide; git add -Af .; git diff --cached)

guide-push:
	@[ -z "$$(cd guide; git status --short)" ] || { \
	    cd guide; \
	    git add -Af .; \
	    git commit -m 'Regenerated guide files'; \
	    git push --force origin guide; \
	}

clean:
	rm -fr data guide

docker-build:
	docker build -t yaml/yaml-test-suite .

docker-shell: docker-build
	docker run -it yaml/yaml-test-suite bash

# test: data libyaml-parser/libyaml-parser
# 	bin/test-libyaml-parser.sh
# 
# data:
# 	git clone $$(git config --get remote.origin.url) data --branch=data
# 
# libyaml-parser/libyaml-parser: libyaml-parser
# 	(cd $<; make build)
# 
# libyaml-parser:
# 	git clone https://github.com/ingydotnet/$@ $@
