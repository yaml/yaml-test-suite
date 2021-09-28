SHELL := bash

ROOT := $(shell cd ../.. && pwd)

DOCKER_IMAGE := yaml-test-suite-tsv

TML ?= test/*.tml

default:

tsv: build
	$(call docker-run,test-to-tsv $(TML),--user "$$(id -u):$$(id -g)")

shell: build
	$(call docker-run,bash)

build: Dockerfile
	docker build \
	    -t $(DOCKER_IMAGE) \
	    .

define docker-run
docker run --rm -it \
    $2 \
    --volume $(ROOT):/host \
    --workdir /host \
    $(DOCKER_IMAGE) \
    $1
endef
