SHELL := bash

ROOT := $(shell cd ../.. && pwd)

DOCKER_IMAGE := yaml-test-suite-data

default:

data: build
	docker run --rm \
	    --user "$$(id -u):$$(id -g)" \
	    --volume $(ROOT):/host \
	    --workdir /host \
	    $(DOCKER_IMAGE) \
		make clean update data-update

build: Dockerfile
	docker build \
	    -t $(DOCKER_IMAGE) \
	    .
