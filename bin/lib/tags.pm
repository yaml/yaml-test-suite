package tags;
use strict;
use warnings;
use autodie qw/ open close opendir closedir /;

use base 'Exporter';

our @EXPORT_OK = qw/
    tml_files
    get_tags
    get_index
/;

sub tml_files {
    my ($dir) = @_;
    opendir (my $dh, $dir);
    my @files = map { "$dir/$_" } grep /\.tml$/, readdir $dh;
    closedir $dh;
    return @files;
}

sub get_tags {
    my ($file) = @_;
    open my $fh, '<', $file;
    my @tags;
    while (<$fh>) {
        if (m/^===/ ... /^\+\+\+/) {
            if (m/^tags: (.*)/) {
                @tags = split ' ', $1;
                last;
            }
        }
    }
    return @tags;
}

sub get_index {
    my ($index) = @_;
    open my $fh, '<', $index;
    my @tags;
    while (<$fh>) {
        if (my $x = m/^----/ ... eof) {
            next unless m/^(\w\S+)/;
            my $tag = $1;
            push @tags, $tag if $x > 1;
        }
    }
    my %tags;
    @tags{ @tags } = ();
    return %tags;
}

1;
