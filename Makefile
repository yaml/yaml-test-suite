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
	rm -fr docker/yaml-pegex-pm
	git clean -dxf

docker-build: docker/yaml-pegex-pm
	docker build -t yaml/yaml-test-suite docker

docker-shell: docker-build
	docker run -it -v $$PWD:/yaml-test-suite yaml/yaml-test-suite bash

docker-push:
	docker push yaml/yaml-test-suite

docker/yaml-pegex-pm:
	cp -r ../${@:docker/%=%} $@
