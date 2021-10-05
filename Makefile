SHELL := bash

export ROOT := $(shell pwd)

export PATH := $(ROOT)/bin:$(PATH)

BPAN := .bpan
COMMON := ../yaml-common

default:

new-test:
	$(error TODO)

data:
	git branch --track $@ origin/$@ 2>/dev/null || true
	git worktree add -f $@ $@

data-update: data
	rm -fr $</*
	yaml-to-data src/*.yaml

data-status: data
	@(cd $<; git add -Af .; git status --short)

data-diff: data
	@(cd $<; git add -Af .; git diff --cached)

data-push: data-update
	[[ $$(git -C data status --short) ]] && ( \
	    git -C data add -Af . && \
	    COMMIT=$$(git rev-parse --short HEAD) && \
	    git commit -m "Regenerated data from master $$COMMIT" && \
	    git -C data push origin data \
	)

bpan:
	cp $(COMMON)/bpan/run-or-docker.sh $(BPAN)/

clean:
	rm -fr data
	git worktree prune

clean-docker:
	-docker images | \
	    grep -E '(yaml-to-data)' | \
	    awk '{print $3}' | \
	    xargs docker rmi
