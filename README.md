## Overview
This website mainly provides free learning courses

### SetUp for local development

#### start the psql container
```
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

// create database
docker exec -it containerId bash
psql -U blog
create database test;

// build typeorm file
pnpm typeorm:build
// run migration (create table in psql)
pnpm typeorm migration:run
```
#### start the nextJs server
```
pnpm dev
```

### How to Build nextJs container

```
docker build -t 874470891/self-study-web .
docker run --privileged=true -v "$PWD/videos":/usr/src/app/videos -v "$PWD/.next":/usr/src/app/.next --name app --network=host -p 3000:3000 -d 874470891/self-study-web
```