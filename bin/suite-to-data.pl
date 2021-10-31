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
  'dump' => 'out.yaml',
  'emit' => 'emit.yaml',
  'toke' => 'lex.token',
);

main(@ARGV);

sub main {
  mkdir 'data';

  my $ypp = YAML::PP->new;

  my ($files, $skipped, $created) = (0, 0, 0);

  for my $file (@_) {
    $files++;
    my $data = $ypp->load_file($file);
    (my $id = $file) =~ s{^.*/(.*)\.yaml$}{$1};
    my $dir = "data/$id";
    my $cache = {};
    my $first = shift @$data or die;
    if ($first->{skip}) {
      print "Skipping '$id'...";
      $skipped++;
      next;
    }

    create($dir, $first, $cache);
    $created++;

    @$data or next;

    my $l = int(log(@$data) / log(10));
    my $i = 1;
    for my $next (@$data) {
      my $num = sprintf "%0$l", $i++;
      create("$dir/$num", $next, $cache);
      $created++;
    }
  }

  print "\n";
  printf "Processed %d files.\n", $files;
  printf "Skipped %d files.\n", $skipped;
  printf "Created %d test data directories.\n", $created;
  print "\n";
}

sub create {
  my ($dir, $data, $cache) = @_;
  mkdir $dir or die;

  for my $k (sort keys %map) {
    if (exists $data->{$k} and not defined $data->{$k}) {
      delete $cache->{$k};
      next;
    }
    $_ = $data->{$k} || $cache->{$k};
    if (defined $_) {
      $cache->{$k} = $_;
      if ($k eq 'name') {
        $_ .= "\n";
      }
      elsif ($k eq 'fail') {
        $_ = '';
      }
      elsif ($k eq 'tree') {
        s/^\s+//mg;
        s/\n*\z/\n/;
      }

      s/␣/ /g;
      s/—*»/\t/g;
      s/←/\r/g;
      s/⇔/x{FEFF}/g;
      s/↵//g;
      s/∎\n\z//;

      open my $out, '>', "$dir/$map{$k}" or die;
      print $out encode_utf8 $_;
      close $out;
    }
  }
}
