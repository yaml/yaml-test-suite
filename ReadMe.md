YAML Test Suite
===============

Comprehensive Test Suite for YAML

## Overview

This repository contains data for testing the correctness of YAML processors.

The types of data include:

* Metadata about the test
  * Name (short phrase)
  * Tags
  * Description
* Input YAML
* Canonical output YAML
* Matching JSON
* Token stream notation
* Event stream notation
* Error data
* etc

To get a quick overview of the tests you can have a look at the [YAML Test
Matrix](http://matrix.yaml.info/), made from
<https://github.com/perlpunk/yaml-test-matrix>.

The tests are available in 2 forms.
Files in the `src` directory encode all the data for YAML using YAML.
The data from these tests are also available in the `data` branch of the
repository as plain text files.

The releases are made from the `data` branch, which is made from the data in
the TestML in the `main` branch.
You shouldn't use the data branch directly as the branch is squashed and force
pushed from time to time.

### Special Characters

The YAML files use a number of non-ascii unicode characters to indicate the
presence of certain characters that would be otherwise hard to read.

* `␣` is used for trailing space characters
* Hard tabs are reresented by one of:  (expanding to 4 spaces)
  * `———»`
  * `——»`
  * `—»`
  * `»`
* `↵` us used to show trailing newline characters
* `∎` is used at the end when there is no final newline character
* `←` indicates a carriage return character
* `⇔` indicates a byte order mark (BOM) character

Also these are used in test event output:

* `<SPC>` for a space character
* `<TAB>` for a tab character

## Makefile Targets

The Makefile has a number of targets for automating the process of adding new
tests and also preprocessing them into the `data` branch.

* `make data`

  Create a `data` worktree subdirectory with all the tests as data files.

* `make data-update`

  Update the `data` brnach directory with the latest info in the `src`
  directory.

* `make export`

  Creates an `export.tsv` file with all the data from the `src` test files.
  This tsv data can be copied into a google spreadsheet.
  The [YAML parser playground](https://play.yaml.io/main/parser) has a button
  to copy a test to the same tsv form.

* `make import`

  Make a directory called `new` from a file named `import.tsv`.
  The `import.tsv` file should have data copied from a google spreadsheet.

* `make add-new`

  Copy the new tests under `new/` into `src/` to make a PR for new tests.

* `make testml`

  Generate `.tml` files under a `testml/` directory for all the suite tests.

* `make clean`

  Remove generated files and directories.

## Libaries using this test suite

* C
  * [libyaml](https://github.com/yaml/libyaml)
  * [libfyaml](https://github.com/pantoniou/libfyaml)
* C#
  * [YamlDotNet](https://github.com/aaubry/YamlDotNet)
* D
  * [dyaml](https://github.com/dlang-community/D-YAML)
* Delphi
  * [Neslib.Yaml](https://github.com/neslib/Neslib.Yaml)
* Haskell
  * [HsYAML](https://github.com/haskell-hvr/HsYAML)
* Java
  * [SnakeYAML Engine](https://bitbucket.org/asomov/snakeyaml-engine)
* Javascript
  * [yaml](https://github.com/eemeli/yaml)
* Nim
  * [NimYAML](https://github.com/flyx/NimYAML)
* Perl 5
  * [YAML::PP](https://github.com/perlpunk/YAML-PP-p5)

If your library is using the test suite, drop us a line and we can add it here.
It would also be nice if you could add a link back to this test suite.
