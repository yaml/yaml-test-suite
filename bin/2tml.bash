#!/usr/bin/env bash

set -e

rm -fr tml
mkdir tml

for d in test/new/invalid/*; do
  id=$(basename $d)
  id="$(cat /dev/urandom | LC_ALL=C tr -cd A-HJ-NP-Z2-9 | fold -w4 | grep [A-Z] | grep [0-9] | head -n1)"
  from="@perlpunk"
  if [[ -e $d/from ]]; then
    from=$(head $d/from)
  fi
  out="\
=== $(cat $d/===)
from: $from
tags: error

+++ in-yaml
$(cat $d/in.yaml)
"

out+="
+++ error
"

if [[ -e $d/out.yaml ]]; then
  out+="
+++ out-yaml
$(cat $d/out.yaml)
"
fi

out+="
+++ test-event
$(cat $d/test.event)
"
  echo -n "$out" > tml/$id.tml
done
