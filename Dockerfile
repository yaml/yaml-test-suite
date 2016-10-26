FROM ubuntu:16.04

RUN apt-get update

RUN apt-get install -y build-essential gist git tig vim

RUN apt-get install -y rbenv python-virtualenv
