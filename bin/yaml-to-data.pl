#!/usr/bin/env perl

use v5.18;
use utf8;
use autodie qw(open close);
use Encode;
use YAML::PP;
$| = 1;

my %map = (
  'name' => '===',
  'fail' => 'error',
  'yaml' => 'in.yaml',
  'tree' => 'test.event',
  'json' => 'in.json',
  'norm' => 'out.yaml',
  'emit' => 'emit.yaml',
  'toke' => 'lex.token',
);

mkdir my $o = 'data';

my $ypp = YAML::PP->new;
my $i = 0;
for my $file (@ARGV) {
  (my $id = $file) =~ s{^.*/(.*)\.yaml$}{$1};

  mkdir my $d = "$o/$id";

  my $data;
  eval {
    $data = $ypp->load_file($file);
  };
  if ($@) {
    warn "Error '$id':\n$@";
  }

  next if $data->[0]{skip};

  for my $k (keys %map) {
    if (defined (my $v = $data->[0]{$k})) {
      if ($k eq 'name') {
        $v .= "\n";
      } elsif ($k eq 'fail') {
        $v = '';
      } elsif ($k eq 'tree') {
        $v =~ s/^\ +//mg;
        $v =~ s/\n*\z/\n/;
      }

      $v =~ s/␣/ /g;
      $v =~ s/—*»/\t/g;
      $v =~ s/↓/\r/g unless $file =~ /P2AD/;
      $v =~ s/⇔/x{FEFF}/g;
      $v =~ s/↵//g;
      $v =~ s/∎\n\z//;

      open my $out, '>', "$d/$map{$k}";
      print $out encode_utf8 $v;
      close $out;
    }
  }

  $i++;
}

printf "\nProcessed %d tests.\n\n", $i;
