#!/usr/bin/env perl

use v5.18;
use utf8;
use IO::All;
use YAML::PP;
use YAML::PP::Common qw/ PRESERVE_ORDER /;

my $ypp = YAML::PP->new(
  boolean => 'boolean',
  preserve => PRESERVE_ORDER,
);
my $i = 0;

for my $file (io('src')->all_files) {
  my $yaml = $file->utf8->all;

  my $data = $ypp->load_string($yaml);

  for my $sect (qw<yaml tree emit norm>) {
    $data->[0]{$sect} =~ s/<S(?:PC)?>/␣/g;

    while ($data->[0]{$sect} =~ /<T(?:AB)?>/) {
      $data->[0]{$sect} =~ s{
        ^(.*?)<T(?:AB)?>
      }{
        my $s = 4;
        if (my $i = length($1) % $s) {
          $s -= $i;
        }
        $1 . ('—' x ($s - 1)) . '»';
      }mex;
    }

    $_ = $data->[0]{yaml};

    s/<B(?:OM)?>/⇔/g;
    s/<C(?:R)?>/↓/g;
    $_ .= "∎\n" unless /\n\z/;
    s/\n(\n+)\z/"\n" . ("↵\n" x length($1))/e;

    $data->[0]{yaml} = $_;
  }

  $yaml = $ypp->dump_string($data);

  io("$file")->utf8->print($yaml);

  $i++;
}


printf "\nProcessed %d tests.\n\n", $i;
