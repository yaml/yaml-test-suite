YAML Test Suite
===============

Comprehensive Test Suite for YAML

## Overview

This test suite is composed of (what will eventually be) 100s of test
directories that each represent a specific situation for a YAML processor.
Each test directory contains a number of related files, that test suites can be
made to use in interesting ways.
For example:

* Metadata about the test
  * Name (short phrase)
  * Tags
  * Description
* Input YAML
* Canonical Output YAML
* Matching JSON
* Token stream notation
* Event stream notation
* Error data
* etc

Not every test dir will have the same elements.
Since the tests are just data, it is up to the framework using the tests to
decide which tests to use and how to use them.

To get a quick overview of the tests you can have a look at the [YAML Test
Matrix](http://matrix.yaml.io/), made from
<https://github.com/perlpunk/yaml-test-matrix>.

## Usage

The tests are currently written in
[TestML](https://github.com/testml-lang/testml/) under the `test` directory on
the `master` branch.

If your language has a TestML processor, you can use these files directly.
It's recommended to use the latest release `vYYYY-MM-DD` instead of master.

Otherwise you can use the raw data files.
For that, use the latest release under
[https://github.com/yaml/yaml-test-suite/releases](
https://github.com/yaml/yaml-test-suite/releases):

    git clone https://github.com/yaml/yaml-test-suite -b data-YYYY-MM-DD

The releases are made from the `data` branch, which is made from the data in
the TestML in the `master` branch.
You shouldn't use the data branch directly as the branch is squashed and force
pushed from time to time.

## Updating Things

When test files change you need to update various artifacts.
To do this, run the following commands:

    make update         # Updates tags and name artifacts
    make data-update    # Updates the data branch (under ./data/)

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
