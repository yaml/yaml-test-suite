#!/bin/bash

set -e

file=test.yaml

if [[ $# -gt 0 ]]; then
  export RUN_LIST="$@"
  run="$(cd $(dirname $0); pwd)/$(basename $0)"

  if [[ -e /tmp/entr.pid ]]; then
    kill $(cat /tmp/entr.pid) || true
    rm /tmp/entr.pid
  fi

  rm -fr tinker
  mkdir tinker
  cd tinker

  cp ../share/vimrc .vimrc

  echo '# Enter some YAML here...' > $file

  out=()
  for arg; do
    if [[ ! $arg =~ ^(perl-(pegex|pm|xs))$ ]]; then
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

  perl-pm     - Perl's YAML.pm Loader
  perl-xs     - Perl's YAML::XS Loader
  perl-pegex  - Perl's YAML::Pegex Parser
  python      - Python's PyYAML Loader
  libyaml     - libyaml Parser

...
  exit 1
fi

for yaml in $RUN_LIST; do
  cat $file | $yaml &> $yaml.out || true
done
