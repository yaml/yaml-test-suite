#!/usr/bin/env perl

use v5.18;
use FindBin;
use lib $FindBin::Bin;
use base 'YAMLTestSuite';
use Encode;

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

main->new->run([@ARGV]);

sub make {
  my ($self) = @_;

  my ($id, $ID, $num, $data, $cache) =
    @$self{qw<id ID num data cache>};

  my $dir = "data/$id";
  mkdir $dir unless -d $dir;

  if ($num) {
    $dir .= "/$num";
    mkdir $dir or die $dir;
  }

  for my $k (sort keys %map) {
    if (exists $data->{$k} and not defined $data->{$k}) {
      delete $cache->{$k};
      next;
    }
    $_ = $data->{$k} // $cache->{$k};
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

      $_ = $self->unescape($_);

      open my $out, '>', "$dir/$map{$k}" or die;
      print $out encode_utf8($_);
      close $out;
    }
  }
}

sub final {
  my ($self) = @_;
  warn "Wrote $self->{make} data tests.\n";
}
