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
	data-symlinks $<

data-status: data
	@git -C $< add -Af . && \
	 git -C $< status --short

data-diff: data
	@git -C $< add -Af . && \
	 git -C $< diff --cached

data-push: data
	[[ $$(git -C $< status --short) ]] && \
	( \
	    git -C $< add -Af . && \
	    COMMIT=$$(git rev-parse --short HEAD) && \
	    git -C $< commit -m "Regenerated data from master $$COMMIT" && \
	    git -C $< push origin data \
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
