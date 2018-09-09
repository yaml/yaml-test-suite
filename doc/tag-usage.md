Test Suite Tags
===============

The .tml files under the `test/` directory have a tags line that looks like this:
```
tags: block sequence mapping spec
```

THe table below defines the tags that must be used. This table is used by tools
to validate the tags.

----
```
# These tags can have 1 of the following for *
# ok        YAML is valid
# err       YAML is invalid
# want      YAML is invalid but should be valid
# dont      YAML is valid but shouldn't be

libyaml-*   libyaml differs from normal
1-1-*       YAML 1.1 differs from normal
1-2-*       YAML 1.2 differs from normal
1-3-*       YAML 1.3 differs from normal
2-0-*       YAML 2.0 differs from normal

alias       The test uses anchors *and* aliases
anchor      The test uses anchors (but *not* aliases)
binary      The test encodes binary data
comment     The test uses YAML comments
directive   The test has directives
double      The test involves double quoted scalars
error       The test is about YAML that has errors
header      The test has '---' header tokens
edge        The test is an edge case
empty       The test has empty scalars
flow        The test has flow style
folded      The test uses '>' folded scalars
footer      The test has '...' footer tokens
indent      The test is concerned with indentation issues
jayt        Just Another YAML Test. Tests of dubious value.
literal     The test uses '|' literal scalars
mapping     The test is concerned with mapping issues
missing     The test has explicit pair with key or value missing
scalar      The test is concerned with scalar issues
sequence    The test is concerned with sequence issues
simple      The test uses simple YAML
single      The test involves single quoted scalars
spec        The test is a YAML 1.2 Spec example
tag         The test has tags
whitespace  The test is concerned with whitespace issues
