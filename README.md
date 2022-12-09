## 介绍
一个免费开源的学习平台



```
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
typeorm migration:create ./db/migration/CreateVideo
yarn typeorm:build
yarn typeorm migration:run
```