FROM yamlio/yaml-editor:latest

RUN apk update \
 && apk add \
        coreutils \
        npm \
 && true

RUN npm install -g \
        coffeescript \
 && npm install \
        testml-compiler \
 && true

ENV NODE_PATH /yaml/edit/node_modules

COPY test-to-tsv /bin/
