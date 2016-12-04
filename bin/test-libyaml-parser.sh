#!/bin/bash

set -e
# set -x

if [[ $# -gt 0 ]]; then
  dirs=("$@")
else
  dirs=(`find data | grep '/test\.event$' | cut -d/ -f2 | sort`)
fi

for dir in "${dirs[@]}"; do
  dir="data/$dir"
  [[ -e "$dir/in.yaml" ]] || continue
  if [[ -f "$dir/skip" ]]; then
    if grep '^libyaml-parser$' "$dir/skip" &> /dev/null; then
      echo ">>> $dir - skipping..."
      continue
    fi
  fi
  echo ">>> $dir"
  ./libyaml-parser/libyaml-parser "$dir/in.yaml" > /tmp/test.out || {
    (
      set -x
      cat "$dir/in.yaml"
      cat "$dir/test.event"
    )
    exit 1
  }
  ok=true
  output="$(${DIFF:-diff} -u $dir/test.event /tmp/test.out)" || ok=false
  if ! $ok; then
    echo "$output"
    exit 1
  fi
done

echo PASS
