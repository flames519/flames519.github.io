#!/bin/bash

branch="vue"
txt=""
if test $# -eq 1 
then
   txt=$1
elif test $# -eq 2 
then
   branch=$1
   txt=$2
else
    echo "需要两个参数"
    exit 1
fi
echo $branch
echo $txt


# 合并vue 分支
git checkout $branch books

gitbook build && rm -rf docs  && cp -r ./_book ./docs
# git
git add .
git commit -am $txt
git push