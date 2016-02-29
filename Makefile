.PHONY: data doc
ALL_TML := $(shell echo test/*.tml)
ALL_DATA := $(ALL_TML:test/%.tml=data/%)

default: help

help:
	@echo 'data - Generate data/ files from test/ files'
	@echo 'doc - Generate the docs'
	@echo 'help   - Show help'

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

update: doc

doc: ReadMe.pod

ReadMe.pod: doc/yaml-dev-kit.swim
	swim --to=pod --complete < $< > $@

data-status:
	@(cd data; git add -A .; git status --short)

data-diff:
	@(cd data; git add -A .; git diff --cached)

data-push:
	@[ -z "$$(cd data; git status --short)" ] || { \
	    cd data; \
	    git add -A .; \
	    git commit -m 'Regenerated data files'; \
	    git push origin data; \
	}

clean:
	rm -fr data
