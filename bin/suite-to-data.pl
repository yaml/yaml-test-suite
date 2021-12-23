#!/usr/bin/env perl

#------------------------------------------------------------------------------
#
# This program turn all the tests under the src/ directory into test data files
# under the `data` directory.
#
#------------------------------------------------------------------------------

use strict; use warnings;
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

    my ($id, $ID, $num, $data, $multi) =
        @$self{qw<id ID num data multi>};

    my $dir = "data/$id";
    mkdir $dir unless -d $dir;

    if ($multi) {
        $dir .= "/$num";
        mkdir $dir or die $dir;
    }

    for my $k (sort keys %map) {
        $_ = $data->{$k};
        if (defined $_) {
            if ($k eq 'name') {
                $_ .= "\n";
            }
            elsif ($k eq 'fail') {
                next unless $_;
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
