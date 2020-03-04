# project_name

> My stylish Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# copy project config
$ cp configs/env-example.js configs/env.js

# edit config and replace all variables like {{.Env.BASE_API_URL}} with values for staging server that are available in configs/env.js
$ nano configs/env.js

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
