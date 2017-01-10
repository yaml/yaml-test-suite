FROM ubuntu:16.04

RUN apt-get update \
 && apt-get install -y \
        autoconf \
        build-essential \
        entr \
        libtool \
        perl \
        python \
        ruby \
        nodejs \
        gist git tig vim \
 && mkdir /build \
 && true

RUN apt-get install -y cpanminus \
 && cpanm \
        Pegex \
        IO::All \
        YAML \
        YAML::XS \
        YAML::Tiny \
        YAML::Syck \
 && true

RUN git clone https://github.com/yaml/libyaml /libyaml \
 && ( \
        cd /libyaml/tests/run-test-suite/src/; \
	LIBYAML_DIR=$PWD/../../.. make build; \
	mv libyaml-parser /usr/local/bin; \
    ) \
 && true

COPY yaml-pegex-pm /build/yaml-pegex-pm

# COPY build.sh /build/build.sh
# WORKDIR /build
# RUN ./build.sh

WORKDIR /yaml-test-suite

ENV PATH="/yaml-test-suite/bin:${PATH}"
