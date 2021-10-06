#!/bash

# shellcheck disable=2030,2031

set -e -u -o pipefail

declare -a docker_run_options

run() (
  bin=$(dirname "${BASH_SOURCE[1]}")
  self=$(basename "${BASH_SOURCE[1]}")
  root=${ROOT:-$PWD}
  prog=$(cd "$bin" && echo "$self".*)

  if [[ $prog == *'.*' ]]; then
    prog=$self
    lang=bash
  else
    case $prog in
      *.sh) lang=bash ;;
      *.pl) lang=perl ;;
      *) die "Don't recognize language of '$prog'" ;;
    esac
  fi

  if [[ -e /.dockerenv ]]; then
    if [[ $self == $prog ]]; then
      main "$@"
    else
      run-local "$@"
    fi
    return
  fi

  if [[ ${YAML_USE_DOCKER-} ]]; then
    run-docker "$@"
    return
  fi

  out=$(check 2>&1) && rc=0 || rc=$?

  [[ $rc == 0 || $out == CHECK:* ]] || die "Error: $out"

  if [[ $rc -eq 0 ]]; then
    run-local "$@"
  else
    echo "Can't run '$self' locally: ${out#CHECK:\ }"
    echo "Running with docker..."
    run-docker "$@"
  fi
)

run-local() (
  "$lang" "$bin/$prog" "$@"
)

run-docker() (
  image=$self:$version

  uid=$(id -u)
  gid=$(id -g)

  docker inspect --type=image "$image" &>/dev/null ||
    build-docker-image

  args=()
  docker_run_options+=(
    --env ROOT=/home/host
  )
  for arg; do
    if [[ $arg == "$root"/* ]]; then
      arg=/home/host/${arg#$root/}
    fi
    args+=("$arg")
  done

  [[ -t 0 ]] && flags=('-it') || flags=()

  set -x
  docker run "${flags[@]}" --rm \
    --volume "$root":/home/host \
    --workdir "/home/host" \
    --user "$uid:$gid" \
    "${docker_run_options[@]}" \
    "$image" \
    "$self" "${args[@]}"
)

need() {
  [[ $(command -v $1) ]] || return 1

  [[ ${2-} ]] || return 0

  if [[ ${2-} =~ ^[0-9]+(\.|$) ]]; then
    check=need-version
  else
    check=need-modules
  fi

  "$check" "$@"
}

need-version() {
  cmd=$1 ver=$2

  if [[ $("$cmd" --version) =~ ([0-9]+)\.([0-9]+)(\.[0-9]+)? ]]; then
    set -- ${BASH_REMATCH[1]} ${BASH_REMATCH[2]} ${BASH_REMATCH[3]#.}
  else
    die "Could not get version from '$cmd --version'"
  fi

  fail() { die "CHECK: requires '$cmd' version '$ver' or higher"; }

  vers=$ver
  while [[ $vers && $* ]]; do
    v=${vers%%.*}
    if [[ $1 -gt $v ]]; then
      return
    elif [[ $1 -lt $v ]]; then
      fail
    fi
    if [[ $vers != *.* ]]; then
      return
    fi
    vers=${vers#*.}
    shift
  done
  fail
}

need-modules() {
  cmd=$1; shift

  fail() { die "CHECK: '$cmd' requires module '$module'"; }

  for module; do
    case $cmd in
      perl)
        perl -M"$module" -e1 \
          &>/dev/null || fail ;;
      node)
        node -e "require('$module');" \
          &>/dev/null || fail ;;
      *) die "Can't check module '$module' for '$cmd'" ;;
    esac
  done
}

build-docker-image() (
  build=$(mktemp -d --tmpdir run-or-docker-XXXXXX)

  fail() ( die "docker-build failed: $*" )

  add() (
    args=${1//\ \+\ /\ &&\ }
    echo "$args"
    echo
  )

  run() (
    add "RUN $*"
  )

  from() {
    _from=$1
    case $_from in
      alpine)
        add 'FROM alpine'
        add 'WORKDIR /home'
        add 'RUN apk update && apk add bash build-base coreutils'
        ;;
      *) fail "from $*"
    esac
  }

  apk() (
    add "RUN apk add $*"
  )

  cpanm() (
    case $_from in
      alpine)
        add 'RUN apk add perl perl-dev perl-app-cpanminus wget'
        ;;
      *) fail "cpanm $*"
    esac

    add "RUN cpanm -n $*"
  )

  npm() (
    case $_from in
      alpine)
        add 'RUN apk add nodejs npm'
        ;;
      *) fail "npm from $*"
    esac

    add "RUN mkdir node_modules && npm install $*"
  )

  (
    dockerfile

    add 'ENV PATH=/home/host/bin:$PATH'
  ) > "$build/Dockerfile"


  (
    set -x
    cd "$build"
    docker build -t "$image" .
  )

  rm -fr "$build"
)

die() { echo "$*" >&2; exit 1; }
