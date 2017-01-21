#!/bin/bash

if [[ ! -d /yaml-test-suite-data ]]; then
    echo "/yaml-test-suite-data needed"
    exit 1
fi

framework="$1"

cd /yaml-test-suite-data

if [[ ! -d out ]]; then
    echo "/yaml-test-suite-data/out does not exist"
    exit 1
fi
for id in [A-Z0-9]*
#for id in 229Q
do
    echo $id
    $framework < $id/in.yaml > out/$id.error 2>&1
    if [[ $? -eq 0 ]]; then
        mv out/$id.error out/$id.ok
    fi
done

chmod -R go+w out
