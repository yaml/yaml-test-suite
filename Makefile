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
	perl bin/generate-data $<
	@touch $@

update: doc

doc: ReadMe.pod

ReadMe.pod: doc/yaml-dev-kit.swim
	swim --to=pod --complete < $< > $@
