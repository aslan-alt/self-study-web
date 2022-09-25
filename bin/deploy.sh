#!/usr/bin/env sh

git pull &&
#yarn build
#yarn typeorm:build
#yarn migration:run
docker login -u 874470891 -p 874470891xS! &&
docker pull 874470891/self-study-web &&
docker kill app &&
docker rm app &&
docker run --privileged=true -v "$PWD/videos":/usr/src/app/videos -v "$PWD/.next":/usr/src/app/.next --name app --network=host -p 3000:3000 -d 874470891/self-study-web &&
echo 'OK'