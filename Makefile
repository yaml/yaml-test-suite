.PHONY: data doc
ALL_TML := $(shell echo test/*.tml)
ALL_DATA := $(ALL_TML:test/%.tml=data/%)
ALL_SWIM := $(shell echo doc/guide/*.swim)
ALL_GUIDE := $(ALL_SWIM:doc/guide/%.swim=guide/%.pod)

default: help

help:
	@echo 'all - doc data guide'
	@echo 'doc - Generate the docs'
	@echo 'data - Generate data/ files from test/ files'
	@echo 'guide - Generate guide/ files from doc/guide/ files'
	@echo 'help   - Show help'

doc: ReadMe.pod

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

guide/%.pod: doc/guide/*.swim
	@[ -d guide ] || { \
	    git clone $$(git config remote.origin.url) -b guide guide; \
	    sleep 1; \
	    touch doc/guide/*.swim; \
	}
	swim --to=pod --meta=guide/Meta --complete --wrap < $< > $@

ReadMe.pod: doc/yaml-dev-kit.swim
	swim --to=pod --complete --wrap < $< > $@

data-status:
	@(cd data; git add -Af .; git status --short)

data-diff:
	@(cd data; git add -Af .; git diff --cached)

data-push:
	@[ -z "$$(cd data; git status --short)" ] || { \
	    cd data; \
	    git add -Af .; \
	    git commit -m 'Regenerated data files'; \
	    git push origin data; \
	}

clean:
	rm -fr data
