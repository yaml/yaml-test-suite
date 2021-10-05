SHELL := bash

ROOT := $(shell pwd)

export PATH := $(ROOT)/bin:$(PATH)

default:

convert: node_modules
	tml-to-yaml test/*.tml

update:
	yaml-to-data src/*.yaml

clean:
	rm -fr data
	rm -fr node_modules
	rm -f package*
	git worktree prune

#------------------------------------------------------------------------------
data:
	git branch --track $@ origin/$@ 2>/dev/null || true
	git worktree add -f $@ $@

# data-update: data node_modules
# 	rm -fr data/*
# 	bin/generate-data test/*.tml

# data-status:
# 	@(cd data; git add -Af .; git status --short)

# data-diff:
# 	@(cd data; git add -Af .; git diff --cached)

# data-push:
# 	@[ -z "$$(cd data; git status --short)" ] || { \
# 	    cd data; \
# 	    git add -Af .; \
# 	    COMMIT=`cd ..; git rev-parse --short HEAD` ; \
# 	    git commit -m "Regenerated data from master $$COMMIT"; \
# 	    git push origin data; \
# 	}

node_modules:
	mkdir $@
	npm install coffeescript js-yaml jyj lodash testml-compiler
	rm -f package*

.PHONY: test
test:
	@echo "We don't run tests here."
