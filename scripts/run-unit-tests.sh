#!/bin/bash

BASE_DIR=`dirname $0`

karma start $BASE_DIR/../config/karma-unit.conf.js $*
