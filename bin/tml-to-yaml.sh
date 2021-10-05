#!/usr/bin/env bash

set -e -u -o pipefail

rm -fr src
mkdir src

export PATH=$(cd ../yaml-reference-parser/perl/bin && pwd):$PATH

for path; do
  file=$(basename "$path")

  ytid=${file%.tml}

  printf "\r%s" "$ytid"

  cat "$path" |

  node -e '
    require("ingy-prelude");
    require("testml-compiler/lib/testml-compiler/compiler");
    compiler = new TestMLCompiler.Compiler;
    tml = file_read("-");
    json = compiler.compile(tml);
    say(json);
  ' |

  jq '
    .data[0] |
    [
      {
        name:  .label,
        from:  .point.from,
        tags:  .point.tags,
        note:  .point.note,
        fail:  .point.error,
        yaml:  .point."in-yaml",
        tree:  .point."test-event",
        json:  .point."in-json",
        norm:  .point."out-yaml",
        emit:  .point."emit-yaml",
        toke:  .point."lex-token",
        end:   true,
      }
    ]
  ' |

  grep -Ev ': null,?$' |

  jq 'del(.[0].end)' |

  perl -e '
    use v5.18;
    use YAML::PP;
    use YAML::PP::Common qw/ PRESERVE_ORDER /;
    use Encode;
    my $events = shift(@ARGV);
    my $ypp = YAML::PP->new( preserve => PRESERVE_ORDER );
    my $json = decode_utf8 do {local $/; <>};
    my $data = $ypp->load_string($json);
    my $t = $data->[0];

    if ($_ = $t->{tree}) {
      s/\n*\z/\n/;
      my $i = 0;
      s{^([-+=])}{
        $i-- if $1 eq "-";
        $a = (" " x $i) . $1;
        $i++ if $1 eq "+";
        $a;
      }gem;
      $t->{tree} = $_;
    }

    my $out = $ypp->dump_string($data);
    $out =~ s/^  fail: ..$/  fail: true/m;
    encode_utf8 $out;
    print $out;
  ' |

  cat > "src/$ytid.yaml"
done

printf "\r%s\n" Done!
