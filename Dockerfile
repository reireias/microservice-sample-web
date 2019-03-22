FROM node:11.10-alpine as builder

ENV NODE_ENV=production
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
WORKDIR /app

RUN apk add --no-cache curl && \
    curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh

COPY package.json .
COPY yarn.lock .
RUN yarn install && ./bin/node-prune
COPY . .
RUN yarn build

FROM node:11.10-alpine

WORKDIR /app
ADD package.json ./
ADD nuxt.config.js ./

COPY --from=builder ./app/server ./server
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/.nuxt ./.nuxt

EXPOSE 3000
CMD yarn start
