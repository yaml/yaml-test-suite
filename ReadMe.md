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
Matrix](http://matrix.yaml.io/), made from
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
* `↓` indicates a carriage return character
* `⇔` indicates a byte order mark (BOM) character

Also these are used in test event output:

* `<SPC>` for a space character
* `<TAB>` for a tab character

## Updating Things

When test files change you need to update various artifacts.
To do this, run the following commands:

```
make data-update    # Update data branch worktree
```

You will need Bash, NodeJS and Perl for these things.

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
