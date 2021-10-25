#!/bin/bash

# the first parameter should be the master branch name
# the first parameter should be the feature branch name

# this check is checking the head main branch commit is contained 
# in feature branch 
# if no contain, exit with 1 code

git add .
git commit -m "1"
git push origin main
