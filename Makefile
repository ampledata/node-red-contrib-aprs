# Makefile for node-red-contrib-aprs
#
# Source:: https://github.com/ampledata/node-red-contrib-aprs
# Author:: Greg Albrecht <oss@undef.net>
# Copyright:: Copyright Greg Albrecht
# License:: Apache License, Version 2.0
#

.DEFAULT_GOAL := all


all: install

install:
	npm install -g .

publish:
	npm publish

lint: jshint eslint jslint

jshint:
	jshint *.js

eslint:
	eslint *.js

jslint:
	jslint *.js

pretty:
	npx prettier --write .

mkdocs:
	pip install -r docs/requirements.txt
	mkdocs serve