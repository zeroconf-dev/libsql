#!/usr/bin/env bash

set -e

if ! type jq &>/dev/null || ! type docker &>/dev/null; then
    printf -- 'Missing dependency jq or docker\n' >&2
    exit 1
fi

DIR=$( cd -P "$( dirname -- "${BASH_SOURCE[0]}" )/.." &> /dev/null && pwd )

globexist() {
	[ -e "$1" ]
}

build() {
	if globexist "$DIR/dist/"*; then
		rm -Rf "$DIR/dist/"*
	fi
	mkdir -p "$DIR/dist"
	docker compose -f "$DIR/docker/docker-compose.yml" run -u "$(id -u)" --build --remove-orphans build
	local jq_filter
	read -r jq_filter <<< "$(printf -- 'del(.devDependencies,.dependencies,.optionalDependencies,.peerDependencies,.private,.scripts)')"
	jq "$jq_filter" < "$DIR/package.json" > "$DIR/dist/package.json"
	cp LICENSE README.md "$DIR/dist/"

	(cd "$DIR/dist/"; npm pack --pack-destination "$DIR")
}

build "$@"
