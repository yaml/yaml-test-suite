#!/usr/bin/env perl

use v5.10;
use strict;

use IO::All;

for my $file (io('test')->all_files) {
    say $file->name;

    my $text = $file->all;
    $file->close;

    $text =~ s/^from: /--- from: /m;
    $text =~ s/^tags: /--- tags: /m;

    while ($text =~ s/^\+\+\+ ([-\w]+)\n(.*?)(?=\+\+\+|\z)/!!!\n/ms) {
        my ($point, $data) = ($1, $2);
        if ($data =~ /^(---|\\)/m) {
            $data =~ s/^\\//mg;
            $data =~ s/^(.)/    $1/mg;
            $point .= '(<)';
        }
        $text =~ s/^!!!\n/--- $point\n$data/m;
    }

    die if $text =~ /\+\+\+/;

    $file->print($text);
}
