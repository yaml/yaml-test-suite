package YAMLTestSuite;
use strict; use warnings;

use utf8;
use autodie qw(open close);
use Encode;
use MIME::Base64;
use YAML::PP;

my $ypp = YAML::PP->new;

sub new {
    my $class = shift;
    my $self = bless {
        data => undef,
        id => undef,
        num => undef,
        ID => undef,
        file => 0,
        skip => 0,
        make => 0,
    }, $class;
    return $self;
}

sub initial {}
sub done {}
sub final {}
sub skip {1}

sub run {
    my ($self, $files) = @_;

    $self->initial;

    for my $file (@$files) {
        $self->{file}++;

        ($self->{id} = $file) =~ s{^.*/(.*)\.yaml$}{$1};

        my $data = $ypp->load_file($file);

        if ($data->[0]{skip}) {
            if ($self->skip) {
                $self->{skip}++;
                next;
            }
        }

        my $l = (@$data > 1)
            ? int(log(@$data - 1) / log(10)) + 2
            : 2;
        $self->{cache} = {};
        delete $self->{num};
        my $i = 0;
        my $name = '';
        for my $test (@$data) {
            $name = $self->{name} = $test->{name} || $name;
            $self->{data} = $test;
            $self->{ID} = $self->{num}
                ? "$self->{id}-$self->{num}"
                : $self->{id};
            $self->make;
            $self->{make}++;
            $self->{num} = sprintf "%0${l}d", ++$i;
        }
        $self->done;
    }

    $self->final;
}

sub unescape {
    my ($self, $text) = @_;

    $text =~ s/␣/ /g;
    $text =~ s/—*»/\t/g;
    $text =~ s/←/\r/g;
    $text =~ s/⇔/x{FEFF}/g;
    $text =~ s/↵//g;
    $text =~ s/∎\n\z//;

    return $text;
}

sub play_url {
    my ($self, $text) = @_;

    $text = encode_utf8 $self->unescape($text);

    my $base64 = encode_base64($text);
    $base64 =~ s{\n}{}g;
    $base64 =~ s{\+}{-}g;
    $base64 =~ s{/}{_}g;

    return "https://play.yaml.io/main/parser?input=$base64";
}

1;
