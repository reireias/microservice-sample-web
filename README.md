![test](https://github.com/reireias/microservice-sample-web/workflows/test/badge.svg)
# Microservice Sample Web Service
Web service for microservice sample application.

## Setup
You can install dependencies with `yarn`.

```sh
yarn install
```

## Run dev server
Set environments for development server.

If you don't know how to get Github Client ID, see [this page](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).

``` sh
export USER_SERVICE=http://localhost:3001
export TWEET_SERVICE=http://localhost:3002
export GITHUB_CLIENT_ID=xxxxxxxxxxx
export GITHUB_CLIENT_SECRET=xxxxxxxxxxx
```

Run dev server.

```sh
yarn dev
```

## Lint files
Run lint with Eslint.

```sh
yarn lint
```

## Run test
Run test with ava.

```sh
yarn test
```
