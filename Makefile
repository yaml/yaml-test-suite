SHELL := bash

export ROOT := $(shell pwd)

export PATH := $(ROOT)/bin:$(PATH)

BPAN := .bpan
COMMON := ../yaml-common
MATRIX_REPO ?= git@github.com:perlpunk/yaml-test-matrix

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

new-test:
	new-test-file

convert-special:
	convert-special-characters

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
	rm -fr data matrix gh-pages
	git worktree prune

docker-push: force-build
	RUN_OR_DOCKER_PUSH=true yaml-to-data
	RUN_OR_DOCKER_PUSH=true convert-special-characters

clean-docker:
	-docker images | \
	    grep -E '(yaml-to-data|new-test-file)' | \
	    awk '{print $3}' | \
	    xargs docker rmi 2>/dev/null

#------------------------------------------------------------------------------
matrix:
	git clone $(MATRIX_REPO) $@

matrix-build: matrix data
	make -C $< build

matrix-push: matrix-copy
	( \
	    cd gh-pages && \
	    git add -A . && \
	    git commit -m 'Regenerated matrix files' && \
	    git push \
	)

matrix-status: gh-pages
	git -C $< status

matrix-copy: gh-pages
	rm -fr $</css \
	       $</js \
	       $</*.html \
	       $</details \
	       $</sheet
	cp -r matrix/matrix/html/css \
	      matrix/matrix/html/js \
	      matrix/matrix/html/details \
	      matrix/matrix/html/sheet/ \
	      matrix/matrix/html/*.html \
	      $<

gh-pages:
	git branch --track $@ origin/$@ 2>/dev/null || true
	git worktree add $@ $@
