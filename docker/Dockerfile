FROM ubuntu:16.04

RUN apt-get update \
 && apt-get install -y \
        build-essential \
        perl \
        python \
        ruby \
        nodejs \
        gist git tig vim \
 && mkdir /build \
 && true

RUN apt-get install -y cpanminus \
 && cpanm YAML YAML::XS YAML::Tiny YAML::Syck

RUN apt-get install -y entr

COPY yaml-pegex-pm /build/yaml-pegex-pm
RUN cpanm Pegex IO::All

# COPY build.sh /build/build.sh
# WORKDIR /build
# RUN ./build.sh

WORKDIR /yaml-test-suite

ENV PATH="/yaml-test-suite/bin:${PATH}"
