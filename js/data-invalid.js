var data = {
   "tags" : {
      "1.3-err" : 1,
      "1.3-mod" : 1,
      "alias" : 1,
      "anchor" : 1,
      "comment" : 1,
      "complex-key" : 1,
      "directive" : 1,
      "document" : 1,
      "double" : 1,
      "duplicate-key" : 1,
      "edge" : 1,
      "empty" : 1,
      "empty-key" : 1,
      "error" : 1,
      "explicit-key" : 1,
      "flow" : 1,
      "folded" : 1,
      "footer" : 1,
      "header" : 1,
      "indent" : 1,
      "jayt" : 1,
      "libyaml-err" : 1,
      "literal" : 1,
      "local-tag" : 1,
      "mapping" : 1,
      "scalar" : 1,
      "sequence" : 1,
      "simple" : 1,
      "single" : 1,
      "spec" : 1,
      "tag" : 1,
      "unknown-tag" : 1,
      "upto-1.2" : 1,
      "whitespace" : 1
   },
   "tests" : {
      "236B" : {
         "id" : "236B",
         "in_yaml" : "foo:\n  bar\ninvalid\n",
         "tags" : [
            "error",
            "mapping"
         ]
      },
      "2CMS" : {
         "id" : "2CMS",
         "in_yaml" : "this\n is\n  invalid: x\n",
         "tags" : [
            "error",
            "mapping"
         ]
      },
      "3HFZ" : {
         "id" : "3HFZ",
         "in_yaml" : "---\nkey: value\n... invalid\n",
         "tags" : [
            "error",
            "footer"
         ]
      },
      "4EJS" : {
         "id" : "4EJS",
         "in_yaml" : "---\na:\n\tb:\n\t\tc: value\n",
         "tags" : [
            "error",
            "mapping",
            "whitespace"
         ]
      },
      "4H7K" : {
         "id" : "4H7K",
         "in_yaml" : "---\n[ a, b, c ] ]\n",
         "tags" : [
            "error",
            "flow",
            "sequence"
         ]
      },
      "4HVU" : {
         "id" : "4HVU",
         "in_yaml" : "key:\n   - ok\n   - also ok\n  - wrong\n",
         "tags" : [
            "error",
            "indent",
            "sequence"
         ]
      },
      "4JVG" : {
         "id" : "4JVG",
         "in_yaml" : "top1: &node1\n  &k1 key1: val1\ntop2: &node2\n  &v2 val2\n",
         "tags" : [
            "anchor",
            "error",
            "mapping"
         ]
      },
      "55WF" : {
         "id" : "55WF",
         "in_yaml" : "---\n\"\\.\"\n",
         "tags" : [
            "double",
            "error"
         ]
      },
      "5LLU" : {
         "id" : "5LLU",
         "in_yaml" : "block scalar: >\n \n  \n   \n invalid\n",
         "tags" : [
            "error",
            "folded",
            "whitespace"
         ]
      },
      "5TRB" : {
         "id" : "5TRB",
         "in_yaml" : "---\n\"\n---\n\"\n",
         "tags" : [
            "double",
            "error",
            "header"
         ]
      },
      "5U3A" : {
         "id" : "5U3A",
         "in_yaml" : "key: - a\n     - b\n",
         "tags" : [
            "error",
            "mapping",
            "sequence"
         ]
      },
      "62EZ" : {
         "id" : "62EZ",
         "in_yaml" : "---\nx: { y: z }in: valid\n",
         "tags" : [
            "error",
            "flow",
            "mapping"
         ]
      },
      "6JTT" : {
         "id" : "6JTT",
         "in_yaml" : "---\n[ [ a, b, c ]\n",
         "tags" : [
            "error",
            "flow",
            "sequence"
         ]
      },
      "6S55" : {
         "id" : "6S55",
         "in_yaml" : "key:\n - bar\n - baz\n invalid\n",
         "tags" : [
            "error",
            "mapping",
            "sequence"
         ]
      },
      "7LBH" : {
         "id" : "7LBH",
         "in_yaml" : "\"a\\nb\": 1\n\"c\n d\": 1\n",
         "tags" : [
            "double",
            "error"
         ]
      },
      "7MNF" : {
         "id" : "7MNF",
         "in_yaml" : "top1:\n  key1: val1\ntop2\n",
         "tags" : [
            "error",
            "mapping"
         ]
      },
      "8XDJ" : {
         "id" : "8XDJ",
         "in_yaml" : "key: word1\n#  xxx\n  word2\n",
         "tags" : [
            "comment",
            "error",
            "scalar"
         ]
      },
      "9C9N" : {
         "id" : "9C9N",
         "in_yaml" : "---\nflow: [a,\nb,\nc]\n",
         "tags" : [
            "error",
            "flow",
            "indent",
            "sequence"
         ]
      },
      "9CWY" : {
         "id" : "9CWY",
         "in_yaml" : "key:\n - item1\n - item2\ninvalid\n",
         "tags" : [
            "error",
            "mapping",
            "sequence"
         ]
      },
      "9HCY" : {
         "id" : "9HCY",
         "in_yaml" : "!foo \"bar\"\n%TAG ! tag:example.com,2000:app/\n---\n!foo \"bar\"\n",
         "tags" : [
            "directive",
            "error",
            "footer",
            "tag",
            "unknown-tag"
         ]
      },
      "9JBA" : {
         "id" : "9JBA",
         "in_yaml" : "---\n[ a, b, c, ]#invalid\n",
         "tags" : [
            "comment",
            "error",
            "flow",
            "sequence"
         ]
      },
      "9KBC" : {
         "id" : "9KBC",
         "in_yaml" : "--- key1: value1\n    key2: value2\n",
         "tags" : [
            "error",
            "header",
            "mapping"
         ]
      },
      "9MAG" : {
         "id" : "9MAG",
         "in_yaml" : "---\n[ , a, b, c ]\n",
         "tags" : [
            "error",
            "flow",
            "sequence"
         ]
      },
      "9MMA" : {
         "id" : "9MMA",
         "in_yaml" : "%YAML 1.2\n",
         "tags" : [
            "directive",
            "error"
         ]
      },
      "B63P" : {
         "id" : "B63P",
         "in_yaml" : "%YAML 1.2\n...\n",
         "tags" : [
            "directive",
            "document",
            "error"
         ]
      },
      "BD7L" : {
         "id" : "BD7L",
         "in_yaml" : "- item1\n- item2\ninvalid: x\n",
         "tags" : [
            "error",
            "mapping",
            "sequence"
         ]
      },
      "BF9H" : {
         "id" : "BF9H",
         "in_yaml" : "---\nplain: a\n       b # end of scalar\n       c\n",
         "tags" : [
            "comment",
            "error",
            "scalar"
         ]
      },
      "BS4K" : {
         "id" : "BS4K",
         "in_yaml" : "word1  # comment\nword2\n",
         "tags" : [
            "error",
            "scalar"
         ]
      },
      "C2SP" : {
         "id" : "C2SP",
         "in_yaml" : "[23\n]: 42\n",
         "tags" : [
            "error",
            "flow",
            "mapping"
         ]
      },
      "CML9" : {
         "id" : "CML9",
         "in_yaml" : "key: [ word1\n#  xxx\n  word2 ]\n",
         "tags" : [
            "comment",
            "error",
            "flow"
         ]
      },
      "CQ3W" : {
         "id" : "CQ3W",
         "in_yaml" : "---\nkey: \"missing closing quote\n",
         "tags" : [
            "double",
            "error"
         ]
      },
      "CTN5" : {
         "id" : "CTN5",
         "in_yaml" : "---\n[ a, b, c, , ]\n",
         "tags" : [
            "error",
            "flow",
            "sequence"
         ]
      },
      "CVW2" : {
         "id" : "CVW2",
         "in_yaml" : "---\n[ a, b, c,#invalid\n]\n",
         "tags" : [
            "comment",
            "error",
            "flow",
            "sequence"
         ]
      },
      "CXX2" : {
         "id" : "CXX2",
         "in_yaml" : "--- &anchor a: b\n",
         "tags" : [
            "anchor",
            "error",
            "header",
            "mapping"
         ]
      },
      "D49Q" : {
         "id" : "D49Q",
         "in_yaml" : "'a\\nb': 1\n'c\n d': 1\n",
         "tags" : [
            "error",
            "mapping",
            "single"
         ]
      },
      "DK4H" : {
         "id" : "DK4H",
         "in_yaml" : "---\n[ key\n  : value ]\n",
         "tags" : [
            "error",
            "flow",
            "mapping",
            "sequence"
         ]
      },
      "DMG6" : {
         "id" : "DMG6",
         "in_yaml" : "key:\n  ok: 1\n wrong: 2\n",
         "tags" : [
            "error",
            "indent",
            "mapping"
         ]
      },
      "EB22" : {
         "id" : "EB22",
         "in_yaml" : "---\nscalar1 # comment\n%YAML 1.2\n---\nscalar2\n",
         "tags" : [
            "directive",
            "error",
            "footer"
         ]
      },
      "EW3V" : {
         "id" : "EW3V",
         "in_yaml" : "k1: v1\n k2: v2\n",
         "tags" : [
            "error",
            "indent",
            "mapping"
         ]
      },
      "G7JE" : {
         "id" : "G7JE",
         "in_yaml" : "a\\nb: 1\nc\n d: 1\n",
         "tags" : [
            "error",
            "mapping"
         ]
      },
      "G9HC" : {
         "id" : "G9HC",
         "in_yaml" : "---\nseq:\n&anchor\n- a\n- b\n",
         "tags" : [
            "anchor",
            "error",
            "sequence"
         ]
      },
      "GDY7" : {
         "id" : "GDY7",
         "in_yaml" : "key: value\nthis is #not a: key\n",
         "tags" : [
            "comment",
            "error",
            "mapping"
         ]
      },
      "GT5M" : {
         "id" : "GT5M",
         "in_yaml" : "- item1\n&node\n- item2\n",
         "tags" : [
            "anchor",
            "error",
            "sequence"
         ]
      },
      "H7J7" : {
         "id" : "H7J7",
         "in_yaml" : "key: &x\n!!map\n  a: b\n",
         "tags" : [
            "anchor",
            "error",
            "indent",
            "tag"
         ]
      },
      "HRE5" : {
         "id" : "HRE5",
         "in_yaml" : "---\ndouble: \"quoted \\' scalar\"\n",
         "tags" : [
            "double",
            "error",
            "single"
         ]
      },
      "HU3P" : {
         "id" : "HU3P",
         "in_yaml" : "key:\n  word1 word2\n  no: key\n",
         "tags" : [
            "error",
            "mapping",
            "scalar"
         ]
      },
      "JY7Z" : {
         "id" : "JY7Z",
         "in_yaml" : "key1: \"quoted1\"\nkey2: \"quoted2\" no key: nor value\nkey3: \"quoted3\"\n",
         "tags" : [
            "double",
            "error",
            "mapping"
         ]
      },
      "KS4U" : {
         "id" : "KS4U",
         "in_yaml" : "---\n[\nsequence item\n]\ninvalid item\n",
         "tags" : [
            "error",
            "flow",
            "sequence"
         ]
      },
      "LHL4" : {
         "id" : "LHL4",
         "in_yaml" : "---\n!invalid{}tag scalar\n",
         "tags" : [
            "error",
            "tag"
         ]
      },
      "N4JP" : {
         "id" : "N4JP",
         "in_yaml" : "map:\n  key1: \"quoted1\"\n key2: \"bad indentation\"\n",
         "tags" : [
            "double",
            "error",
            "indent",
            "mapping"
         ]
      },
      "N782" : {
         "id" : "N782",
         "in_yaml" : "[\n--- ,\n...\n]\n",
         "tags" : [
            "edge",
            "error",
            "flow",
            "footer",
            "header"
         ]
      },
      "P2EQ" : {
         "id" : "P2EQ",
         "in_yaml" : "---\n- { y: z }- invalid\n",
         "tags" : [
            "error",
            "flow",
            "mapping",
            "sequence"
         ]
      },
      "Q4CL" : {
         "id" : "Q4CL",
         "in_yaml" : "key1: \"quoted1\"\nkey2: \"quoted2\" trailing content\nkey3: \"quoted3\"\n",
         "tags" : [
            "double",
            "error",
            "mapping"
         ]
      },
      "QB6E" : {
         "id" : "QB6E",
         "in_yaml" : "---\nquoted: \"a\nb\nc\"\n",
         "tags" : [
            "double",
            "error",
            "indent"
         ]
      },
      "QLJ7" : {
         "id" : "QLJ7",
         "in_yaml" : "%TAG !prefix! tag:example.com,2011:\n--- !prefix!A\na: b\n--- !prefix!B\nc: d\n--- !prefix!C\ne: f\n",
         "tags" : [
            "directive",
            "error",
            "tag"
         ]
      },
      "RHX7" : {
         "id" : "RHX7",
         "in_yaml" : "---\nkey: value\n%YAML 1.2\n---\n",
         "tags" : [
            "directive",
            "error"
         ]
      },
      "RXY3" : {
         "id" : "RXY3",
         "in_yaml" : "---\n'\n...\n'\n",
         "tags" : [
            "error",
            "footer",
            "single"
         ]
      },
      "S4GJ" : {
         "id" : "S4GJ",
         "in_yaml" : "---\nfolded: > first line\n  second line\n",
         "tags" : [
            "error",
            "folded"
         ]
      },
      "S98Z" : {
         "id" : "S98Z",
         "in_yaml" : "empty block scalar: >\n \n  \n   \n # comment\n",
         "tags" : [
            "comment",
            "error",
            "folded",
            "scalar",
            "whitespace"
         ]
      },
      "SF5V" : {
         "id" : "SF5V",
         "in_yaml" : "%YAML 1.2\n%YAML 1.2\n---\n",
         "tags" : [
            "directive",
            "error"
         ]
      },
      "SR86" : {
         "id" : "SR86",
         "in_yaml" : "key1: &a value\nkey2: &b *a\n",
         "tags" : [
            "alias",
            "error"
         ]
      },
      "SU5Z" : {
         "id" : "SU5Z",
         "in_yaml" : "key: \"value\"# invalid comment\n",
         "tags" : [
            "comment",
            "double",
            "error",
            "whitespace"
         ]
      },
      "SU74" : {
         "id" : "SU74",
         "in_yaml" : "key1: &alias value1\n&b *alias : value2\n",
         "tags" : [
            "alias",
            "anchor",
            "error",
            "mapping"
         ]
      },
      "SY6V" : {
         "id" : "SY6V",
         "in_yaml" : "&anchor - sequence entry\n",
         "tags" : [
            "anchor",
            "error",
            "sequence"
         ]
      },
      "T833" : {
         "id" : "T833",
         "in_yaml" : "---\n{\n foo: 1\n bar: 2 }\n",
         "tags" : [
            "error",
            "flow",
            "mapping"
         ]
      },
      "TD5N" : {
         "id" : "TD5N",
         "in_yaml" : "- item1\n- item2\ninvalid\n",
         "tags" : [
            "error",
            "scalar",
            "sequence"
         ]
      },
      "U44R" : {
         "id" : "U44R",
         "in_yaml" : "map:\n  key1: \"quoted1\"\n   key2: \"bad indentation\"\n",
         "tags" : [
            "double",
            "error",
            "indent",
            "mapping"
         ]
      },
      "U99R" : {
         "id" : "U99R",
         "in_yaml" : "- !!str, xxx\n",
         "tags" : [
            "error",
            "tag"
         ]
      },
      "W9L4" : {
         "id" : "W9L4",
         "in_yaml" : "---\nblock scalar: |\n     \n  more spaces at the beginning\n  are invalid\n",
         "tags" : [
            "error",
            "literal",
            "whitespace"
         ]
      },
      "X4QW" : {
         "id" : "X4QW",
         "in_yaml" : "block: ># comment\n  scalar\n",
         "tags" : [
            "comment",
            "error",
            "folded",
            "whitespace"
         ]
      },
      "ZCZ6" : {
         "id" : "ZCZ6",
         "in_yaml" : "a: b: c: d\n",
         "tags" : [
            "error",
            "mapping",
            "scalar"
         ]
      },
      "ZL4Z" : {
         "id" : "ZL4Z",
         "in_yaml" : "---\na: 'b': c\n",
         "tags" : [
            "error",
            "mapping"
         ]
      },
      "ZVH3" : {
         "id" : "ZVH3",
         "in_yaml" : "- key: value\n - item1\n",
         "tags" : [
            "error",
            "indent",
            "sequence"
         ]
      },
      "ZXT5" : {
         "id" : "ZXT5",
         "in_yaml" : "[ \"key\"\n  :value ]\n",
         "tags" : [
            "error",
            "flow",
            "mapping",
            "sequence"
         ]
      }
   }
}
;
var alltests = data.tests;
var tags = data.tags;
var tags_search = {};
var testcount = Object.keys(alltests).length;
