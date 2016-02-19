default: help

help:
	@echo 'update - Update all test files from spec files'
	@echo 'help   - Show help'

update:
	perl bin/update

update: doc

doc: ReadMe.pod

ReadMe.pod: doc/yaml-dev-kit.swim
	swim --to=pod --complete < $< > $@
