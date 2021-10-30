SHELL := bash

export ROOT := $(shell pwd)

export PATH := $(ROOT)/bin:$(PATH)

BPAN := .bpan
COMMON := ../yaml-common

ifneq (,$(DOCKER))
  export RUN_OR_DOCKER := $(DOCKER)
endif

default:

docker:
	$(eval override export RUN_OR_DOCKER := force)
	@true

docker-build:
	$(eval override export RUN_OR_DOCKER := force-build)
	@true

verbose:
	$(eval override export RUN_OR_DOCKER_VERBOSE := true)
	@true

test:
	! $$(git rev-parse --is-shallow-repository) || \
	    git fetch --unshallow
	make data
	make clean
	make data-update
	make data-diff
	make data-status
	make clean
	make gh-pages
	make clean

.PHONY: new
new: data.tsv
	./bin/tsv-to-new $<

new-test:
	new-test-file

convert-special:
	convert-special-characters

testml:
	suite-to-testml

data:
	git branch --track $@ origin/$@ 2>/dev/null || true
	git worktree add -f $@ $@

data-update: data
	rm -fr $</*
	suite-to-data src/*.yaml
	data-symlinks $<

data-status: data
	@git -C $< add -Af . && \
	 git -C $< status --short

data-diff: data
	git -C $< add -Af . && \
	 git -C $< diff --cached

data-push: data
	[[ $$(git -C $< status --short) ]] && \
	( \
	    git -C $< add -Af . && \
	    COMMIT=$$(git rev-parse --short HEAD) && \
	    git -C $< commit -m "Regenerated data from master $$COMMIT" && \
	    git -C $< push origin data \
	)

common:
	cp $(COMMON)/bpan/run-or-docker.bash $(BPAN)/

clean:
<<<<<<< HEAD
	rm -fr data gh-pages new testml
	rm -f data.json
	rm -fr data gh-pages new testml
	git worktree prune

docker-push: force-build
	RUN_OR_DOCKER_PUSH=true suite-to-data
	RUN_OR_DOCKER_PUSH=true convert-special-characters

clean-docker:
	-docker images | \
	    grep -E '(suite-to-data|new-test-file)' | \
	    awk '{print $3}' | \
	    xargs docker rmi 2>/dev/null

#------------------------------------------------------------------------------

gh-pages:
	git branch --track $@ origin/$@ 2>/dev/null || true
	git worktree add $@ $@
