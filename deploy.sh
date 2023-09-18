#!/usr/bin/env sh

set -env

npm run build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:samaev/vue2-username-phone.git master:gh-pages

cd -