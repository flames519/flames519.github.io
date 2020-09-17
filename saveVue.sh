
if test $# -ne 1
then 
echo "参数错误"
exit 0
fi

git add .
git commit -am $1
git push

git checkout master