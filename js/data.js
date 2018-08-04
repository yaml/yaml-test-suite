var data = {
   "tags" : {
      "1.3-err" : 1,
      "1.3-mod" : 1,
      "alias" : 1,
      "anchor" : 1,
      "block" : 1,
      "comment" : 1,
      "directive" : 1,
      "document" : 1,
      "double" : 1,
      "edge" : 1,
      "empty" : 1,
      "error" : 1,
      "flow" : 1,
      "folded" : 1,
      "footer" : 1,
      "header" : 1,
      "indent" : 1,
      "jayt" : 1,
      "libyaml-err" : 1,
      "literal" : 1,
      "mapping" : 1,
      "missing" : 1,
      "scalar" : 1,
      "sequence" : 1,
      "simple" : 1,
      "single" : 1,
      "spec" : 1,
      "tag" : 1,
      "upto-1.2" : 1,
      "whitespace" : 1
   },
   "tests" : {
      "229Q" : {
         "id" : "229Q",
         "in_json" : "[\n  {\n    \"name\": \"Mark McGwire\",\n    \"hr\": 65,\n    \"avg\": 0.278\n  },\n  {\n    \"name\": \"Sammy Sosa\",\n    \"hr\": 63,\n    \"avg\": 0.288\n  }\n]\n",
         "in_yaml" : "-\n  name: Mark McGwire\n  hr:   65\n  avg:  0.278\n-\n  name: Sammy Sosa\n  hr:   63\n  avg:  0.288\n",
         "tags" : [
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :name\n=VAL :Mark McGwire\n=VAL :hr\n=VAL :65\n=VAL :avg\n=VAL :0.278\n-MAP\n+MAP\n=VAL :name\n=VAL :Sammy Sosa\n=VAL :hr\n=VAL :63\n=VAL :avg\n=VAL :0.288\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "26DV" : {
         "id" : "26DV",
         "in_json" : "{\n  \"top1\": {\n    \"key1\": \"scalar1\"\n  },\n  \"top2\": {\n    \"key2\": \"scalar2\"\n  },\n  \"top3\": {\n    \"scalar1\": \"scalar3\"\n  },\n  \"top4\": {\n    \"scalar2\": \"scalar4\"\n  },\n  \"top5\": \"scalar5\",\n  \"top6\": {\n    \"key6\": \"scalar6\"\n  }\n}\n",
         "in_yaml" : "\"top1\" : \n  \"key1\" : &alias1 scalar1\n'top2' : \n  'key2' : &alias2 scalar2\ntop3: &node3 \n  *alias1 : scalar3\ntop4: \n  *alias2 : scalar4\ntop5   :    \n  scalar5\ntop6: \n  &anchor6 'key6' : scalar6\n",
         "tags" : [
            "alias",
            "mapping",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL \"top1\n+MAP\n=VAL \"key1\n=VAL &alias1 :scalar1\n-MAP\n=VAL 'top2\n+MAP\n=VAL 'key2\n=VAL &alias2 :scalar2\n-MAP\n=VAL :top3\n+MAP &node3\n=ALI *alias1\n=VAL :scalar3\n-MAP\n=VAL :top4\n+MAP\n=ALI *alias2\n=VAL :scalar4\n-MAP\n=VAL :top5\n=VAL :scalar5\n=VAL :top6\n+MAP\n=VAL &anchor6 'key6\n=VAL :scalar6\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "27NA" : {
         "id" : "27NA",
         "in_json" : "\"text\"\n",
         "in_yaml" : "%YAML 1.2\n--- text\n",
         "tags" : [
            "1.3-err",
            "directive",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :text\n-DOC\n-STR\n"
      },
      "2AUY" : {
         "id" : "2AUY",
         "in_json" : "[\n  \"a\",\n  \"b\",\n  42,\n  \"d\"\n]\n",
         "in_yaml" : " - !!str a\n - b\n - !!int 42\n - d\n",
         "tags" : [
            "sequence",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL <tag:yaml.org,2002:str> :a\n=VAL :b\n=VAL <tag:yaml.org,2002:int> :42\n=VAL :d\n-SEQ\n-DOC\n-STR\n"
      },
      "2EBW" : {
         "id" : "2EBW",
         "in_json" : "{\n  \"a!\\\"#$%&'()*+,-./09:;<=>?@AZ[\\\\]^_`az{|}~\": \"safe\",\n  \"?foo\": \"safe question mark\",\n  \":foo\": \"safe colon\",\n  \"-foo\": \"safe dash\",\n  \"this is#not\": \"a comment\"\n}\n",
         "in_yaml" : "a!\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~: safe\n?foo: safe question mark\n:foo: safe colon\n-foo: safe dash\nthis is#not: a comment\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a!\"#$%&'()*+,-./09:;<=>?@AZ[\\\\]^_`az{|}~\n=VAL :safe\n=VAL :?foo\n=VAL :safe question mark\n=VAL ::foo\n=VAL :safe colon\n=VAL :-foo\n=VAL :safe dash\n=VAL :this is#not\n=VAL :a comment\n-MAP\n-DOC\n-STR\n"
      },
      "2JQS" : {
         "id" : "2JQS",
         "in_json" : null,
         "in_yaml" : ": a\n: b\n",
         "tags" : [
            "empty",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :\n=VAL :a\n=VAL :\n=VAL :b\n-MAP\n-DOC\n-STR\n"
      },
      "2LFX" : {
         "id" : "2LFX",
         "in_json" : "\"foo\"\n",
         "in_yaml" : "%FOO  bar baz # Should be ignored\n              # with a warning.\n---\n\"foo\"\n",
         "tags" : [
            "1.3-mod",
            "directive",
            "double",
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL \"foo\n-DOC\n-STR\n"
      },
      "2SXE" : {
         "id" : "2SXE",
         "in_json" : "{\n  \"key\": \"value\",\n  \"foo\": \"key\"\n}\n",
         "in_yaml" : "&a: key: &a value\nfoo:\n  *a:\n",
         "tags" : [
            "1.3-err",
            "alias",
            "edge"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL &a: :key\n=VAL &a :value\n=VAL :foo\n=ALI *a:\n-MAP\n-DOC\n-STR\n"
      },
      "2XXW" : {
         "id" : "2XXW",
         "in_json" : null,
         "in_yaml" : "# Sets are represented as a\n# Mapping where each key is\n# associated with a null value\n--- !!set\n? Mark McGwire\n? Sammy Sosa\n? Ken Griff\n",
         "tags" : [
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP <tag:yaml.org,2002:set>\n=VAL :Mark McGwire\n=VAL :\n=VAL :Sammy Sosa\n=VAL :\n=VAL :Ken Griff\n=VAL :\n-MAP\n-DOC\n-STR\n"
      },
      "35KP" : {
         "id" : "35KP",
         "in_json" : "{\n  \"a\": \"b\"\n}\n[\n  \"c\"\n]\n\"d e\"\n",
         "in_yaml" : "--- !!map\n? a\n: b\n--- !!seq\n- !!str c\n--- !!str\nd\ne\n",
         "tags" : [
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP <tag:yaml.org,2002:map>\n=VAL :a\n=VAL :b\n-MAP\n-DOC\n+DOC ---\n+SEQ <tag:yaml.org,2002:seq>\n=VAL <tag:yaml.org,2002:str> :c\n-SEQ\n-DOC\n+DOC ---\n=VAL <tag:yaml.org,2002:str> :d e\n-DOC\n-STR\n"
      },
      "36F6" : {
         "id" : "36F6",
         "in_json" : "{\n  \"plain\": \"a b\\nc\"\n}\n",
         "in_yaml" : "---\nplain: a\n b\n\n c\n",
         "tags" : [
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :plain\n=VAL :a b\\nc\n-MAP\n-DOC\n-STR\n"
      },
      "3ALJ" : {
         "id" : "3ALJ",
         "in_json" : "[\n  [\n    \"s1_i1\",\n    \"s1_i2\"\n  ],\n  \"s2\"\n]\n",
         "in_yaml" : "- - s1_i1\n  - s1_i2\n- s2\n",
         "tags" : [
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+SEQ\n=VAL :s1_i1\n=VAL :s1_i2\n-SEQ\n=VAL :s2\n-SEQ\n-DOC\n-STR\n"
      },
      "3GZX" : {
         "id" : "3GZX",
         "in_json" : "{\n  \"First occurrence\": \"Foo\",\n  \"Second occurrence\": \"Foo\",\n  \"Override anchor\": \"Bar\",\n  \"Reuse anchor\": \"Bar\"\n}\n",
         "in_yaml" : "First occurrence: &anchor Foo\nSecond occurrence: *anchor\nOverride anchor: &anchor Bar\nReuse anchor: *anchor\n",
         "tags" : [
            "alias",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :First occurrence\n=VAL &anchor :Foo\n=VAL :Second occurrence\n=ALI *anchor\n=VAL :Override anchor\n=VAL &anchor :Bar\n=VAL :Reuse anchor\n=ALI *anchor\n-MAP\n-DOC\n-STR\n"
      },
      "3MYT" : {
         "id" : "3MYT",
         "in_json" : "\"k:#foo &a !t s\"\n",
         "in_yaml" : "k:#foo\n &a !t s\n",
         "tags" : [
            "1.3-err",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n=VAL :k:#foo &a !t s\n-DOC\n-STR\n"
      },
      "3R3P" : {
         "id" : "3R3P",
         "in_json" : "[\n  \"a\"\n]\n",
         "in_yaml" : "&sequence\n- a\n",
         "tags" : [
            "anchor",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ &sequence\n=VAL :a\n-SEQ\n-DOC\n-STR\n"
      },
      "3UYS" : {
         "id" : "3UYS",
         "in_json" : "{\n  \"escaped slash\": \"a/b\"\n}\n",
         "in_yaml" : "escaped slash: \"a\\/b\"\n",
         "tags" : [
            "double"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :escaped slash\n=VAL \"a/b\n-MAP\n-DOC\n-STR\n"
      },
      "4ABK" : {
         "id" : "4ABK",
         "in_json" : null,
         "in_yaml" : "{\nunquoted : \"separate\",\nhttp://foo.com,\nomitted value:,\n: omitted key,\n}\n",
         "tags" : [
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :unquoted\n=VAL \"separate\n=VAL :http://foo.com\n=VAL :\n=VAL :omitted value\n=VAL :\n=VAL :\n=VAL :omitted key\n-MAP\n-DOC\n-STR\n"
      },
      "4CQQ" : {
         "id" : "4CQQ",
         "in_json" : "{\n  \"plain\": \"This unquoted scalar spans many lines.\",\n  \"quoted\": \"So does this quoted scalar.\\n\"\n}\n",
         "in_yaml" : "plain:\n  This unquoted scalar\n  spans many lines.\n\nquoted: \"So does this\n  quoted scalar.\\n\"\n",
         "tags" : [
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :plain\n=VAL :This unquoted scalar spans many lines.\n=VAL :quoted\n=VAL \"So does this quoted scalar.\\n\n-MAP\n-DOC\n-STR\n"
      },
      "4GC6" : {
         "id" : "4GC6",
         "in_json" : "\"here's to \\\"quotes\\\"\"\n",
         "in_yaml" : "'here''s to \"quotes\"'\n",
         "tags" : [
            "1.3-err",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL 'here's to \"quotes\"\n-DOC\n-STR\n"
      },
      "4MUZ" : {
         "id" : "4MUZ",
         "in_json" : "{\n  \"foo\": \"bar\"\n}\n",
         "in_yaml" : "{\"foo\"\n: \"bar\"}\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL \"foo\n=VAL \"bar\n-MAP\n-DOC\n-STR\n"
      },
      "4Q9F" : {
         "id" : "4Q9F",
         "in_json" : "\"ab cd\\nef\\n\\ngh\\n\"\n",
         "in_yaml" : "--- >\n ab\n cd\n \n ef\n\n\n gh\n",
         "tags" : [
            "1.3-mod",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL >ab cd\\nef\\n\\ngh\\n\n-DOC\n-STR\n"
      },
      "4QFQ" : {
         "id" : "4QFQ",
         "in_json" : "[\n  \"detected\\n\",\n  \"\\n\\n# detected\\n\",\n  \" explicit\\n\",\n  \"detected\\n\"\n]\n",
         "in_yaml" : "- |\n detected\n- >\n \n  \n  # detected\n- |1\n  explicit\n- >\n detected\n",
         "tags" : [
            "1.3-mod",
            "folded",
            "libyaml-err",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL |detected\\n\n=VAL >\\n\\n# detected\\n\n=VAL | explicit\\n\n=VAL >detected\\n\n-SEQ\n-DOC\n-STR\n"
      },
      "4UYU" : {
         "id" : "4UYU",
         "in_json" : "\"foo: bar\\\": baz\"\n",
         "in_yaml" : "\"foo: bar\\\": baz\"\n",
         "tags" : [
            "1.3-err",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n=VAL \"foo: bar\": baz\n-DOC\n-STR\n"
      },
      "4V8U" : {
         "id" : "4V8U",
         "in_json" : "\"plain\\\\value\\\\with\\\\backslashes\"\n",
         "in_yaml" : "---\nplain\\value\\with\\backslashes\n",
         "tags" : [
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :plain\\\\value\\\\with\\\\backslashes\n-DOC\n-STR\n"
      },
      "4ZYM" : {
         "id" : "4ZYM",
         "in_json" : "{\n  \"plain\": \"text lines\",\n  \"quoted\": \"text lines\",\n  \"block\": \"text\\n \\tlines\\n\"\n}\n",
         "in_yaml" : "plain: text\n  lines\nquoted: \"text\n  \tlines\"\nblock: |\n  text\n   \tlines\n",
         "tags" : [
            "double",
            "literal",
            "scalar",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :plain\n=VAL :text lines\n=VAL :quoted\n=VAL \"text lines\n=VAL :block\n=VAL |text\\n \\tlines\\n\n-MAP\n-DOC\n-STR\n"
      },
      "52DL" : {
         "id" : "52DL",
         "in_json" : "\"a\"\n",
         "in_yaml" : "---\n! a\n",
         "tags" : [
            "1.3-mod",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL <!> :a\n-DOC\n-STR\n"
      },
      "54T7" : {
         "id" : "54T7",
         "in_json" : "{\n  \"foo\": \"you\",\n  \"bar\": \"far\"\n}\n",
         "in_yaml" : "{foo: you, bar: far}\n",
         "tags" : [
            "flow",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n=VAL :you\n=VAL :bar\n=VAL :far\n-MAP\n-DOC\n-STR\n"
      },
      "565N" : {
         "id" : "565N",
         "in_json" : null,
         "in_yaml" : "canonical: !!binary \"\\\n R0lGODlhDAAMAIQAAP//9/X17unp5WZmZgAAAOfn515eXvPz7Y6OjuDg4J+fn5\\\n OTk6enp56enmlpaWNjY6Ojo4SEhP/++f/++f/++f/++f/++f/++f/++f/++f/+\\\n +f/++f/++f/++f/++f/++SH+Dk1hZGUgd2l0aCBHSU1QACwAAAAADAAMAAAFLC\\\n AgjoEwnuNAFOhpEMTRiggcz4BNJHrv/zCFcLiwMWYNG84BwwEeECcgggoBADs=\"\ngeneric: !!binary |\n R0lGODlhDAAMAIQAAP//9/X17unp5WZmZgAAAOfn515eXvPz7Y6OjuDg4J+fn5\n OTk6enp56enmlpaWNjY6Ojo4SEhP/++f/++f/++f/++f/++f/++f/++f/++f/+\n +f/++f/++f/++f/++f/++SH+Dk1hZGUgd2l0aCBHSU1QACwAAAAADAAMAAAFLC\n AgjoEwnuNAFOhpEMTRiggcz4BNJHrv/zCFcLiwMWYNG84BwwEeECcgggoBADs=\ndescription:\n The binary value above is a tiny arrow encoded as a gif image.\n",
         "tags" : [
            "jayt"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :canonical\n=VAL <tag:yaml.org,2002:binary> \"R0lGODlhDAAMAIQAAP//9/X17unp5WZmZgAAAOfn515eXvPz7Y6OjuDg4J+fn5OTk6enp56enmlpaWNjY6Ojo4SEhP/++f/++f/++f/++f/++f/++f/++f/++f/++f/++f/++f/++f/++f/++SH+Dk1hZGUgd2l0aCBHSU1QACwAAAAADAAMAAAFLCAgjoEwnuNAFOhpEMTRiggcz4BNJHrv/zCFcLiwMWYNG84BwwEeECcgggoBADs=\n=VAL :generic\n=VAL <tag:yaml.org,2002:binary> |R0lGODlhDAAMAIQAAP//9/X17unp5WZmZgAAAOfn515eXvPz7Y6OjuDg4J+fn5\\nOTk6enp56enmlpaWNjY6Ojo4SEhP/++f/++f/++f/++f/++f/++f/++f/++f/+\\n+f/++f/++f/++f/++f/++SH+Dk1hZGUgd2l0aCBHSU1QACwAAAAADAAMAAAFLC\\nAgjoEwnuNAFOhpEMTRiggcz4BNJHrv/zCFcLiwMWYNG84BwwEeECcgggoBADs=\\n\n=VAL :description\n=VAL :The binary value above is a tiny arrow encoded as a gif image.\n-MAP\n-DOC\n-STR\n"
      },
      "57H4" : {
         "id" : "57H4",
         "in_json" : "{\n  \"sequence\": [\n    \"entry\",\n    [\n      \"nested\"\n    ]\n  ],\n  \"mapping\": {\n    \"foo\": \"bar\"\n  }\n}\n",
         "in_yaml" : "sequence: !!seq\n- entry\n- !!seq\n - nested\nmapping: !!map\n foo: bar\n",
         "tags" : [
            "mapping",
            "sequence",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :sequence\n+SEQ <tag:yaml.org,2002:seq>\n=VAL :entry\n+SEQ <tag:yaml.org,2002:seq>\n=VAL :nested\n-SEQ\n-SEQ\n=VAL :mapping\n+MAP <tag:yaml.org,2002:map>\n=VAL :foo\n=VAL :bar\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "5BVJ" : {
         "id" : "5BVJ",
         "in_json" : "{\n  \"literal\": \"some\\ntext\\n\",\n  \"folded\": \"some text\\n\"\n}\n",
         "in_yaml" : "literal: |\n  some\n  text\nfolded: >\n  some\n  text\n",
         "tags" : [
            "folded",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :literal\n=VAL |some\\ntext\\n\n=VAL :folded\n=VAL >some text\\n\n-MAP\n-DOC\n-STR\n"
      },
      "5C5M" : {
         "id" : "5C5M",
         "in_json" : "[\n  {\n    \"one\": \"two\",\n    \"three\": \"four\"\n  },\n  {\n    \"five\": \"six\",\n    \"seven\": \"eight\"\n  }\n]\n",
         "in_yaml" : "- { one : two , three: four , }\n- {five: six,seven : eight}\n",
         "tags" : [
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :one\n=VAL :two\n=VAL :three\n=VAL :four\n-MAP\n+MAP\n=VAL :five\n=VAL :six\n=VAL :seven\n=VAL :eight\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "5GBF" : {
         "id" : "5GBF",
         "in_json" : "{\n  \"Folding\": \"Empty line\\nas a line feed\",\n  \"Chomping\": \"Clipped empty lines\\n\"\n}\n",
         "in_yaml" : "Folding:\n  \"Empty line\n   \t\n  as a line feed\"\nChomping: |\n  Clipped empty lines\n \n\n",
         "tags" : [
            "scalar",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :Folding\n=VAL \"Empty line\\nas a line feed\n=VAL :Chomping\n=VAL |Clipped empty lines\\n\n-MAP\n-DOC\n-STR\n"
      },
      "5KJE" : {
         "id" : "5KJE",
         "in_json" : "[\n  [\n    \"one\",\n    \"two\"\n  ],\n  [\n    \"three\",\n    \"four\"\n  ]\n]\n",
         "in_yaml" : "- [ one, two, ]\n- [three ,four]\n",
         "tags" : [
            "flow",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+SEQ\n=VAL :one\n=VAL :two\n-SEQ\n+SEQ\n=VAL :three\n=VAL :four\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "5NYZ" : {
         "id" : "5NYZ",
         "in_json" : "{\n  \"key\": \"value\"\n}\n",
         "in_yaml" : "key:    # Comment\n  value\n",
         "tags" : [
            "comment",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :key\n=VAL :value\n-MAP\n-DOC\n-STR\n"
      },
      "5TYM" : {
         "id" : "5TYM",
         "in_json" : null,
         "in_yaml" : "%TAG !m! !my-\n--- # Bulb here\n!m!light fluorescent\n...\n%TAG !m! !my-\n--- # Color here\n!m!light green\n",
         "tags" : [
            "directive",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL <!my-light> :fluorescent\n-DOC ...\n+DOC ---\n=VAL <!my-light> :green\n-DOC\n-STR\n"
      },
      "5WE3" : {
         "id" : "5WE3",
         "in_json" : "{\n  \"explicit key\": null,\n  \"block key\\n\": [\n    \"one\",\n    \"two\"\n  ]\n}\n",
         "in_yaml" : "? explicit key # Empty value\n? |\n  block key\n: - one # Explicit compact\n  - two # block value\n",
         "tags" : [
            "comment",
            "literal",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :explicit key\n=VAL :\n=VAL |block key\\n\n+SEQ\n=VAL :one\n=VAL :two\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "65WH" : {
         "id" : "65WH",
         "in_json" : "[\n  \"foo\"\n]\n",
         "in_yaml" : "- foo\n",
         "tags" : [
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :foo\n-SEQ\n-DOC\n-STR\n"
      },
      "6BCT" : {
         "id" : "6BCT",
         "in_json" : "[\n  {\n    \"foo\": \"bar\"\n  },\n  [\n    \"baz\",\n    \"baz\"\n  ]\n]\n",
         "in_yaml" : "- foo:\t bar\n- - baz\n  -\tbaz\n",
         "tags" : [
            "libyaml-err",
            "sequence",
            "spec",
            "upto-1.2",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :foo\n=VAL :bar\n-MAP\n+SEQ\n=VAL :baz\n=VAL :baz\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "6BFJ" : {
         "id" : "6BFJ",
         "in_json" : null,
         "in_yaml" : "---\n&mapping\n&key [ &item a, b, c ]: value\n",
         "tags" : [
            "anchor",
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP &mapping\n+SEQ &key\n=VAL &item :a\n=VAL :b\n=VAL :c\n-SEQ\n=VAL :value\n-MAP\n-DOC\n-STR\n"
      },
      "6CK3" : {
         "id" : "6CK3",
         "in_json" : null,
         "in_yaml" : "%TAG !e! tag:example.com,2000:app/\n---\n- !local foo\n- !!str bar\n- !e!tag%21 baz\n",
         "tags" : [
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ\n=VAL <!local> :foo\n=VAL <tag:yaml.org,2002:str> :bar\n=VAL <tag:example.com,2000:app/tag!> :baz\n-SEQ\n-DOC\n-STR\n"
      },
      "6FWR" : {
         "id" : "6FWR",
         "in_json" : "\"ab\\n\\n \\n\"\n",
         "in_yaml" : "--- |+\n ab\n \n  \n...\n",
         "tags" : [
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL |ab\\n\\n \\n\n-DOC ...\n-STR\n"
      },
      "6H3V" : {
         "id" : "6H3V",
         "in_json" : "{\n  \"foo: bar\\\\\": \"baz'\"\n}\n",
         "in_yaml" : "'foo: bar\\': baz'\n",
         "tags" : [
            "scalar",
            "single"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL 'foo: bar\\\\\n=VAL :baz'\n-MAP\n-DOC\n-STR\n"
      },
      "6HB6" : {
         "id" : "6HB6",
         "in_json" : "{\n  \"Not indented\": {\n    \"By one space\": \"By four\\n  spaces\\n\",\n    \"Flow style\": [\n      \"By two\",\n      \"Also by two\",\n      \"Still by two\"\n    ]\n  }\n}\n",
         "in_yaml" : "  # Leading comment line spaces are\n   # neither content nor indentation.\n    \nNot indented:\n By one space: |\n    By four\n      spaces\n Flow style: [    # Leading spaces\n   By two,        # in flow style\n  Also by two,    # are neither\n  \tStill by two   # content nor\n    ]             # indentation.\n",
         "tags" : [
            "indent",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :Not indented\n+MAP\n=VAL :By one space\n=VAL |By four\\n  spaces\\n\n=VAL :Flow style\n+SEQ\n=VAL :By two\n=VAL :Also by two\n=VAL :Still by two\n-SEQ\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "6JQW" : {
         "id" : "6JQW",
         "in_json" : "\"\\\\//||\\\\/||\\n// ||  ||__\\n\"\n",
         "in_yaml" : "# ASCII Art\n--- |\n  \\//||\\/||\n  // ||  ||__\n",
         "tags" : [
            "comment",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL |\\\\//||\\\\/||\\n// ||  ||__\\n\n-DOC\n-STR\n"
      },
      "6JWB" : {
         "id" : "6JWB",
         "in_json" : "{\n  \"foo\": [\n    \"a\",\n    {\n      \"key\": \"value\"\n    }\n  ]\n}\n",
         "in_yaml" : "foo: !!seq\n  - !!str a\n  - !!map\n    key: !!str value\n",
         "tags" : [
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n+SEQ <tag:yaml.org,2002:seq>\n=VAL <tag:yaml.org,2002:str> :a\n+MAP <tag:yaml.org,2002:map>\n=VAL :key\n=VAL <tag:yaml.org,2002:str> :value\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "6KGN" : {
         "id" : "6KGN",
         "in_json" : "{\n  \"a\": null,\n  \"b\": null\n}\n",
         "in_yaml" : "---\na: &anchor\nb: *anchor\n",
         "tags" : [
            "alias",
            "anchor"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :a\n=VAL &anchor :\n=VAL :b\n=ALI *anchor\n-MAP\n-DOC\n-STR\n"
      },
      "6LVF" : {
         "id" : "6LVF",
         "in_json" : "\"foo\"\n",
         "in_yaml" : "%FOO  bar baz # Should be ignored\n              # with a warning.\n--- \"foo\"\n",
         "tags" : [
            "1.3-err",
            "directive",
            "double",
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL \"foo\n-DOC\n-STR\n"
      },
      "6M2F" : {
         "id" : "6M2F",
         "in_json" : "{\n  \"a\": \"b\",\n  \"\": \"a\"\n}\n",
         "in_yaml" : "? &a a\n: &b b\n: *a\n",
         "tags" : [
            "alias",
            "missing"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL &a :a\n=VAL &b :b\n=VAL :\n=ALI *a\n-MAP\n-DOC\n-STR\n"
      },
      "6PBE" : {
         "id" : "6PBE",
         "in_json" : null,
         "in_yaml" : "---\n?\n- a\n- b\n:\n- c\n- d\n",
         "tags" : [
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n+SEQ\n=VAL :a\n=VAL :b\n-SEQ\n+SEQ\n=VAL :c\n=VAL :d\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "6SLA" : {
         "id" : "6SLA",
         "in_json" : "{\n  \"foo\\nbar:baz\\tx \\\\$%^&*()x\": 23,\n  \"x\\\\ny:z\\\\tx $%^&*()x\": 24\n}\n",
         "in_yaml" : "\"foo\\nbar:baz\\tx \\\\$%^&*()x\": 23\n'x\\ny:z\\tx $%^&*()x': 24\n",
         "tags" : [
            "double",
            "mapping",
            "single"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL \"foo\\nbar:baz\\tx \\\\$%^&*()x\n=VAL :23\n=VAL 'x\\\\ny:z\\\\tx $%^&*()x\n=VAL :24\n-MAP\n-DOC\n-STR\n"
      },
      "6VJK" : {
         "id" : "6VJK",
         "in_json" : "\"Sammy Sosa completed another fine season with great stats.\\n\\n  63 Home Runs\\n  0.288 Batting Average\\n\\nWhat a year!\\n\"\n",
         "in_yaml" : ">\n Sammy Sosa completed another\n fine season with great stats.\n\n   63 Home Runs\n   0.288 Batting Average\n\n What a year!\n",
         "tags" : [
            "1.3-err",
            "folded",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL >Sammy Sosa completed another fine season with great stats.\\n\\n  63 Home Runs\\n  0.288 Batting Average\\n\\nWhat a year!\\n\n-DOC\n-STR\n"
      },
      "6WLZ" : {
         "id" : "6WLZ",
         "in_json" : null,
         "in_yaml" : "# Private\n---\n!foo \"bar\"\n...\n# Global\n%TAG ! tag:example.com,2000:app/\n---\n!foo \"bar\"\n",
         "tags" : [
            "1.3-mod",
            "directive",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL <!foo> \"bar\n-DOC ...\n+DOC ---\n=VAL <tag:example.com,2000:app/foo> \"bar\n-DOC\n-STR\n"
      },
      "6WPF" : {
         "id" : "6WPF",
         "in_json" : "\" foo\\nbar\\nbaz \"\n",
         "in_yaml" : "---\n\"\n  foo \n \n    bar\n\n  baz\n\"\n",
         "tags" : [
            "1.3-mod",
            "scalar",
            "spec",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL \" foo\\nbar\\nbaz \n-DOC\n-STR\n"
      },
      "6ZKB" : {
         "id" : "6ZKB",
         "in_json" : "\"Document\"\nnull\n{\n  \"matches %\": 20\n}\n",
         "in_yaml" : "Document\n---\n# Empty\n...\n%YAML 1.2\n---\nmatches %: 20\n",
         "tags" : [
            "1.3-err",
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL :Document\n-DOC\n+DOC ---\n=VAL :\n-DOC ...\n+DOC ---\n+MAP\n=VAL :matches %\n=VAL :20\n-MAP\n-DOC\n-STR\n"
      },
      "735Y" : {
         "id" : "735Y",
         "in_json" : "[\n  \"flow in block\",\n  \"Block scalar\\n\",\n  {\n    \"foo\": \"bar\"\n  }\n]\n",
         "in_yaml" : "-\n  \"flow in block\"\n- >\n Block scalar\n- !!map # Block collection\n  foo : bar\n",
         "tags" : [
            "folded",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL \"flow in block\n=VAL >Block scalar\\n\n+MAP <tag:yaml.org,2002:map>\n=VAL :foo\n=VAL :bar\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "74H7" : {
         "id" : "74H7",
         "in_json" : "{\n  \"a\": \"b\",\n  \"c\": 42,\n  \"e\": \"f\",\n  \"g\": \"h\",\n  \"23\": false\n}\n",
         "in_yaml" : "!!str a: b\nc: !!int 42\ne: !!str f\ng: h\n!!int 23: !!bool false\n",
         "tags" : [
            "mapping",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL <tag:yaml.org,2002:str> :a\n=VAL :b\n=VAL :c\n=VAL <tag:yaml.org,2002:int> :42\n=VAL :e\n=VAL <tag:yaml.org,2002:str> :f\n=VAL :g\n=VAL :h\n=VAL <tag:yaml.org,2002:int> :23\n=VAL <tag:yaml.org,2002:bool> :false\n-MAP\n-DOC\n-STR\n"
      },
      "753E" : {
         "id" : "753E",
         "in_json" : "\"ab\"\n",
         "in_yaml" : "--- |-\n ab\n \n \n...\n",
         "tags" : [
            "1.3-mod",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL |ab\n-DOC ...\n-STR\n"
      },
      "77H8" : {
         "id" : "77H8",
         "in_json" : null,
         "in_yaml" : "---\nnot-date: !!str 2002-04-28\n\npicture: !!binary |\n R0lGODlhDAAMAIQAAP//9/X\n 17unp5WZmZgAAAOfn515eXv\n Pz7Y6OjuDg4J+fn5OTk6enp\n 56enmleECcgggoBADs=\n\napplication specific tag: !something |\n The semantics of the tag\n above may be different for\n different documents.\n",
         "tags" : [
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :not-date\n=VAL <tag:yaml.org,2002:str> :2002-04-28\n=VAL :picture\n=VAL <tag:yaml.org,2002:binary> |R0lGODlhDAAMAIQAAP//9/X\\n17unp5WZmZgAAAOfn515eXv\\nPz7Y6OjuDg4J+fn5OTk6enp\\n56enmleECcgggoBADs=\\n\n=VAL :application specific tag\n=VAL <!something> |The semantics of the tag\\nabove may be different for\\ndifferent documents.\\n\n-MAP\n-DOC\n-STR\n"
      },
      "7A4E" : {
         "id" : "7A4E",
         "in_json" : "\" 1st non-empty\\n2nd non-empty 3rd non-empty \"\n",
         "in_yaml" : "\" 1st non-empty\n\n 2nd non-empty \n\t3rd non-empty \"\n",
         "tags" : [
            "scalar",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n=VAL \" 1st non-empty\\n2nd non-empty 3rd non-empty \n-DOC\n-STR\n"
      },
      "7BMT" : {
         "id" : "7BMT",
         "in_json" : "{\n  \"top1\": {\n    \"key1\": \"one\"\n  },\n  \"top2\": {\n    \"key2\": \"two\"\n  },\n  \"top3\": {\n    \"key3\": \"three\"\n  },\n  \"top4\": {\n    \"key4\": \"four\"\n  },\n  \"top5\": {\n    \"key5\": \"five\"\n  },\n  \"top6\": \"six\",\n  \"top7\": \"seven\"\n}\n",
         "in_yaml" : "---\ntop1: &node1\n  &k1 key1: one\ntop2: &node2 # comment\n  key2: two\ntop3:\n  &k3 key3: three\ntop4: &node4\n  &k4 key4: four\ntop5: &node5\n  key5: five\ntop6: &val6\n  six\ntop7:\n  &val7 seven\n",
         "tags" : [
            "1.3-mod",
            "anchor",
            "comment"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :top1\n+MAP &node1\n=VAL &k1 :key1\n=VAL :one\n-MAP\n=VAL :top2\n+MAP &node2\n=VAL :key2\n=VAL :two\n-MAP\n=VAL :top3\n+MAP\n=VAL &k3 :key3\n=VAL :three\n-MAP\n=VAL :top4\n+MAP &node4\n=VAL &k4 :key4\n=VAL :four\n-MAP\n=VAL :top5\n+MAP &node5\n=VAL :key5\n=VAL :five\n-MAP\n=VAL :top6\n=VAL &val6 :six\n=VAL :top7\n=VAL &val7 :seven\n-MAP\n-DOC\n-STR\n"
      },
      "7BUB" : {
         "id" : "7BUB",
         "in_json" : "{\n  \"hr\": [\n    \"Mark McGwire\",\n    \"Sammy Sosa\"\n  ],\n  \"rbi\": [\n    \"Sammy Sosa\",\n    \"Ken Griffey\"\n  ]\n}\n",
         "in_yaml" : "---\nhr:\n  - Mark McGwire\n  # Following node labeled SS\n  - &SS Sammy Sosa\nrbi:\n  - *SS # Subsequent occurrence\n  - Ken Griffey\n",
         "tags" : [
            "alias",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :hr\n+SEQ\n=VAL :Mark McGwire\n=VAL &SS :Sammy Sosa\n-SEQ\n=VAL :rbi\n+SEQ\n=ALI *SS\n=VAL :Ken Griffey\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "7FWL" : {
         "id" : "7FWL",
         "in_json" : null,
         "in_yaml" : "!<tag:yaml.org,2002:str> foo :\n  !<!bar> baz\n",
         "tags" : [
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL <tag:yaml.org,2002:str> :foo\n=VAL <!bar> :baz\n-MAP\n-DOC\n-STR\n"
      },
      "7T8X" : {
         "id" : "7T8X",
         "in_json" : "\"\\nfolded line\\nnext line\\n  * bullet\\n\\n  * list\\n  * lines\\n\\nlast line\\n\"\n",
         "in_yaml" : ">\n\n folded\n line\n\n next\n line\n   * bullet\n\n   * list\n   * lines\n\n last\n line\n\n# Comment\n",
         "tags" : [
            "1.3-err",
            "comment",
            "folded",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL >\\nfolded line\\nnext line\\n  * bullet\\n\\n  * list\\n  * lines\\n\\nlast line\\n\n-DOC\n-STR\n"
      },
      "7TMG" : {
         "id" : "7TMG",
         "in_json" : "[\n  \"word1\",\n  \"word2\"\n]\n",
         "in_yaml" : "---\n[ word1\n# comment\n, word2]\n",
         "tags" : [
            "comment",
            "flow",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ\n=VAL :word1\n=VAL :word2\n-SEQ\n-DOC\n-STR\n"
      },
      "7W2P" : {
         "id" : "7W2P",
         "in_json" : "{\n  \"a\": null,\n  \"b\": null,\n  \"c\": null\n}\n",
         "in_yaml" : "? a\n? b\nc:\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL :\n=VAL :b\n=VAL :\n=VAL :c\n=VAL :\n-MAP\n-DOC\n-STR\n"
      },
      "7Z25" : {
         "id" : "7Z25",
         "in_json" : "\"scalar1\"\n{\n  \"key\": \"value\"\n}\n",
         "in_yaml" : "---\nscalar1\n...\nkey: value\n",
         "tags" : [
            "footer"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :scalar1\n-DOC ...\n+DOC\n+MAP\n=VAL :key\n=VAL :value\n-MAP\n-DOC\n-STR\n"
      },
      "7ZZ5" : {
         "id" : "7ZZ5",
         "in_json" : "{\n  \"nested sequences\": [\n    [\n      [\n        []\n      ]\n    ],\n    [\n      [\n        {}\n      ]\n    ]\n  ],\n  \"key1\": [],\n  \"key2\": {}\n}\n",
         "in_yaml" : "---\nnested sequences:\n- - - []\n- - - {}\nkey1: []\nkey2: {}\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :nested sequences\n+SEQ\n+SEQ\n+SEQ\n+SEQ\n-SEQ\n-SEQ\n-SEQ\n+SEQ\n+SEQ\n+MAP\n-MAP\n-SEQ\n-SEQ\n-SEQ\n=VAL :key1\n+SEQ\n-SEQ\n=VAL :key2\n+MAP\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "82AN" : {
         "id" : "82AN",
         "in_json" : "\"---word1 word2\"\n",
         "in_yaml" : "---word1\nword2\n",
         "tags" : [
            "1.3-err",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n=VAL :---word1 word2\n-DOC\n-STR\n"
      },
      "87E4" : {
         "id" : "87E4",
         "in_json" : "{\n  \"implicit block key\": [\n    {\n      \"implicit flow key\": \"value\"\n    }\n  ]\n}\n",
         "in_yaml" : "'implicit block key' : [\n  'implicit flow key' : value,\n ]\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL 'implicit block key\n+SEQ\n+MAP\n=VAL 'implicit flow key\n=VAL :value\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "8CWC" : {
         "id" : "8CWC",
         "in_json" : "{\n  \"key ends with two colons::\": \"value\"\n}\n",
         "in_yaml" : "---\nkey ends with two colons::: value\n",
         "tags" : [
            "mapping",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :key ends with two colons::\n=VAL :value\n-MAP\n-DOC\n-STR\n"
      },
      "8G76" : {
         "id" : "8G76",
         "in_json" : "",
         "in_yaml" : "  # Comment\n   \n\n\n",
         "tags" : [
            "comment",
            "empty",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n-STR\n"
      },
      "8MK2" : {
         "id" : "8MK2",
         "in_json" : "\"a\"\n",
         "in_yaml" : "! a\n",
         "tags" : [
            "1.3-err",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n=VAL <!> :a\n-DOC\n-STR\n"
      },
      "8QBE" : {
         "id" : "8QBE",
         "in_json" : "{\n  \"key\": [\n    \"item1\",\n    \"item2\"\n  ]\n}\n",
         "in_yaml" : "key:\n - item1\n - item2\n",
         "tags" : [
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :key\n+SEQ\n=VAL :item1\n=VAL :item2\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "8UDB" : {
         "id" : "8UDB",
         "in_json" : "[\n  \"double quoted\",\n  \"single quoted\",\n  \"plain text\",\n  [\n    \"nested\"\n  ],\n  {\n    \"single\": \"pair\"\n  }\n]\n",
         "in_yaml" : "[\n\"double\n quoted\", 'single\n           quoted',\nplain\n text, [ nested ],\nsingle: pair,\n]\n",
         "tags" : [
            "flow",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL \"double quoted\n=VAL 'single quoted\n=VAL :plain text\n+SEQ\n=VAL :nested\n-SEQ\n+MAP\n=VAL :single\n=VAL :pair\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "8XYN" : {
         "id" : "8XYN",
         "in_json" : "[\n  \"unicode anchor\"\n]\n",
         "in_yaml" : "---\n- &\ud83d\ude01 unicode anchor\n",
         "tags" : [
            "anchor"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ\n=VAL &\ud83d\ude01 :unicode anchor\n-SEQ\n-DOC\n-STR\n"
      },
      "93JH" : {
         "id" : "93JH",
         "in_json" : "[\n  {\n    \"key\": \"value\",\n    \"key2\": \"value2\"\n  },\n  {\n    \"key3\": \"value3\"\n  }\n]\n",
         "in_yaml" : " - key: value\n   key2: value2\n -\n   key3: value3\n",
         "tags" : [
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :key\n=VAL :value\n=VAL :key2\n=VAL :value2\n-MAP\n+MAP\n=VAL :key3\n=VAL :value3\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "93WF" : {
         "id" : "93WF",
         "in_json" : "\"trimmed\\n\\n\\nas space\"\n",
         "in_yaml" : "--- >-\n  trimmed\n  \n \n\n  as\n  space\n",
         "tags" : [
            "1.3-mod",
            "scalar",
            "spec",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL >trimmed\\n\\n\\nas space\n-DOC\n-STR\n"
      },
      "96L6" : {
         "id" : "96L6",
         "in_json" : "\"Mark McGwire's year was crippled by a knee injury.\\n\"\n",
         "in_yaml" : "--- >\n  Mark McGwire's\n  year was crippled\n  by a knee injury.\n",
         "tags" : [
            "folded",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL >Mark McGwire's year was crippled by a knee injury.\\n\n-DOC\n-STR\n"
      },
      "98YD" : {
         "id" : "98YD",
         "in_json" : "",
         "in_yaml" : "# Comment only.\n",
         "tags" : [
            "comment",
            "empty",
            "spec"
         ],
         "test_event" : "+STR\n-STR\n"
      },
      "9DXL" : {
         "id" : "9DXL",
         "in_json" : "{\n  \"Mapping\": \"Document\"\n}\nnull\n{\n  \"matches %\": 20\n}\n",
         "in_yaml" : "Mapping: Document\n---\n# Empty\n...\n%YAML 1.2\n---\nmatches %: 20\n",
         "tags" : [
            "1.3-mod",
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :Mapping\n=VAL :Document\n-MAP\n-DOC\n+DOC ---\n=VAL :\n-DOC ...\n+DOC ---\n+MAP\n=VAL :matches %\n=VAL :20\n-MAP\n-DOC\n-STR\n"
      },
      "9FMG" : {
         "id" : "9FMG",
         "in_json" : "{\n  \"a\": {\n    \"b\": {\n      \"c\": \"d\"\n    },\n    \"e\": {\n      \"f\": \"g\"\n    }\n  },\n  \"h\": \"i\"\n}\n",
         "in_yaml" : "a:\n  b:\n    c: d\n  e:\n    f: g\nh: i\n",
         "tags" : [
            "indent",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n+MAP\n=VAL :b\n+MAP\n=VAL :c\n=VAL :d\n-MAP\n=VAL :e\n+MAP\n=VAL :f\n=VAL :g\n-MAP\n-MAP\n=VAL :h\n=VAL :i\n-MAP\n-DOC\n-STR\n"
      },
      "9J7A" : {
         "id" : "9J7A",
         "in_json" : "{\n  \"foo\": {\n    \"bar\": \"baz\"\n  }\n}\n",
         "in_yaml" : "foo:\n  bar: baz\n",
         "tags" : [
            "indent",
            "mapping",
            "simple"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n+MAP\n=VAL :bar\n=VAL :baz\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "9KAX" : {
         "id" : "9KAX",
         "in_json" : "\"scalar1\"\n\"scalar2\"\n\"scalar3\"\n{\n  \"key5\": \"value4\"\n}\n{\n  \"a6\": 1,\n  \"b6\": 2\n}\n{\n  \"key8\": \"value7\"\n}\n{\n  \"key10\": \"value9\"\n}\n\"value11\"\n",
         "in_yaml" : "---\n&a1\n!!str\nscalar1\n---\n!!str\n&a2\nscalar2\n---\n&a3\n!!str scalar3\n---\n&a4 !!map\n&a5 !!str key5: value4\n---\na6: 1\n&anchor6 b6: 2\n---\n!!map\n&a8 !!str key8: value7\n---\n!!map\n!!str &a10 key10: value9\n---\n!!str &a11\nvalue11\n",
         "tags" : [
            "1.3-err",
            "anchor",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL &a1 <tag:yaml.org,2002:str> :scalar1\n-DOC\n+DOC ---\n=VAL &a2 <tag:yaml.org,2002:str> :scalar2\n-DOC\n+DOC ---\n=VAL &a3 <tag:yaml.org,2002:str> :scalar3\n-DOC\n+DOC ---\n+MAP &a4 <tag:yaml.org,2002:map>\n=VAL &a5 <tag:yaml.org,2002:str> :key5\n=VAL :value4\n-MAP\n-DOC\n+DOC ---\n+MAP\n=VAL :a6\n=VAL :1\n=VAL &anchor6 :b6\n=VAL :2\n-MAP\n-DOC\n+DOC ---\n+MAP <tag:yaml.org,2002:map>\n=VAL &a8 <tag:yaml.org,2002:str> :key8\n=VAL :value7\n-MAP\n-DOC\n+DOC ---\n+MAP <tag:yaml.org,2002:map>\n=VAL &a10 <tag:yaml.org,2002:str> :key10\n=VAL :value9\n-MAP\n-DOC\n+DOC ---\n=VAL &a11 <tag:yaml.org,2002:str> :value11\n-DOC\n-STR\n"
      },
      "9MMW" : {
         "id" : "9MMW",
         "in_json" : null,
         "in_yaml" : "- [ YAML : separate ]\n- [ : empty key entry ]\n- [ \"JSON like\":adjacent ]\n",
         "tags" : [
            "1.3-mod",
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+SEQ\n+MAP\n=VAL :YAML\n=VAL :separate\n-MAP\n-SEQ\n+SEQ\n+MAP\n=VAL :\n=VAL :empty key entry\n-MAP\n-SEQ\n+SEQ\n+MAP\n=VAL \"JSON like\n=VAL :adjacent\n-MAP\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "9SHH" : {
         "id" : "9SHH",
         "in_json" : "{\n  \"single\": \"text\",\n  \"double\": \"text\"\n}\n",
         "in_yaml" : "single: 'text'\ndouble: \"text\"\n",
         "tags" : [
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :single\n=VAL 'text\n=VAL :double\n=VAL \"text\n-MAP\n-DOC\n-STR\n"
      },
      "9TFX" : {
         "id" : "9TFX",
         "in_json" : "\" 1st non-empty\\n2nd non-empty 3rd non-empty \"\n",
         "in_yaml" : "---\n\" 1st non-empty\n\n 2nd non-empty \n 3rd non-empty \"\n",
         "tags" : [
            "1.3-mod",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL \" 1st non-empty\\n2nd non-empty 3rd non-empty \n-DOC\n-STR\n"
      },
      "9U5K" : {
         "id" : "9U5K",
         "in_json" : "[\n  {\n    \"item\": \"Super Hoop\",\n    \"quantity\": 1\n  },\n  {\n    \"item\": \"Basketball\",\n    \"quantity\": 4\n  },\n  {\n    \"item\": \"Big Shoes\",\n    \"quantity\": 1\n  }\n]\n",
         "in_yaml" : "---\n# Products purchased\n- item    : Super Hoop\n  quantity: 1\n- item    : Basketball\n  quantity: 4\n- item    : Big Shoes\n  quantity: 1\n",
         "tags" : [
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ\n+MAP\n=VAL :item\n=VAL :Super Hoop\n=VAL :quantity\n=VAL :1\n-MAP\n+MAP\n=VAL :item\n=VAL :Basketball\n=VAL :quantity\n=VAL :4\n-MAP\n+MAP\n=VAL :item\n=VAL :Big Shoes\n=VAL :quantity\n=VAL :1\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "9WXW" : {
         "id" : "9WXW",
         "in_json" : null,
         "in_yaml" : "# Private\n!foo \"bar\"\n...\n# Global\n%TAG ! tag:example.com,2000:app/\n---\n!foo \"bar\"\n",
         "tags" : [
            "1.3-err",
            "directive",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n=VAL <!foo> \"bar\n-DOC ...\n+DOC ---\n=VAL <tag:example.com,2000:app/foo> \"bar\n-DOC\n-STR\n"
      },
      "9YRD" : {
         "id" : "9YRD",
         "in_json" : "\"a b c d\\ne\"\n",
         "in_yaml" : "a\nb  \n  c\nd\n\ne\n",
         "tags" : [
            "1.3-err",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n=VAL :a b c d\\ne\n-DOC\n-STR\n"
      },
      "A2M4" : {
         "id" : "A2M4",
         "in_json" : "{\n  \"a\": [\n    \"b\",\n    [\n      \"c\",\n      \"d\"\n    ]\n  ]\n}\n",
         "in_yaml" : "? a\n: -\tb\n  -  -\tc\n     - d\n",
         "tags" : [
            "indent",
            "libyaml-err",
            "sequence",
            "spec",
            "upto-1.2",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n+SEQ\n=VAL :b\n+SEQ\n=VAL :c\n=VAL :d\n-SEQ\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "A6F9" : {
         "id" : "A6F9",
         "in_json" : "{\n  \"strip\": \"text\",\n  \"clip\": \"text\\n\",\n  \"keep\": \"text\\n\"\n}\n",
         "in_yaml" : "strip: |-\n  text\nclip: |\n  text\nkeep: |+\n  text\n",
         "tags" : [
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :strip\n=VAL |text\n=VAL :clip\n=VAL |text\\n\n=VAL :keep\n=VAL |text\\n\n-MAP\n-DOC\n-STR\n"
      },
      "A984" : {
         "id" : "A984",
         "in_json" : "{\n  \"a\": \"b c\",\n  \"d\": \"e f\"\n}\n",
         "in_yaml" : "a: b\n c\nd:\n e\n  f\n",
         "tags" : [
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL :b c\n=VAL :d\n=VAL :e f\n-MAP\n-DOC\n-STR\n"
      },
      "AB8U" : {
         "id" : "AB8U",
         "in_json" : "[\n  \"single multiline - sequence entry\"\n]\n",
         "in_yaml" : "- single multiline\n - sequence entry\n",
         "tags" : [
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :single multiline - sequence entry\n-SEQ\n-DOC\n-STR\n"
      },
      "AVM7" : {
         "id" : "AVM7",
         "in_json" : "",
         "in_yaml" : "",
         "tags" : [
            "edge"
         ],
         "test_event" : "+STR\n-STR\n"
      },
      "AZ63" : {
         "id" : "AZ63",
         "in_json" : "{\n  \"1\": [\n    2,\n    3\n  ],\n  \"4\": 5\n}\n",
         "in_yaml" : "1:\n- 2\n- 3\n4: 5\n",
         "tags" : [
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :1\n+SEQ\n=VAL :2\n=VAL :3\n-SEQ\n=VAL :4\n=VAL :5\n-MAP\n-DOC\n-STR\n"
      },
      "AZW3" : {
         "id" : "AZW3",
         "in_json" : "[\n  {\n    \"bla\\\"keks\": \"foo\"\n  },\n  {\n    \"bla]keks\": \"foo\"\n  }\n]\n",
         "in_yaml" : "- bla\"keks: foo\n- bla]keks: foo\n",
         "tags" : [
            "edge",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :bla\"keks\n=VAL :foo\n-MAP\n+MAP\n=VAL :bla]keks\n=VAL :foo\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "B3HG" : {
         "id" : "B3HG",
         "in_json" : "\"folded text\\n\"\n",
         "in_yaml" : "--- >\n folded\n text\n\n\n",
         "tags" : [
            "1.3-mod",
            "folded",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL >folded text\\n\n-DOC\n-STR\n"
      },
      "BEC7" : {
         "id" : "BEC7",
         "in_json" : "\"foo\"\n",
         "in_yaml" : "%YAML 1.3 # Attempt parsing\n          # with a warning\n---\n\"foo\"\n",
         "tags" : [
            "directive",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL \"foo\n-DOC\n-STR\n"
      },
      "BU8L" : {
         "id" : "BU8L",
         "in_json" : "{\n  \"key\": {\n    \"a\": \"b\"\n  }\n}\n",
         "in_yaml" : "key: &anchor\n !!map\n  a: b\n",
         "tags" : [
            "1.3-err",
            "anchor",
            "indent"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :key\n+MAP &anchor <tag:yaml.org,2002:map>\n=VAL :a\n=VAL :b\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "C2DT" : {
         "id" : "C2DT",
         "in_json" : "{\n  \"adjacent\": \"value\",\n  \"readable\": \"value\",\n  \"empty\": null\n}\n",
         "in_yaml" : "{\n\"adjacent\":value,\n\"readable\": value,\n\"empty\":\n}\n",
         "tags" : [
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL \"adjacent\n=VAL :value\n=VAL \"readable\n=VAL :value\n=VAL \"empty\n=VAL :\n-MAP\n-DOC\n-STR\n"
      },
      "C4HZ" : {
         "id" : "C4HZ",
         "in_json" : null,
         "in_yaml" : "%TAG ! tag:clarkevans.com,2002:\n--- !shape\n  # Use the ! handle for presenting\n  # tag:clarkevans.com,2002:circle\n- !circle\n  center: &ORIGIN {x: 73, y: 129}\n  radius: 7\n- !line\n  start: *ORIGIN\n  finish: { x: 89, y: 102 }\n- !label\n  start: *ORIGIN\n  color: 0xFFEEBB\n  text: Pretty vector drawing.\n",
         "tags" : [
            "alias",
            "directive",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ <tag:clarkevans.com,2002:shape>\n+MAP <tag:clarkevans.com,2002:circle>\n=VAL :center\n+MAP &ORIGIN\n=VAL :x\n=VAL :73\n=VAL :y\n=VAL :129\n-MAP\n=VAL :radius\n=VAL :7\n-MAP\n+MAP <tag:clarkevans.com,2002:line>\n=VAL :start\n=ALI *ORIGIN\n=VAL :finish\n+MAP\n=VAL :x\n=VAL :89\n=VAL :y\n=VAL :102\n-MAP\n-MAP\n+MAP <tag:clarkevans.com,2002:label>\n=VAL :start\n=ALI *ORIGIN\n=VAL :color\n=VAL :0xFFEEBB\n=VAL :text\n=VAL :Pretty vector drawing.\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "CC74" : {
         "id" : "CC74",
         "in_json" : null,
         "in_yaml" : "%TAG !e! tag:example.com,2000:app/\n---\n!e!foo \"bar\"\n",
         "tags" : [
            "directive",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL <tag:example.com,2000:app/foo> \"bar\n-DOC\n-STR\n"
      },
      "CN3R" : {
         "id" : "CN3R",
         "in_json" : "[\n  {\n    \"a\": \"b\"\n  },\n  {\n    \"c\": \"d\"\n  },\n  {\n    \"e\": \"f\"\n  },\n  {\n    \"g\": \"h\"\n  }\n]\n",
         "in_yaml" : "&flowseq [\n a: b,\n &c c: d,\n { &e e: f },\n &g { g: h }\n]\n",
         "tags" : [
            "anchor",
            "flow"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ &flowseq\n+MAP\n=VAL :a\n=VAL :b\n-MAP\n+MAP\n=VAL &c :c\n=VAL :d\n-MAP\n+MAP\n=VAL &e :e\n=VAL :f\n-MAP\n+MAP &g\n=VAL :g\n=VAL :h\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "CT4Q" : {
         "id" : "CT4Q",
         "in_json" : "[\n  {\n    \"foo bar\": \"baz\"\n  }\n]\n",
         "in_yaml" : "[\n? foo\n bar : baz\n]\n",
         "tags" : [
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :foo bar\n=VAL :baz\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "CUP7" : {
         "id" : "CUP7",
         "in_json" : "{\n  \"anchored\": \"value\",\n  \"alias\": \"value\"\n}\n",
         "in_yaml" : "anchored: !local &anchor value\nalias: *anchor\n",
         "tags" : [
            "alias",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :anchored\n=VAL &anchor <!local> :value\n=VAL :alias\n=ALI *anchor\n-MAP\n-DOC\n-STR\n"
      },
      "D83L" : {
         "id" : "D83L",
         "in_json" : "[\n  \"explicit indent and chomp\",\n  \"chomp and explicit indent\"\n]\n",
         "in_yaml" : "- |2-\n  explicit indent and chomp\n- |-2\n  chomp and explicit indent\n",
         "tags" : [
            "literal"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL |explicit indent and chomp\n=VAL |chomp and explicit indent\n-SEQ\n-DOC\n-STR\n"
      },
      "D88J" : {
         "id" : "D88J",
         "in_json" : "{\n  \"a\": [\n    \"b\",\n    \"c\"\n  ]\n}\n",
         "in_yaml" : "a: [b, c]\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n+SEQ\n=VAL :b\n=VAL :c\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "D9TU" : {
         "id" : "D9TU",
         "in_json" : "{\n  \"foo\": \"bar\"\n}\n",
         "in_yaml" : "foo: bar\n",
         "tags" : [
            "mapping",
            "simple"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n=VAL :bar\n-MAP\n-DOC\n-STR\n"
      },
      "DBG4" : {
         "id" : "DBG4",
         "in_json" : "[\n  \"::vector\",\n  \": - ()\",\n  \"Up, up, and away!\",\n  -123,\n  \"http://example.com/foo#bar\",\n  [\n    \"::vector\",\n    \": - ()\",\n    \"Up, up and away!\",\n    -123,\n    \"http://example.com/foo#bar\"\n  ]\n]\n",
         "in_yaml" : "# Outside flow collection:\n- ::vector\n- \": - ()\"\n- Up, up, and away!\n- -123\n- http://example.com/foo#bar\n# Inside flow collection:\n- [ ::vector,\n  \": - ()\",\n  \"Up, up and away!\",\n  -123,\n  http://example.com/foo#bar ]\n",
         "tags" : [
            "flow",
            "scalar",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :::vector\n=VAL \": - ()\n=VAL :Up, up, and away!\n=VAL :-123\n=VAL :http://example.com/foo#bar\n+SEQ\n=VAL :::vector\n=VAL \": - ()\n=VAL \"Up, up and away!\n=VAL :-123\n=VAL :http://example.com/foo#bar\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "DC7X" : {
         "id" : "DC7X",
         "in_json" : "{\n  \"a\": \"b\",\n  \"seq\": [\n    \"a\"\n  ],\n  \"c\": \"d\"\n}\n",
         "in_yaml" : "a: b\t\nseq:\t\n - a\t\nc: d\t#X\n",
         "tags" : [
            "comment",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL :b\n=VAL :seq\n+SEQ\n=VAL :a\n-SEQ\n=VAL :c\n=VAL :d\n-MAP\n-DOC\n-STR\n"
      },
      "DFF7" : {
         "id" : "DFF7",
         "in_json" : null,
         "in_yaml" : "{\n? explicit: entry,\nimplicit: entry,\n?\n}\n",
         "tags" : [
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :explicit\n=VAL :entry\n=VAL :implicit\n=VAL :entry\n=VAL :\n=VAL :\n-MAP\n-DOC\n-STR\n"
      },
      "DHP8" : {
         "id" : "DHP8",
         "in_json" : "[\n  \"foo\",\n  \"bar\",\n  42\n]\n",
         "in_yaml" : "[foo, bar, 42]\n",
         "tags" : [
            "flow",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :foo\n=VAL :bar\n=VAL :42\n-SEQ\n-DOC\n-STR\n"
      },
      "DK3J" : {
         "id" : "DK3J",
         "in_json" : "\"line1 # no comment line3\\n\"\n",
         "in_yaml" : "--- >\nline1\n# no comment\nline3\n",
         "tags" : [
            "comment",
            "folded",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL >line1 # no comment line3\\n\n-DOC\n-STR\n"
      },
      "DWX9" : {
         "id" : "DWX9",
         "in_json" : "\"\\n\\nliteral\\n \\n\\ntext\\n\"\n",
         "in_yaml" : "|\n \n  \n  literal\n   \n  \n  text\n\n # Comment\n",
         "tags" : [
            "1.3-err",
            "comment",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL |\\n\\nliteral\\n \\n\\ntext\\n\n-DOC\n-STR\n"
      },
      "E76Z" : {
         "id" : "E76Z",
         "in_json" : "{\n  \"a\": \"b\"\n}\n",
         "in_yaml" : "&a a: &b b\n*a : *b\n",
         "tags" : [
            "alias",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL &a :a\n=VAL &b :b\n=ALI *a\n=ALI *b\n-MAP\n-DOC\n-STR\n"
      },
      "EHF6" : {
         "id" : "EHF6",
         "in_json" : "{\n  \"k\": [\n    \"a\",\n    \"b\"\n  ]\n}\n",
         "in_yaml" : "!!map {\n  k: !!seq\n  [ a, !!str b]\n}\n",
         "tags" : [
            "flow",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP <tag:yaml.org,2002:map>\n=VAL :k\n+SEQ <tag:yaml.org,2002:seq>\n=VAL :a\n=VAL <tag:yaml.org,2002:str> :b\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "EX5H" : {
         "id" : "EX5H",
         "in_json" : "\"a b c d\\ne\"\n",
         "in_yaml" : "---\na\nb  \n  c\nd\n\ne\n",
         "tags" : [
            "1.3-mod",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :a b c d\\ne\n-DOC\n-STR\n"
      },
      "EXG3" : {
         "id" : "EXG3",
         "in_json" : "\"---word1 word2\"\n",
         "in_yaml" : "---\n---word1\nword2\n",
         "tags" : [
            "1.3-mod",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :---word1 word2\n-DOC\n-STR\n"
      },
      "F2C7" : {
         "id" : "F2C7",
         "in_json" : "[\n  \"a\",\n  2,\n  4,\n  \"d\"\n]\n",
         "in_yaml" : " - &a !!str a\n - !!int 2\n - !!int &c 4\n - &d d\n",
         "tags" : [
            "anchor",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL &a <tag:yaml.org,2002:str> :a\n=VAL <tag:yaml.org,2002:int> :2\n=VAL &c <tag:yaml.org,2002:int> :4\n=VAL &d :d\n-SEQ\n-DOC\n-STR\n"
      },
      "F3CP" : {
         "id" : "F3CP",
         "in_json" : "{\n  \"a\": [\n    \"b\",\n    \"c\",\n    {\n      \"d\": [\n        \"e\",\n        \"f\"\n      ]\n    }\n  ]\n}\n",
         "in_yaml" : "---\n{ a: [b, c, { d: [e, f] } ] }\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :a\n+SEQ\n=VAL :b\n=VAL :c\n+MAP\n=VAL :d\n+SEQ\n=VAL :e\n=VAL :f\n-SEQ\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "F6MC" : {
         "id" : "F6MC",
         "in_json" : "{\n  \"a\": \" more indented\\nregular\\n\",\n  \"b\": \"\\n\\n more indented\\nregular\\n\"\n}\n",
         "in_yaml" : "---\na: >2\n   more indented\n  regular\nb: >2\n\n\n   more indented\n  regular\n",
         "tags" : [
            "folded",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :a\n=VAL > more indented\\nregular\\n\n=VAL :b\n=VAL >\\n\\n more indented\\nregular\\n\n-MAP\n-DOC\n-STR\n"
      },
      "F8F9" : {
         "id" : "F8F9",
         "in_json" : "{\n  \"strip\": \"# text\",\n  \"clip\": \"# text\\n\",\n  \"keep\": \"# text\\n\\n\"\n}\n",
         "in_yaml" : " # Strip\n  # Comments:\nstrip: |-\n  # text\n  \n # Clip\n  # comments:\n\nclip: |\n  # text\n \n # Keep\n  # comments:\n\nkeep: |+\n  # text\n\n # Trail\n  # comments.\n",
         "tags" : [
            "comment",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :strip\n=VAL |# text\n=VAL :clip\n=VAL |# text\\n\n=VAL :keep\n=VAL |# text\\n\\n\n-MAP\n-DOC\n-STR\n"
      },
      "FBC9" : {
         "id" : "FBC9",
         "in_json" : "{\n  \"safe\": \"a!\\\"#$%&'()*+,-./09:;<=>?@AZ[\\\\]^_`az{|}~ !\\\"#$%&'()*+,-./09:;<=>?@AZ[\\\\]^_`az{|}~\",\n  \"safe question mark\": \"?foo\",\n  \"safe colon\": \":foo\",\n  \"safe dash\": \"-foo\"\n}\n",
         "in_yaml" : "safe: a!\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\n     !\"#$%&'()*+,-./09:;<=>?@AZ[\\]^_`az{|}~\nsafe question mark: ?foo\nsafe colon: :foo\nsafe dash: -foo\n",
         "tags" : [
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :safe\n=VAL :a!\"#$%&'()*+,-./09:;<=>?@AZ[\\\\]^_`az{|}~ !\"#$%&'()*+,-./09:;<=>?@AZ[\\\\]^_`az{|}~\n=VAL :safe question mark\n=VAL :?foo\n=VAL :safe colon\n=VAL ::foo\n=VAL :safe dash\n=VAL :-foo\n-MAP\n-DOC\n-STR\n"
      },
      "FH7J" : {
         "id" : "FH7J",
         "in_json" : null,
         "in_yaml" : "- !!str\n-\n  !!null : a\n  b: !!str\n- !!str : !!null\n",
         "tags" : [
            "scalar",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL <tag:yaml.org,2002:str> :\n+MAP\n=VAL <tag:yaml.org,2002:null> :\n=VAL :a\n=VAL :b\n=VAL <tag:yaml.org,2002:str> :\n-MAP\n+MAP\n=VAL <tag:yaml.org,2002:str> :\n=VAL <tag:yaml.org,2002:null> :\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "FP8R" : {
         "id" : "FP8R",
         "in_json" : "\"line1 line2 line3\\n\"\n",
         "in_yaml" : "--- >\nline1\nline2\nline3\n",
         "tags" : [
            "folded",
            "indent",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL >line1 line2 line3\\n\n-DOC\n-STR\n"
      },
      "FQ7F" : {
         "id" : "FQ7F",
         "in_json" : "[\n  \"Mark McGwire\",\n  \"Sammy Sosa\",\n  \"Ken Griffey\"\n]\n",
         "in_yaml" : "- Mark McGwire\n- Sammy Sosa\n- Ken Griffey\n",
         "tags" : [
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :Mark McGwire\n=VAL :Sammy Sosa\n=VAL :Ken Griffey\n-SEQ\n-DOC\n-STR\n"
      },
      "FRK4" : {
         "id" : "FRK4",
         "in_json" : null,
         "in_yaml" : "{\n  ? foo :,\n  : bar,\n}\n",
         "tags" : [
            "flow",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n=VAL :\n=VAL :\n=VAL :bar\n-MAP\n-DOC\n-STR\n"
      },
      "FTA2" : {
         "id" : "FTA2",
         "in_json" : "[\n  \"a\"\n]\n",
         "in_yaml" : "--- &sequence\n- a\n",
         "tags" : [
            "anchor",
            "header",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ &sequence\n=VAL :a\n-SEQ\n-DOC\n-STR\n"
      },
      "FUP4" : {
         "id" : "FUP4",
         "in_json" : "[\n  \"a\",\n  [\n    \"b\",\n    \"c\"\n  ]\n]\n",
         "in_yaml" : "[a, [b, c]]\n",
         "tags" : [
            "flow",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :a\n+SEQ\n=VAL :b\n=VAL :c\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "G4RS" : {
         "id" : "G4RS",
         "in_json" : "{\n  \"unicode\": \"Sosa did fine.\u263a\",\n  \"control\": \"\\b1998\\t1999\\t2000\\n\",\n  \"hex esc\": \"\\r\\n is \\r\\n\",\n  \"single\": \"\\\"Howdy!\\\" he cried.\",\n  \"quoted\": \" # Not a 'comment'.\",\n  \"tie-fighter\": \"|\\\\-*-/|\"\n}\n",
         "in_yaml" : "unicode: \"Sosa did fine.\\u263A\"\ncontrol: \"\\b1998\\t1999\\t2000\\n\"\nhex esc: \"\\x0d\\x0a is \\r\\n\"\n\nsingle: '\"Howdy!\" he cried.'\nquoted: ' # Not a ''comment''.'\ntie-fighter: '|\\-*-/|'\n",
         "tags" : [
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :unicode\n=VAL \"Sosa did fine.\u263a\n=VAL :control\n=VAL \"\\b1998\\t1999\\t2000\\n\n=VAL :hex esc\n=VAL \"\\r\\n is \\r\\n\n=VAL :single\n=VAL '\"Howdy!\" he cried.\n=VAL :quoted\n=VAL ' # Not a 'comment'.\n=VAL :tie-fighter\n=VAL '|\\\\-*-/|\n-MAP\n-DOC\n-STR\n"
      },
      "G992" : {
         "id" : "G992",
         "in_json" : "\"folded text\\n\"\n",
         "in_yaml" : ">\n folded\n text\n\n\n",
         "tags" : [
            "1.3-err",
            "folded",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL >folded text\\n\n-DOC\n-STR\n"
      },
      "GH63" : {
         "id" : "GH63",
         "in_json" : "{\n  \"a\": 13,\n  \"1.5\": \"d\"\n}\n",
         "in_yaml" : "? a\n: 13\n1.5: d\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL :13\n=VAL :1.5\n=VAL :d\n-MAP\n-DOC\n-STR\n"
      },
      "H2RW" : {
         "id" : "H2RW",
         "in_json" : "{\n  \"foo\": 1,\n  \"bar\": 2,\n  \"text\": \"a\\n  \\nb\\n\\nc\\n\\nd\\n\"\n}\n",
         "in_yaml" : "foo: 1\n\nbar: 2\n    \ntext: |\n  a\n    \n  b\n\n  c\n \n  d\n",
         "tags" : [
            "comment",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n=VAL :1\n=VAL :bar\n=VAL :2\n=VAL :text\n=VAL |a\\n  \\nb\\n\\nc\\n\\nd\\n\n-MAP\n-DOC\n-STR\n"
      },
      "H3Z8" : {
         "id" : "H3Z8",
         "in_json" : "{\n  \"wanted\": \"love \u2665 and peace \u262e\"\n}\n",
         "in_yaml" : "---\nwanted: love \u2665 and peace \u262e\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :wanted\n=VAL :love \u2665 and peace \u262e\n-MAP\n-DOC\n-STR\n"
      },
      "HMK4" : {
         "id" : "HMK4",
         "in_json" : "{\n  \"name\": \"Mark McGwire\",\n  \"accomplishment\": \"Mark set a major league home run record in 1998.\\n\",\n  \"stats\": \"65 Home Runs\\n0.278 Batting Average\\n\"\n}\n",
         "in_yaml" : "name: Mark McGwire\naccomplishment: >\n  Mark set a major league\n  home run record in 1998.\nstats: |\n  65 Home Runs\n  0.278 Batting Average\n",
         "tags" : [
            "folded",
            "literal",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :name\n=VAL :Mark McGwire\n=VAL :accomplishment\n=VAL >Mark set a major league home run record in 1998.\\n\n=VAL :stats\n=VAL |65 Home Runs\\n0.278 Batting Average\\n\n-MAP\n-DOC\n-STR\n"
      },
      "HMQ5" : {
         "id" : "HMQ5",
         "in_json" : "{\n  \"foo\": \"bar\",\n  \"baz\": \"foo\"\n}\n",
         "in_yaml" : "!!str &a1 \"foo\":\n  !!str bar\n&a2 baz : *a1\n",
         "tags" : [
            "alias",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL &a1 <tag:yaml.org,2002:str> \"foo\n=VAL <tag:yaml.org,2002:str> :bar\n=VAL &a2 :baz\n=ALI *a1\n-MAP\n-DOC\n-STR\n"
      },
      "HS5T" : {
         "id" : "HS5T",
         "in_json" : "\"1st non-empty\\n2nd non-empty 3rd non-empty\"\n",
         "in_yaml" : "1st non-empty\n\n 2nd non-empty \n\t3rd non-empty\n",
         "tags" : [
            "scalar",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n=VAL :1st non-empty\\n2nd non-empty 3rd non-empty\n-DOC\n-STR\n"
      },
      "J3BT" : {
         "id" : "J3BT",
         "in_json" : "{\n  \"quoted\": \"Quoted \\t\",\n  \"block\": \"void main() {\\n\\tprintf(\\\"Hello, world!\\\\n\\\");\\n}\\n\"\n}\n",
         "in_yaml" : "# Tabs and spaces\nquoted: \"Quoted \t\"\nblock:\t|\n  void main() {\n  \tprintf(\"Hello, world!\\n\");\n  }\n",
         "tags" : [
            "spec",
            "upto-1.2",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :quoted\n=VAL \"Quoted \\t\n=VAL :block\n=VAL |void main() {\\n\\tprintf(\"Hello, world!\\\\n\");\\n}\\n\n-MAP\n-DOC\n-STR\n"
      },
      "J5UC" : {
         "id" : "J5UC",
         "in_json" : "{\n  \"foo\": \"blue\",\n  \"bar\": \"arrr\",\n  \"baz\": \"jazz\"\n}\n",
         "in_yaml" : "foo: blue\nbar: arrr\nbaz: jazz\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n=VAL :blue\n=VAL :bar\n=VAL :arrr\n=VAL :baz\n=VAL :jazz\n-MAP\n-DOC\n-STR\n"
      },
      "J7PZ" : {
         "id" : "J7PZ",
         "in_json" : "[\n  {\n    \"Mark McGwire\": 65\n  },\n  {\n    \"Sammy Sosa\": 63\n  },\n  {\n    \"Ken Griffy\": 58\n  }\n]\n",
         "in_yaml" : "# Ordered maps are represented as\n# A sequence of mappings, with\n# each mapping having one key\n--- !!omap\n- Mark McGwire: 65\n- Sammy Sosa: 63\n- Ken Griffy: 58\n",
         "tags" : [
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ <tag:yaml.org,2002:omap>\n+MAP\n=VAL :Mark McGwire\n=VAL :65\n-MAP\n+MAP\n=VAL :Sammy Sosa\n=VAL :63\n-MAP\n+MAP\n=VAL :Ken Griffy\n=VAL :58\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "J7VC" : {
         "id" : "J7VC",
         "in_json" : "{\n  \"1\": 2,\n  \"3\": 4\n}\n",
         "in_yaml" : "1: 2\n\n\n3: 4\n",
         "tags" : [
            "mapping",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :1\n=VAL :2\n=VAL :3\n=VAL :4\n-MAP\n-DOC\n-STR\n"
      },
      "J9HZ" : {
         "id" : "J9HZ",
         "in_json" : "{\n  \"hr\": [\n    \"Mark McGwire\",\n    \"Sammy Sosa\"\n  ],\n  \"rbi\": [\n    \"Sammy Sosa\",\n    \"Ken Griffey\"\n  ]\n}\n",
         "in_yaml" : "---\nhr: # 1998 hr ranking\n  - Mark McGwire\n  - Sammy Sosa\nrbi:\n  # 1998 rbi ranking\n  - Sammy Sosa\n  - Ken Griffey\n",
         "tags" : [
            "comment",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :hr\n+SEQ\n=VAL :Mark McGwire\n=VAL :Sammy Sosa\n-SEQ\n=VAL :rbi\n+SEQ\n=VAL :Sammy Sosa\n=VAL :Ken Griffey\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "JDH8" : {
         "id" : "JDH8",
         "in_json" : "\"k:#foo &a !t s\"\n",
         "in_yaml" : "---\nk:#foo\n &a !t s\n",
         "tags" : [
            "1.3-mod",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :k:#foo &a !t s\n-DOC\n-STR\n"
      },
      "JHB9" : {
         "id" : "JHB9",
         "in_json" : "[\n  \"Mark McGwire\",\n  \"Sammy Sosa\",\n  \"Ken Griffey\"\n]\n[\n  \"Chicago Cubs\",\n  \"St Louis Cardinals\"\n]\n",
         "in_yaml" : "# Ranking of 1998 home runs\n---\n- Mark McGwire\n- Sammy Sosa\n- Ken Griffey\n\n# Team ranking\n---\n- Chicago Cubs\n- St Louis Cardinals\n",
         "tags" : [
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ\n=VAL :Mark McGwire\n=VAL :Sammy Sosa\n=VAL :Ken Griffey\n-SEQ\n-DOC\n+DOC ---\n+SEQ\n=VAL :Chicago Cubs\n=VAL :St Louis Cardinals\n-SEQ\n-DOC\n-STR\n"
      },
      "JQ4R" : {
         "id" : "JQ4R",
         "in_json" : "{\n  \"block sequence\": [\n    \"one\",\n    {\n      \"two\": \"three\"\n    }\n  ]\n}\n",
         "in_yaml" : "block sequence:\n  - one\n  - two : three\n",
         "tags" : [
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :block sequence\n+SEQ\n=VAL :one\n+MAP\n=VAL :two\n=VAL :three\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "JS2J" : {
         "id" : "JS2J",
         "in_json" : "{\n  \"First occurrence\": \"Value\",\n  \"Second occurrence\": \"Value\"\n}\n",
         "in_yaml" : "First occurrence: &anchor Value\nSecond occurrence: *anchor\n",
         "tags" : [
            "alias",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :First occurrence\n=VAL &anchor :Value\n=VAL :Second occurrence\n=ALI *anchor\n-MAP\n-DOC\n-STR\n"
      },
      "JTV5" : {
         "id" : "JTV5",
         "in_json" : "{\n  \"a true\": \"null d\",\n  \"e 42\": null\n}\n",
         "in_yaml" : "? a\n  true\n: null\n  d\n? e\n  42\n",
         "tags" : [
            "mapping",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a true\n=VAL :null d\n=VAL :e 42\n=VAL :\n-MAP\n-DOC\n-STR\n"
      },
      "K4SU" : {
         "id" : "K4SU",
         "in_json" : "[\n  \"foo\",\n  \"bar\",\n  42\n]\n",
         "in_yaml" : "- foo\n- bar\n- 42\n",
         "tags" : [
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :foo\n=VAL :bar\n=VAL :42\n-SEQ\n-DOC\n-STR\n"
      },
      "K527" : {
         "id" : "K527",
         "in_json" : "\"trimmed\\n\\n\\nas space\"\n",
         "in_yaml" : ">-\n  trimmed\n  \n \n\n  as\n  space\n",
         "tags" : [
            "1.3-err",
            "scalar",
            "spec",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n=VAL >trimmed\\n\\n\\nas space\n-DOC\n-STR\n"
      },
      "K54U" : {
         "id" : "K54U",
         "in_json" : "\"scalar\"\n",
         "in_yaml" : "---\tscalar\n",
         "tags" : [
            "header",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :scalar\n-DOC\n-STR\n"
      },
      "K858" : {
         "id" : "K858",
         "in_json" : "{\n  \"strip\": \"\",\n  \"clip\": \"\",\n  \"keep\": \"\\n\"\n}\n",
         "in_yaml" : "strip: >-\n\nclip: >\n\nkeep: |+\n\n",
         "tags" : [
            "folded",
            "literal",
            "spec",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :strip\n=VAL >\n=VAL :clip\n=VAL >\n=VAL :keep\n=VAL |\\n\n-MAP\n-DOC\n-STR\n"
      },
      "KK5P" : {
         "id" : "KK5P",
         "in_json" : null,
         "in_yaml" : "complex1:\n  ? - a\ncomplex2:\n  ? - a\n  : b\ncomplex3:\n  ? - a\n  : >\n    b\ncomplex4:\n  ? >\n    a\n  :\ncomplex5:\n  ? - a\n  : - b\n",
         "tags" : [
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :complex1\n+MAP\n+SEQ\n=VAL :a\n-SEQ\n=VAL :\n-MAP\n=VAL :complex2\n+MAP\n+SEQ\n=VAL :a\n-SEQ\n=VAL :b\n-MAP\n=VAL :complex3\n+MAP\n+SEQ\n=VAL :a\n-SEQ\n=VAL >b\\n\n-MAP\n=VAL :complex4\n+MAP\n=VAL >a\\n\n=VAL :\n-MAP\n=VAL :complex5\n+MAP\n+SEQ\n=VAL :a\n-SEQ\n+SEQ\n=VAL :b\n-SEQ\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "KMK3" : {
         "id" : "KMK3",
         "in_json" : "{\n  \"foo\": {\n    \"bar\": 1\n  },\n  \"baz\": 2\n}\n",
         "in_yaml" : "foo:\n  bar: 1\nbaz: 2\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n+MAP\n=VAL :bar\n=VAL :1\n-MAP\n=VAL :baz\n=VAL :2\n-MAP\n-DOC\n-STR\n"
      },
      "KSS4" : {
         "id" : "KSS4",
         "in_json" : "\"quoted string\"\n\"foo\"\n",
         "in_yaml" : "--- \"quoted\nstring\"\n--- &node foo\n",
         "tags" : [
            "1.3-err",
            "anchor",
            "header",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL \"quoted string\n-DOC\n+DOC ---\n=VAL &node :foo\n-DOC\n-STR\n"
      },
      "KZN9" : {
         "id" : "KZN9",
         "in_json" : null,
         "in_yaml" : "- [ YAML : separate ]\n- [ : empty key entry ]\n- [ {JSON: like}:adjacent ]\n",
         "tags" : [
            "1.3-err",
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+SEQ\n+MAP\n=VAL :YAML\n=VAL :separate\n-MAP\n-SEQ\n+SEQ\n+MAP\n=VAL :\n=VAL :empty key entry\n-MAP\n-SEQ\n+SEQ\n+MAP\n+MAP\n=VAL :JSON\n=VAL :like\n-MAP\n=VAL :adjacent\n-MAP\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "L94M" : {
         "id" : "L94M",
         "in_json" : "{\n  \"a\": 47,\n  \"c\": \"d\"\n}\n",
         "in_yaml" : "? !!str a\n: !!int 47\n? c\n: !!str d\n",
         "tags" : [
            "mapping",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL <tag:yaml.org,2002:str> :a\n=VAL <tag:yaml.org,2002:int> :47\n=VAL :c\n=VAL <tag:yaml.org,2002:str> :d\n-MAP\n-DOC\n-STR\n"
      },
      "L9U5" : {
         "id" : "L9U5",
         "in_json" : "{\n  \"implicit block key\": [\n    {\n      \"implicit flow key\": \"value\"\n    }\n  ]\n}\n",
         "in_yaml" : "implicit block key : [\n  implicit flow key : value,\n ]\n",
         "tags" : [
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :implicit block key\n+SEQ\n+MAP\n=VAL :implicit flow key\n=VAL :value\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "LE5A" : {
         "id" : "LE5A",
         "in_json" : "[\n  \"a\",\n  \"b\",\n  \"c\",\n  \"c\",\n  \"\"\n]\n",
         "in_yaml" : "- !!str \"a\"\n- 'b'\n- &anchor \"c\"\n- *anchor\n- !!str\n",
         "tags" : [
            "alias",
            "flow",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL <tag:yaml.org,2002:str> \"a\n=VAL 'b\n=VAL &anchor \"c\n=ALI *anchor\n=VAL <tag:yaml.org,2002:str> :\n-SEQ\n-DOC\n-STR\n"
      },
      "LP6E" : {
         "id" : "LP6E",
         "in_json" : "[\n  [\n    \"a\",\n    \"b\",\n    \"c\"\n  ],\n  {\n    \"a\": \"b\",\n    \"c\": \"d\",\n    \"e\": \"f\"\n  },\n  []\n]\n",
         "in_yaml" : "- [a, b , c ]\n- { \"a\"  : b\n   , c : 'd' ,\n   e   : \"f\"\n  }\n- [      ]\n",
         "tags" : [
            "flow",
            "scalar",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+SEQ\n=VAL :a\n=VAL :b\n=VAL :c\n-SEQ\n+MAP\n=VAL \"a\n=VAL :b\n=VAL :c\n=VAL 'd\n=VAL :e\n=VAL \"f\n-MAP\n+SEQ\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "LQZ7" : {
         "id" : "LQZ7",
         "in_json" : "{\n  \"implicit block key\": [\n    {\n      \"implicit flow key\": \"value\"\n    }\n  ]\n}\n",
         "in_yaml" : "\"implicit block key\" : [\n  \"implicit flow key\" : value,\n ]\n",
         "tags" : [
            "flow",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL \"implicit block key\n+SEQ\n+MAP\n=VAL \"implicit flow key\n=VAL :value\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "LX3P" : {
         "id" : "LX3P",
         "in_json" : null,
         "in_yaml" : "[flow]: block\n",
         "tags" : [
            "1.3-err",
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n+SEQ\n=VAL :flow\n-SEQ\n=VAL :block\n-MAP\n-DOC\n-STR\n"
      },
      "M29M" : {
         "id" : "M29M",
         "in_json" : "{\n  \"a\": \"ab\\n\\ncd\\nef\\n\"\n}\n",
         "in_yaml" : "a: |\n ab\n \n cd\n ef\n \n\n...\n",
         "tags" : [
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL |ab\\n\\ncd\\nef\\n\n-MAP\n-DOC ...\n-STR\n"
      },
      "M5C3" : {
         "id" : "M5C3",
         "in_json" : "{\n  \"literal\": \"value\\n\",\n  \"folded\": \"value\\n\"\n}\n",
         "in_yaml" : "literal: |2\n  value\nfolded:\n   !foo\n  >1\n value\n",
         "tags" : [
            "1.3-err",
            "folded",
            "literal",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :literal\n=VAL |value\\n\n=VAL :folded\n=VAL <!foo> >value\\n\n-MAP\n-DOC\n-STR\n"
      },
      "M5DY" : {
         "id" : "M5DY",
         "in_json" : null,
         "in_yaml" : "? - Detroit Tigers\n  - Chicago cubs\n:\n  - 2001-07-23\n\n? [ New York Yankees,\n    Atlanta Braves ]\n: [ 2001-07-02, 2001-08-12,\n    2001-08-14 ]\n",
         "tags" : [
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n+SEQ\n=VAL :Detroit Tigers\n=VAL :Chicago cubs\n-SEQ\n+SEQ\n=VAL :2001-07-23\n-SEQ\n+SEQ\n=VAL :New York Yankees\n=VAL :Atlanta Braves\n-SEQ\n+SEQ\n=VAL :2001-07-02\n=VAL :2001-08-12\n=VAL :2001-08-14\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "M7A3" : {
         "id" : "M7A3",
         "in_json" : "\"Bare document\"\n\"%!PS-Adobe-2.0 # Not the first line\\n\"\n",
         "in_yaml" : "Bare\ndocument\n...\n# No document\n...\n|\n%!PS-Adobe-2.0 # Not the first line\n",
         "tags" : [
            "1.3-err",
            "footer",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL :Bare document\n-DOC ...\n+DOC\n=VAL |%!PS-Adobe-2.0 # Not the first line\\n\n-DOC\n-STR\n"
      },
      "M7NX" : {
         "id" : "M7NX",
         "in_json" : "{\n  \"a\": [\n    \"b\",\n    \"c\",\n    {\n      \"d\": [\n        \"e\",\n        \"f\"\n      ]\n    }\n  ]\n}\n",
         "in_yaml" : "---\n{\n a: [\n  b, c, {\n   d: [e, f]\n  }\n ]\n}\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :a\n+SEQ\n=VAL :b\n=VAL :c\n+MAP\n=VAL :d\n+SEQ\n=VAL :e\n=VAL :f\n-SEQ\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "M9B4" : {
         "id" : "M9B4",
         "in_json" : "\"literal\\n\\ttext\\n\"\n",
         "in_yaml" : "|\n literal\n \ttext\n\n\n",
         "tags" : [
            "1.3-err",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n=VAL |literal\\n\\ttext\\n\n-DOC\n-STR\n"
      },
      "MJS9" : {
         "id" : "MJS9",
         "in_json" : "\"foo \\n\\n\\t bar\\n\\nbaz\\n\"\n",
         "in_yaml" : ">\n  foo \n \n  \t bar\n\n  baz\n",
         "tags" : [
            "1.3-err",
            "scalar",
            "spec",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n=VAL >foo \\n\\n\\t bar\\n\\nbaz\\n\n-DOC\n-STR\n"
      },
      "MXS3" : {
         "id" : "MXS3",
         "in_json" : "[\n  {\n    \"a\": \"b\"\n  }\n]\n",
         "in_yaml" : "- {a: b}\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :a\n=VAL :b\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "MYW6" : {
         "id" : "MYW6",
         "in_json" : "\"ab\"\n",
         "in_yaml" : "|-\n ab\n \n \n...\n",
         "tags" : [
            "1.3-err",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n=VAL |ab\n-DOC ...\n-STR\n"
      },
      "MZX3" : {
         "id" : "MZX3",
         "in_json" : "[\n  \"plain\",\n  \"double quoted\",\n  \"single quoted\",\n  \"block\\n\",\n  \"plain again\"\n]\n",
         "in_yaml" : "- plain\n- \"double quoted\"\n- 'single quoted'\n- >\n  block\n- plain again\n",
         "tags" : [
            "scalar",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :plain\n=VAL \"double quoted\n=VAL 'single quoted\n=VAL >block\\n\n=VAL :plain again\n-SEQ\n-DOC\n-STR\n"
      },
      "NAT4" : {
         "id" : "NAT4",
         "in_json" : "{\n  \"a\": \" \",\n  \"b\": \" \",\n  \"c\": \" \",\n  \"d\": \" \",\n  \"e\": \"\\n\",\n  \"f\": \"\\n\",\n  \"g\": \"\\n\\n\",\n  \"h\": \"\\n\\n\"\n}\n",
         "in_yaml" : "---\na: '\n  '\nb: '  \n  '\nc: \"\n  \"\nd: \"  \n  \"\ne: '\n\n  '\nf: \"\n\n  \"\ng: '\n\n\n  '\nh: \"\n\n\n  \"\n",
         "tags" : [
            "double",
            "scalar",
            "single",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :a\n=VAL ' \n=VAL :b\n=VAL ' \n=VAL :c\n=VAL \" \n=VAL :d\n=VAL \" \n=VAL :e\n=VAL '\\n\n=VAL :f\n=VAL \"\\n\n=VAL :g\n=VAL '\\n\\n\n=VAL :h\n=VAL \"\\n\\n\n-MAP\n-DOC\n-STR\n"
      },
      "NHX8" : {
         "id" : "NHX8",
         "in_json" : "{\n  \"\": null\n}\n",
         "in_yaml" : ":\n\n\n\n",
         "tags" : [
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :\n=VAL :\n-MAP\n-DOC\n-STR\n"
      },
      "NP9H" : {
         "id" : "NP9H",
         "in_json" : "\"folded to a space,\\nto a line feed, or \\t \\tnon-content\"\n",
         "in_yaml" : "\"folded \nto a space,\t\n \nto a line feed, or \t\\\n \\ \tnon-content\"\n",
         "tags" : [
            "scalar",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n=VAL \"folded to a space,\\nto a line feed, or \\t \\tnon-content\n-DOC\n-STR\n"
      },
      "P2AD" : {
         "id" : "P2AD",
         "in_json" : "[\n  \"literal\\n\",\n  \" folded\\n\",\n  \"keep\\n\\n\",\n  \" strip\"\n]\n",
         "in_yaml" : "- | # Empty header\u2193\n literal\n- >1 # Indentation indicator\u2193\n  folded\n- |+ # Chomping indicator\u2193\n keep\n\n- >1- # Both indicators\u2193\n  strip\n",
         "tags" : [
            "comment",
            "folded",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL |literal\\n\n=VAL > folded\\n\n=VAL |keep\\n\\n\n=VAL > strip\n-SEQ\n-DOC\n-STR\n"
      },
      "P76L" : {
         "id" : "P76L",
         "in_json" : null,
         "in_yaml" : "%TAG !! tag:example.com,2000:app/\n---\n!!int 1 - 3 # Interval, not integer\n",
         "tags" : [
            "header",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL <tag:example.com,2000:app/int> :1 - 3\n-DOC\n-STR\n"
      },
      "P94K" : {
         "id" : "P94K",
         "in_json" : "{\n  \"key\": \"value\"\n}\n",
         "in_yaml" : "key:    # Comment\n        # lines\n  value\n\n\n",
         "tags" : [
            "comment",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :key\n=VAL :value\n-MAP\n-DOC\n-STR\n"
      },
      "PBJ2" : {
         "id" : "PBJ2",
         "in_json" : "{\n  \"american\": [\n    \"Boston Red Sox\",\n    \"Detroit Tigers\",\n    \"New York Yankees\"\n  ],\n  \"national\": [\n    \"New York Mets\",\n    \"Chicago Cubs\",\n    \"Atlanta Braves\"\n  ]\n}\n",
         "in_yaml" : "american:\n  - Boston Red Sox\n  - Detroit Tigers\n  - New York Yankees\nnational:\n  - New York Mets\n  - Chicago Cubs\n  - Atlanta Braves\n",
         "tags" : [
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :american\n+SEQ\n=VAL :Boston Red Sox\n=VAL :Detroit Tigers\n=VAL :New York Yankees\n-SEQ\n=VAL :national\n+SEQ\n=VAL :New York Mets\n=VAL :Chicago Cubs\n=VAL :Atlanta Braves\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "PRH3" : {
         "id" : "PRH3",
         "in_json" : "\" 1st non-empty\\n2nd non-empty 3rd non-empty \"\n",
         "in_yaml" : "' 1st non-empty\n\n 2nd non-empty \n\t3rd non-empty '\n",
         "tags" : [
            "scalar",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n=VAL ' 1st non-empty\\n2nd non-empty 3rd non-empty \n-DOC\n-STR\n"
      },
      "PUW8" : {
         "id" : "PUW8",
         "in_json" : "{\n  \"a\": \"b\"\n}\nnull\n",
         "in_yaml" : "---\na: b\n---\n",
         "tags" : [
            "header"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :a\n=VAL :b\n-MAP\n-DOC\n+DOC ---\n=VAL :\n-DOC\n-STR\n"
      },
      "PW8X" : {
         "id" : "PW8X",
         "in_json" : "[\n  null,\n  \"a\",\n  {\n    \"\": null,\n    \"b\": null\n  },\n  {\n    \"\": null\n  }\n]\n",
         "in_yaml" : "- &a\n- a\n-\n  &a : a\n  b: &b\n  &c : &a\n-\n  ? &d\n  ? &e\n  : &a\n",
         "tags" : [
            "anchor",
            "empty",
            "missing"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL &a :\n=VAL :a\n+MAP\n=VAL &a :\n=VAL :a\n=VAL :b\n=VAL &b :\n=VAL &c :\n=VAL &a :\n-MAP\n+MAP\n=VAL &d :\n=VAL :\n=VAL &e :\n=VAL &a :\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "Q5MG" : {
         "id" : "Q5MG",
         "in_json" : "{}\n",
         "in_yaml" : "\t{}\n",
         "tags" : [
            "flow",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n-MAP\n-DOC\n-STR\n"
      },
      "Q88A" : {
         "id" : "Q88A",
         "in_json" : "[\n  [\n    \"a\",\n    \"b\"\n  ],\n  {\n    \"a\": \"b\"\n  },\n  \"a\",\n  \"b\",\n  \"c\"\n]\n",
         "in_yaml" : "- [ a, b ]\n- { a: b }\n- \"a\"\n- 'b'\n- c\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+SEQ\n=VAL :a\n=VAL :b\n-SEQ\n+MAP\n=VAL :a\n=VAL :b\n-MAP\n=VAL \"a\n=VAL 'b\n=VAL :c\n-SEQ\n-DOC\n-STR\n"
      },
      "Q8AD" : {
         "id" : "Q8AD",
         "in_json" : "\"folded to a space,\\nto a line feed, or \\t \\tnon-content\"\n",
         "in_yaml" : "---\n\"folded \nto a space,\n \nto a line feed, or \t\\\n \\ \tnon-content\"\n",
         "tags" : [
            "1.3-mod",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL \"folded to a space,\\nto a line feed, or \\t \\tnon-content\n-DOC\n-STR\n"
      },
      "Q9WF" : {
         "id" : "Q9WF",
         "in_json" : null,
         "in_yaml" : "{ first: Sammy, last: Sosa }:\n# Statistics:\n  hr:  # Home runs\n     65\n  avg: # Average\n   0.278\n",
         "tags" : [
            "1.3-err",
            "comment",
            "spec",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n+MAP\n=VAL :first\n=VAL :Sammy\n=VAL :last\n=VAL :Sosa\n-MAP\n+MAP\n=VAL :hr\n=VAL :65\n=VAL :avg\n=VAL :0.278\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "QF4Y" : {
         "id" : "QF4Y",
         "in_json" : "[\n  {\n    \"foo\": \"bar\"\n  }\n]\n",
         "in_yaml" : "[\nfoo: bar\n]\n",
         "tags" : [
            "flow",
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :foo\n=VAL :bar\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "R4YG" : {
         "id" : "R4YG",
         "in_json" : "[\n  \"detected\\n\",\n  \"\\n\\n# detected\\n\",\n  \" explicit\\n\",\n  \"\\t\\ndetected\\n\"\n]\n",
         "in_yaml" : "- |\n detected\n- >\n \n  \n  # detected\n- |1\n  explicit\n- >\n \t\n detected\n",
         "tags" : [
            "folded",
            "libyaml-err",
            "literal",
            "scalar",
            "spec",
            "upto-1.2"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL |detected\\n\n=VAL >\\n\\n# detected\\n\n=VAL | explicit\\n\n=VAL >\\t\\ndetected\\n\n-SEQ\n-DOC\n-STR\n"
      },
      "RLU9" : {
         "id" : "RLU9",
         "in_json" : "{\n  \"foo\": [\n    42\n  ],\n  \"bar\": [\n    44\n  ]\n}\n",
         "in_yaml" : "foo:\n- 42\nbar:\n  - 44\n",
         "tags" : [
            "indent",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n+SEQ\n=VAL :42\n-SEQ\n=VAL :bar\n+SEQ\n=VAL :44\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "RR7F" : {
         "id" : "RR7F",
         "in_json" : "{\n  \"23\": \"d\",\n  \"a\": 4.2\n}\n",
         "in_yaml" : "a: 4.2\n? 23\n: d\n",
         "tags" : [
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL :4.2\n=VAL :23\n=VAL :d\n-MAP\n-DOC\n-STR\n"
      },
      "RTP8" : {
         "id" : "RTP8",
         "in_json" : "\"Document\"\n",
         "in_yaml" : "%YAML 1.2\n---\nDocument\n... # Suffix\n",
         "tags" : [
            "footer",
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :Document\n-DOC ...\n-STR\n"
      },
      "RZP5" : {
         "id" : "RZP5",
         "in_json" : null,
         "in_yaml" : "a: \"double\n  quotes\" # lala\nb: plain\n value  # lala\nc  : #lala\n  d\n? # lala\n - seq1\n: # lala\n - #lala\n  seq2\ne: &node # lala\n - x: y\nblock: > # lala\n  abcde\n",
         "tags" : [
            "1.3-mod",
            "comment"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL \"double quotes\n=VAL :b\n=VAL :plain value\n=VAL :c\n=VAL :d\n+SEQ\n=VAL :seq1\n-SEQ\n+SEQ\n=VAL :seq2\n-SEQ\n=VAL :e\n+SEQ &node\n+MAP\n=VAL :x\n=VAL :y\n-MAP\n-SEQ\n=VAL :block\n=VAL >abcde\\n\n-MAP\n-DOC\n-STR\n"
      },
      "RZT7" : {
         "id" : "RZT7",
         "in_json" : "{\n  \"Time\": \"2001-11-23 15:01:42 -5\",\n  \"User\": \"ed\",\n  \"Warning\": \"This is an error message for the log file\"\n}\n{\n  \"Time\": \"2001-11-23 15:02:31 -5\",\n  \"User\": \"ed\",\n  \"Warning\": \"A slightly different error message.\"\n}\n{\n  \"Date\": \"2001-11-23 15:03:17 -5\",\n  \"User\": \"ed\",\n  \"Fatal\": \"Unknown variable \\\"bar\\\"\",\n  \"Stack\": [\n    {\n      \"file\": \"TopClass.py\",\n      \"line\": 23,\n      \"code\": \"x = MoreObject(\\\"345\\\\n\\\")\\n\"\n    },\n    {\n      \"file\": \"MoreClass.py\",\n      \"line\": 58,\n      \"code\": \"foo = bar\"\n    }\n  ]\n}\n",
         "in_yaml" : "---\nTime: 2001-11-23 15:01:42 -5\nUser: ed\nWarning:\n  This is an error message\n  for the log file\n---\nTime: 2001-11-23 15:02:31 -5\nUser: ed\nWarning:\n  A slightly different error\n  message.\n---\nDate: 2001-11-23 15:03:17 -5\nUser: ed\nFatal:\n  Unknown variable \"bar\"\nStack:\n  - file: TopClass.py\n    line: 23\n    code: |\n      x = MoreObject(\"345\\n\")\n  - file: MoreClass.py\n    line: 58\n    code: |-\n      foo = bar\n",
         "tags" : [
            "header",
            "literal",
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :Time\n=VAL :2001-11-23 15:01:42 -5\n=VAL :User\n=VAL :ed\n=VAL :Warning\n=VAL :This is an error message for the log file\n-MAP\n-DOC\n+DOC ---\n+MAP\n=VAL :Time\n=VAL :2001-11-23 15:02:31 -5\n=VAL :User\n=VAL :ed\n=VAL :Warning\n=VAL :A slightly different error message.\n-MAP\n-DOC\n+DOC ---\n+MAP\n=VAL :Date\n=VAL :2001-11-23 15:03:17 -5\n=VAL :User\n=VAL :ed\n=VAL :Fatal\n=VAL :Unknown variable \"bar\"\n=VAL :Stack\n+SEQ\n+MAP\n=VAL :file\n=VAL :TopClass.py\n=VAL :line\n=VAL :23\n=VAL :code\n=VAL |x = MoreObject(\"345\\\\n\")\\n\n-MAP\n+MAP\n=VAL :file\n=VAL :MoreClass.py\n=VAL :line\n=VAL :58\n=VAL :code\n=VAL |foo = bar\n-MAP\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "S3PD" : {
         "id" : "S3PD",
         "in_json" : "{\n  \"plain key\": \"in-line value\",\n  \"\": null,\n  \"quoted key\": [\n    \"entry\"\n  ]\n}\n",
         "in_yaml" : "plain key: in-line value\n: # Both empty\n\"quoted key\":\n- entry\n",
         "tags" : [
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :plain key\n=VAL :in-line value\n=VAL :\n=VAL :\n=VAL \"quoted key\n+SEQ\n=VAL :entry\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "S4JQ" : {
         "id" : "S4JQ",
         "in_json" : "[\n  \"12\",\n  12,\n  \"12\"\n]\n",
         "in_yaml" : "# Assuming conventional resolution:\n- \"12\"\n- 12\n- ! 12\n",
         "tags" : [
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL \"12\n=VAL :12\n=VAL <!> :12\n-SEQ\n-DOC\n-STR\n"
      },
      "S4T7" : {
         "id" : "S4T7",
         "in_json" : "{\n  \"aaa\": \"bbb\"\n}\n",
         "in_yaml" : "aaa: bbb\n...\n",
         "tags" : [
            "footer",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :aaa\n=VAL :bbb\n-MAP\n-DOC ...\n-STR\n"
      },
      "S98Z" : {
         "id" : "S98Z",
         "in_json" : "{\n  \"empty block scalar\": \"\"\n}\n",
         "in_yaml" : "empty block scalar: >\n \n  \n   \n # comment\n",
         "tags" : [
            "comment",
            "folded",
            "scalar",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :empty block scalar\n=VAL >\n-MAP\n-DOC\n-STR\n"
      },
      "S9E8" : {
         "id" : "S9E8",
         "in_json" : "{\n  \"sequence\": [\n    \"one\",\n    \"two\"\n  ],\n  \"mapping\": {\n    \"sky\": \"blue\",\n    \"sea\": \"green\"\n  }\n}\n",
         "in_yaml" : "sequence:\n- one\n- two\nmapping:\n  ? sky\n  : blue\n  sea : green\n",
         "tags" : [
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :sequence\n+SEQ\n=VAL :one\n=VAL :two\n-SEQ\n=VAL :mapping\n+MAP\n=VAL :sky\n=VAL :blue\n=VAL :sea\n=VAL :green\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "SBG9" : {
         "id" : "SBG9",
         "in_json" : null,
         "in_yaml" : "{a: [b, c], [d, e]: f}\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n+SEQ\n=VAL :b\n=VAL :c\n-SEQ\n+SEQ\n=VAL :d\n=VAL :e\n-SEQ\n=VAL :f\n-MAP\n-DOC\n-STR\n"
      },
      "SKE5" : {
         "id" : "SKE5",
         "in_json" : "{\n  \"seq\": [\n    \"a\",\n    \"b\"\n  ]\n}\n",
         "in_yaml" : "---\nseq:\n &anchor\n- a\n- b\n",
         "tags" : [
            "anchor",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :seq\n+SEQ &anchor\n=VAL :a\n=VAL :b\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "SSW6" : {
         "id" : "SSW6",
         "in_json" : "\"here's to \\\"quotes\\\"\"\n",
         "in_yaml" : "---\n'here''s to \"quotes\"'\n",
         "tags" : [
            "1.3-mod",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL 'here's to \"quotes\"\n-DOC\n-STR\n"
      },
      "SYW4" : {
         "id" : "SYW4",
         "in_json" : "{\n  \"hr\": 65,\n  \"avg\": 0.278,\n  \"rbi\": 147\n}\n",
         "in_yaml" : "hr:  65    # Home runs\navg: 0.278 # Batting average\nrbi: 147   # Runs Batted In\n",
         "tags" : [
            "comment",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :hr\n=VAL :65\n=VAL :avg\n=VAL :0.278\n=VAL :rbi\n=VAL :147\n-MAP\n-DOC\n-STR\n"
      },
      "T26H" : {
         "id" : "T26H",
         "in_json" : "\"\\n\\nliteral\\n \\n\\ntext\\n\"\n",
         "in_yaml" : "--- |\n \n  \n  literal\n   \n  \n  text\n\n # Comment\n",
         "tags" : [
            "1.3-mod",
            "comment",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL |\\n\\nliteral\\n \\n\\ntext\\n\n-DOC\n-STR\n"
      },
      "T4YY" : {
         "id" : "T4YY",
         "in_json" : "\" 1st non-empty\\n2nd non-empty 3rd non-empty \"\n",
         "in_yaml" : "---\n' 1st non-empty\n\n 2nd non-empty \n 3rd non-empty '\n",
         "tags" : [
            "1.3-mod",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL ' 1st non-empty\\n2nd non-empty 3rd non-empty \n-DOC\n-STR\n"
      },
      "T5N4" : {
         "id" : "T5N4",
         "in_json" : "\"literal\\n\\ttext\\n\"\n",
         "in_yaml" : "--- |\n literal\n \ttext\n\n\n",
         "tags" : [
            "1.3-mod",
            "literal",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL |literal\\n\\ttext\\n\n-DOC\n-STR\n"
      },
      "TE2A" : {
         "id" : "TE2A",
         "in_json" : "{\n  \"block mapping\": {\n    \"key\": \"value\"\n  }\n}\n",
         "in_yaml" : "block mapping:\n key: value\n",
         "tags" : [
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :block mapping\n+MAP\n=VAL :key\n=VAL :value\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "TL85" : {
         "id" : "TL85",
         "in_json" : "\" foo\\nbar\\nbaz \"\n",
         "in_yaml" : "\"\n  foo \n \n  \t bar\n\n  baz\n\"\n",
         "tags" : [
            "scalar",
            "spec",
            "upto-1.2",
            "whitespace"
         ],
         "test_event" : "+STR\n+DOC\n=VAL \" foo\\nbar\\nbaz \n-DOC\n-STR\n"
      },
      "TS54" : {
         "id" : "TS54",
         "in_json" : "\"ab cd\\nef\\n\\ngh\\n\"\n",
         "in_yaml" : ">\n ab\n cd\n \n ef\n\n\n gh\n",
         "tags" : [
            "1.3-err",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n=VAL >ab cd\\nef\\n\\ngh\\n\n-DOC\n-STR\n"
      },
      "U3C3" : {
         "id" : "U3C3",
         "in_json" : "\"foo\"\n",
         "in_yaml" : "%TAG !yaml! tag:yaml.org,2002:\n---\n!yaml!str \"foo\"\n",
         "tags" : [
            "header",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL <tag:yaml.org,2002:str> \"foo\n-DOC\n-STR\n"
      },
      "U3XV" : {
         "id" : "U3XV",
         "in_json" : "{\n  \"top1\": {\n    \"key1\": \"one\"\n  },\n  \"top2\": {\n    \"key2\": \"two\"\n  },\n  \"top3\": {\n    \"key3\": \"three\"\n  },\n  \"top4\": {\n    \"key4\": \"four\"\n  },\n  \"top5\": {\n    \"key5\": \"five\"\n  },\n  \"top6\": \"six\",\n  \"top7\": \"seven\"\n}\n",
         "in_yaml" : "---\ntop1: &node1\n  &k1 key1: one\ntop2: &node2 # comment\n  key2: two\ntop3:\n  &k3 key3: three\ntop4:\n  &node4\n  &k4 key4: four\ntop5:\n  &node5\n  key5: five\ntop6: &val6\n  six\ntop7:\n  &val7 seven\n",
         "tags" : [
            "1.3-err",
            "anchor",
            "comment"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :top1\n+MAP &node1\n=VAL &k1 :key1\n=VAL :one\n-MAP\n=VAL :top2\n+MAP &node2\n=VAL :key2\n=VAL :two\n-MAP\n=VAL :top3\n+MAP\n=VAL &k3 :key3\n=VAL :three\n-MAP\n=VAL :top4\n+MAP &node4\n=VAL &k4 :key4\n=VAL :four\n-MAP\n=VAL :top5\n+MAP &node5\n=VAL :key5\n=VAL :five\n-MAP\n=VAL :top6\n=VAL &val6 :six\n=VAL :top7\n=VAL &val7 :seven\n-MAP\n-DOC\n-STR\n"
      },
      "U9NS" : {
         "id" : "U9NS",
         "in_json" : "{\n  \"time\": \"20:03:20\",\n  \"player\": \"Sammy Sosa\",\n  \"action\": \"strike (miss)\"\n}\n{\n  \"time\": \"20:03:47\",\n  \"player\": \"Sammy Sosa\",\n  \"action\": \"grand slam\"\n}\n",
         "in_yaml" : "---\ntime: 20:03:20\nplayer: Sammy Sosa\naction: strike (miss)\n...\n---\ntime: 20:03:47\nplayer: Sammy Sosa\naction: grand slam\n...\n",
         "tags" : [
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :time\n=VAL :20:03:20\n=VAL :player\n=VAL :Sammy Sosa\n=VAL :action\n=VAL :strike (miss)\n-MAP\n-DOC ...\n+DOC ---\n+MAP\n=VAL :time\n=VAL :20:03:47\n=VAL :player\n=VAL :Sammy Sosa\n=VAL :action\n=VAL :grand slam\n-MAP\n-DOC ...\n-STR\n"
      },
      "UDM2" : {
         "id" : "UDM2",
         "in_json" : "[\n  {\n    \"url\": \"http://example.org\"\n  }\n]\n",
         "in_yaml" : "- { url: http://example.org }\n",
         "tags" : [
            "flow",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :url\n=VAL :http://example.org\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "UDR7" : {
         "id" : "UDR7",
         "in_json" : "{\n  \"sequence\": [\n    \"one\",\n    \"two\"\n  ],\n  \"mapping\": {\n    \"sky\": \"blue\",\n    \"sea\": \"green\"\n  }\n}\n",
         "in_yaml" : "sequence: [ one, two, ]\nmapping: { sky: blue, sea: green }\n",
         "tags" : [
            "flow",
            "mapping",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :sequence\n+SEQ\n=VAL :one\n=VAL :two\n-SEQ\n=VAL :mapping\n+MAP\n=VAL :sky\n=VAL :blue\n=VAL :sea\n=VAL :green\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "UGM3" : {
         "id" : "UGM3",
         "in_json" : "{\n  \"invoice\": 34843,\n  \"date\": \"2001-01-23\",\n  \"bill-to\": {\n    \"given\": \"Chris\",\n    \"family\": \"Dumars\",\n    \"address\": {\n      \"lines\": \"458 Walkman Dr.\\nSuite #292\\n\",\n      \"city\": \"Royal Oak\",\n      \"state\": \"MI\",\n      \"postal\": 48046\n    }\n  },\n  \"ship-to\": {\n    \"given\": \"Chris\",\n    \"family\": \"Dumars\",\n    \"address\": {\n      \"lines\": \"458 Walkman Dr.\\nSuite #292\\n\",\n      \"city\": \"Royal Oak\",\n      \"state\": \"MI\",\n      \"postal\": 48046\n    }\n  },\n  \"product\": [\n    {\n      \"sku\": \"BL394D\",\n      \"quantity\": 4,\n      \"description\": \"Basketball\",\n      \"price\": 450\n    },\n    {\n      \"sku\": \"BL4438H\",\n      \"quantity\": 1,\n      \"description\": \"Super Hoop\",\n      \"price\": 2392\n    }\n  ],\n  \"tax\": 251.42,\n  \"total\": 4443.52,\n  \"comments\": \"Late afternoon is best. Backup contact is Nancy Billsmer @ 338-4338.\"\n}\n",
         "in_yaml" : "--- !<tag:clarkevans.com,2002:invoice>\ninvoice: 34843\ndate   : 2001-01-23\nbill-to: &id001\n    given  : Chris\n    family : Dumars\n    address:\n        lines: |\n            458 Walkman Dr.\n            Suite #292\n        city    : Royal Oak\n        state   : MI\n        postal  : 48046\nship-to: *id001\nproduct:\n    - sku         : BL394D\n      quantity    : 4\n      description : Basketball\n      price       : 450.00\n    - sku         : BL4438H\n      quantity    : 1\n      description : Super Hoop\n      price       : 2392.00\ntax  : 251.42\ntotal: 4443.52\ncomments:\n    Late afternoon is best.\n    Backup contact is Nancy\n    Billsmer @ 338-4338.\n",
         "tags" : [
            "alias",
            "literal",
            "mapping",
            "sequence",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP <tag:clarkevans.com,2002:invoice>\n=VAL :invoice\n=VAL :34843\n=VAL :date\n=VAL :2001-01-23\n=VAL :bill-to\n+MAP &id001\n=VAL :given\n=VAL :Chris\n=VAL :family\n=VAL :Dumars\n=VAL :address\n+MAP\n=VAL :lines\n=VAL |458 Walkman Dr.\\nSuite #292\\n\n=VAL :city\n=VAL :Royal Oak\n=VAL :state\n=VAL :MI\n=VAL :postal\n=VAL :48046\n-MAP\n-MAP\n=VAL :ship-to\n=ALI *id001\n=VAL :product\n+SEQ\n+MAP\n=VAL :sku\n=VAL :BL394D\n=VAL :quantity\n=VAL :4\n=VAL :description\n=VAL :Basketball\n=VAL :price\n=VAL :450.00\n-MAP\n+MAP\n=VAL :sku\n=VAL :BL4438H\n=VAL :quantity\n=VAL :1\n=VAL :description\n=VAL :Super Hoop\n=VAL :price\n=VAL :2392.00\n-MAP\n-SEQ\n=VAL :tax\n=VAL :251.42\n=VAL :total\n=VAL :4443.52\n=VAL :comments\n=VAL :Late afternoon is best. Backup contact is Nancy Billsmer @ 338-4338.\n-MAP\n-DOC\n-STR\n"
      },
      "UT92" : {
         "id" : "UT92",
         "in_json" : "{\n  \"matches %\": 20\n}\nnull\n",
         "in_yaml" : "---\n{ matches\n% : 20 }\n...\n---\n# Empty\n...\n",
         "tags" : [
            "comment",
            "footer",
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :matches %\n=VAL :20\n-MAP\n-DOC ...\n+DOC ---\n=VAL :\n-DOC ...\n-STR\n"
      },
      "V55R" : {
         "id" : "V55R",
         "in_json" : "[\n  \"a\",\n  \"b\",\n  \"a\",\n  \"b\"\n]\n",
         "in_yaml" : "- &a a\n- &b b\n- *a\n- *b\n",
         "tags" : [
            "alias",
            "sequence"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL &a :a\n=VAL &b :b\n=ALI *a\n=ALI *b\n-SEQ\n-DOC\n-STR\n"
      },
      "V9D5" : {
         "id" : "V9D5",
         "in_json" : null,
         "in_yaml" : "- sun: yellow\n- ? earth: blue\n  : moon: white\n",
         "tags" : [
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+MAP\n=VAL :sun\n=VAL :yellow\n-MAP\n+MAP\n+MAP\n=VAL :earth\n=VAL :blue\n-MAP\n+MAP\n=VAL :moon\n=VAL :white\n-MAP\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "W42U" : {
         "id" : "W42U",
         "in_json" : "[\n  null,\n  \"block node\\n\",\n  [\n    \"one\",\n    \"two\"\n  ],\n  {\n    \"one\": \"two\"\n  }\n]\n",
         "in_yaml" : "- # Empty\n- |\n block node\n- - one # Compact\n  - two # sequence\n- one: two # Compact mapping\n",
         "tags" : [
            "literal",
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n=VAL :\n=VAL |block node\\n\n+SEQ\n=VAL :one\n=VAL :two\n-SEQ\n+MAP\n=VAL :one\n=VAL :two\n-MAP\n-SEQ\n-DOC\n-STR\n"
      },
      "W4TN" : {
         "id" : "W4TN",
         "in_json" : "\"%!PS-Adobe-2.0\\n\"\nnull\n",
         "in_yaml" : "%YAML 1.2\n--- |\n%!PS-Adobe-2.0\n...\n%YAML 1.2\n---\n# Empty\n...\n",
         "tags" : [
            "1.3-err",
            "footer",
            "header",
            "spec"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL |%!PS-Adobe-2.0\\n\n-DOC ...\n+DOC ---\n=VAL :\n-DOC ...\n-STR\n"
      },
      "W5VH" : {
         "id" : "W5VH",
         "in_json" : "{\n  \"a\": \"scalar a\",\n  \"b\": \"scalar a\"\n}\n",
         "in_yaml" : "a: &:@*!$\"<foo>: scalar a\nb: *:@*!$\"<foo>:\n",
         "tags" : [
            "1.3-err",
            "alias"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL &:@*!$\"<foo>: :scalar a\n=VAL :b\n=ALI *:@*!$\"<foo>:\n-MAP\n-DOC\n-STR\n"
      },
      "WZ62" : {
         "id" : "WZ62",
         "in_json" : "{\n  \"foo\": \"\",\n  \"\": \"bar\"\n}\n",
         "in_yaml" : "{\n  foo : !!str,\n  !!str : bar,\n}\n",
         "tags" : [
            "flow",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :foo\n=VAL <tag:yaml.org,2002:str> :\n=VAL <tag:yaml.org,2002:str> :\n=VAL :bar\n-MAP\n-DOC\n-STR\n"
      },
      "X38W" : {
         "id" : "X38W",
         "in_json" : null,
         "in_yaml" : "{ &a [a, &b b]: *b, *a : [c, *b, d]}\n",
         "tags" : [
            "alias",
            "flow"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n+SEQ &a\n=VAL :a\n=VAL &b :b\n-SEQ\n=ALI *b\n=ALI *a\n+SEQ\n=VAL :c\n=ALI *b\n=VAL :d\n-SEQ\n-MAP\n-DOC\n-STR\n"
      },
      "XLQ9" : {
         "id" : "XLQ9",
         "in_json" : "\"scalar %YAML 1.2\"\n",
         "in_yaml" : "---\nscalar\n%YAML 1.2\n",
         "tags" : [
            "directive",
            "scalar"
         ],
         "test_event" : "+STR\n+DOC ---\n=VAL :scalar %YAML 1.2\n-DOC\n-STR\n"
      },
      "XV9V" : {
         "id" : "XV9V",
         "in_json" : "{\n  \"Folding\": \"Empty line\\nas a line feed\",\n  \"Chomping\": \"Clipped empty lines\\n\"\n}\n",
         "in_yaml" : "Folding:\n  \"Empty line\n\n  as a line feed\"\nChomping: |\n  Clipped empty lines\n \n\n",
         "tags" : [
            "1.3-mod",
            "scalar",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :Folding\n=VAL \"Empty line\\nas a line feed\n=VAL :Chomping\n=VAL |Clipped empty lines\\n\n-MAP\n-DOC\n-STR\n"
      },
      "XW4D" : {
         "id" : "XW4D",
         "in_json" : null,
         "in_yaml" : "a: \"double\n  quotes\" # lala\nb: plain\n value  # lala\nc  : #lala\n  d\n? # lala\n - seq1\n: # lala\n - #lala\n  seq2\ne:\n &node # lala\n - x: y\nblock: > # lala\n  abcde\n",
         "tags" : [
            "1.3-err",
            "comment"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :a\n=VAL \"double quotes\n=VAL :b\n=VAL :plain value\n=VAL :c\n=VAL :d\n+SEQ\n=VAL :seq1\n-SEQ\n+SEQ\n=VAL :seq2\n-SEQ\n=VAL :e\n+SEQ &node\n+MAP\n=VAL :x\n=VAL :y\n-MAP\n-SEQ\n=VAL :block\n=VAL >abcde\\n\n-MAP\n-DOC\n-STR\n"
      },
      "Y2GN" : {
         "id" : "Y2GN",
         "in_json" : "{\n  \"key\": \"value\"\n}\n",
         "in_yaml" : "---\nkey: &an:chor value\n",
         "tags" : [
            "anchor"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :key\n=VAL &an:chor :value\n-MAP\n-DOC\n-STR\n"
      },
      "YD5X" : {
         "id" : "YD5X",
         "in_json" : "[\n  [\n    \"name\",\n    \"hr\",\n    \"avg\"\n  ],\n  [\n    \"Mark McGwire\",\n    65,\n    0.278\n  ],\n  [\n    \"Sammy Sosa\",\n    63,\n    0.288\n  ]\n]\n",
         "in_yaml" : "- [name        , hr, avg  ]\n- [Mark McGwire, 65, 0.278]\n- [Sammy Sosa  , 63, 0.288]\n",
         "tags" : [
            "sequence",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+SEQ\n+SEQ\n=VAL :name\n=VAL :hr\n=VAL :avg\n-SEQ\n+SEQ\n=VAL :Mark McGwire\n=VAL :65\n=VAL :0.278\n-SEQ\n+SEQ\n=VAL :Sammy Sosa\n=VAL :63\n=VAL :0.288\n-SEQ\n-SEQ\n-DOC\n-STR\n"
      },
      "Z67P" : {
         "id" : "Z67P",
         "in_json" : "{\n  \"literal\": \"value\\n\",\n  \"folded\": \"value\\n\"\n}\n",
         "in_yaml" : "literal: |2\n  value\nfolded: !foo >1\n value\n",
         "tags" : [
            "1.3-mod",
            "folded",
            "literal",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :literal\n=VAL |value\\n\n=VAL :folded\n=VAL <!foo> >value\\n\n-MAP\n-DOC\n-STR\n"
      },
      "Z9M4" : {
         "id" : "Z9M4",
         "in_json" : null,
         "in_yaml" : "%TAG !e! tag:example.com,2000:app/\n---\n- !e!foo \"bar\"\n",
         "tags" : [
            "header",
            "spec",
            "tag"
         ],
         "test_event" : "+STR\n+DOC ---\n+SEQ\n=VAL <tag:example.com,2000:app/foo> \"bar\n-SEQ\n-DOC\n-STR\n"
      },
      "ZF4X" : {
         "id" : "ZF4X",
         "in_json" : "{\n  \"Mark McGwire\": {\n    \"hr\": 65,\n    \"avg\": 0.278\n  },\n  \"Sammy Sosa\": {\n    \"hr\": 63,\n    \"avg\": 0.288\n  }\n}\n",
         "in_yaml" : "Mark McGwire: {hr: 65, avg: 0.278}\nSammy Sosa: {\n    hr: 63,\n    avg: 0.288\n  }\n",
         "tags" : [
            "mapping",
            "spec"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL :Mark McGwire\n+MAP\n=VAL :hr\n=VAL :65\n=VAL :avg\n=VAL :0.278\n-MAP\n=VAL :Sammy Sosa\n+MAP\n=VAL :hr\n=VAL :63\n=VAL :avg\n=VAL :0.288\n-MAP\n-MAP\n-DOC\n-STR\n"
      },
      "ZH7C" : {
         "id" : "ZH7C",
         "in_json" : "{\n  \"a\": \"b\",\n  \"c\": \"d\"\n}\n",
         "in_yaml" : "&a a: b\nc: &d d\n",
         "tags" : [
            "jayt"
         ],
         "test_event" : "+STR\n+DOC\n+MAP\n=VAL &a :a\n=VAL :b\n=VAL :c\n=VAL &d :d\n-MAP\n-DOC\n-STR\n"
      },
      "ZWK4" : {
         "id" : "ZWK4",
         "in_json" : "{\n  \"a\": 1,\n  \"b\": null,\n  \"c\": 3\n}\n",
         "in_yaml" : "---\na: 1\n? b\n&anchor c: 3\n",
         "tags" : [
            "anchor",
            "mapping"
         ],
         "test_event" : "+STR\n+DOC ---\n+MAP\n=VAL :a\n=VAL :1\n=VAL :b\n=VAL :\n=VAL &anchor :c\n=VAL :3\n-MAP\n-DOC\n-STR\n"
      }
   }
}
;
var alltests = data.tests;
var tags = data.tags;
var tags_search = {};
var testcount = Object.keys(alltests).length;
