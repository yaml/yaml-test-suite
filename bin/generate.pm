package generate;

use Carp 'croak';
use File::Path qw'mkpath rmtree';
use XXX;

sub all {
  my @tml = glob 'test/*.tml';
  for my $tml (@tml) {
    process($tml);
  }
  print "Done\n";
}

sub process {
  my ($tml) = @_;
  my $self = bless { tml => $tml };
  $self->{cog_id} = $tml;
  $self->{cog_id} =~ s/.*\/(.*)\.tml$/$1/;
  my $text = $self->{text} = $self->_read($tml);
  $self->parse_meta($text);
  $$text =~ s/^#.*\n//gm;
  while (length $$text) {
    $self->process_file;
  }
}

my $re_comment = qr/#.*/;
my $re_blank = qr/\s*/;
my $re_label = qr/===\s+(.*)/;
my $re_meta = qr/(\w+):\ +(.*?)/;
my $re_file = qr/\+\+\+\ +(\w.*)/;
sub parse_meta {
  my ($self) = @_;
  my $text = $self->{text};
  my $meta = $self->{meta} = {};
  $$text =~ s/\A$re_label\n// or $self->parse_error;
  $meta->{label} = $1;
  $meta->{label} =~ s/^\s*(.*?)\s*$/$1/;
  while ($$text !~ /\A$re_file\n/) {
    if ($$text =~ s/\A$re_meta\n//) {
      $meta->{$1} = $2;
    }
    elsif ($$text =~ s/\A(?:$re_comment|$re_blank)\n//) {
      next;
    }
    else {
      $self->parse_error;
    }
  }
  return;
}

sub process_file {
  my ($self) = @_;

  my $id = $self->{cog_id};
  my $text = $self->{text};

  $$text =~ s/\A$re_file\n//
    or $self->parse_error;
  my $file = $1;
  $file =~ s/-/./g;

  $$text =~ s/\A(.*?)(?=^$re_file|\z)//sm
    or $self->parse_error;
  my $output = $1;
  $output =~ s/(\r?\n)\s*\z//;
  if (length $output) {
    $output .= $1;
  }
  $output =~ s/^# .*//gm;
  $output =~ s/^%\w.*//gm;
  $output =~ s/^[\ \t]*$//gm;
  $output =~ s/<SPC>/ /g;
  $output =~ s/<TAB>/\t/g;
  $output =~ s/^\\//gm;
  if ($file eq 'test.event') {
    if ($output !~ /\A\+STR\n/) {
      if ($output !~ /\A\+DOC/) {
        $output = "+DOC\n$output-DOC\n";
      }
      $output = "+STR\n$output-STR\n";
    }
  }

  my $label = $self->{meta}{label};
  my $tags = [split /\s+/, $self->{meta}{tags}];

  do {local $|=1; print "$id\r"};

  main::process(
    $id,
    $label,
    $file,
    $output,
    $tags,
  );
}

sub parse_error {
  my ($self) = @_;
  my $text = $self->{text};
  (my $context = $$text) =~ s/\n.*//s;
  croak "Can't parse at '$context'";
}

sub _read {
  my ($self, $file) = @_;
  local $/;
  open my $in, '<', $file
    or die "Can't open '$file' for input";
  \ <$in>;
}

sub _write {
  my ($self, $file, $text) = @_;
  if ($file =~ m!(.*)/!) {
    mkpath "$1";
  }
  open my $out, '>', $file
    or die "Can't open '$file' for output";
  print $out $text;
}

sub _link {
  my ($self, $link, $target) = @_;
  if ($link =~ m!(.*)/!) {
    mkpath "$1";
  }
  symlink $target, $link;
}

1;
