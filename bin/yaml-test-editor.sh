#!/bin/bash

set -e

file=test.yaml

if [[ $# -gt 0 ]]; then
  export RUN_LIST="$@"
  root="$(cd $(dirname $0)/..; pwd)"
  run="$root/bin/$(basename $0)"

  if [[ -e /tmp/entr.pid ]]; then
    kill $(cat /tmp/entr.pid) || true
    rm /tmp/entr.pid
  fi

  rm -fr /tmp/yaml-test-editor
  mkdir /tmp/yaml-test-editor
  cd /tmp/yaml-test-editor

  cp "$root/share/vimrc" .vimrc

  cp "$root/share/help" $file

  out=()
  for arg; do
    if [[ ! $arg =~ ^(libyaml|perl-(pegex|pm|xs))$ ]]; then
      echo "Invalid YAML framework: '$arg'."
      exit 1
    fi
    out+=("$arg.out")
  done

  (echo $file | entr $run) &> log &
  echo $! > /tmp/entr.pid

  vim -c 'source .vimrc' $file "${out[@]}" -O

elif [[ -z $RUN_LIST ]]; then
  cat <<...

You need to specify a list of YAML frameworks. Use these:

  libyaml     - libyaml Parser
  perl-pm     - Perl's YAML.pm Loader
  perl-xs     - Perl's YAML::XS Loader
  perl-pegex  - Perl's YAML::Pegex Parser
  python      - Python's PyYAML Loader

...
  exit 1
fi

for yaml in $RUN_LIST; do
  cat $file | $yaml &> $yaml.out || true
done
