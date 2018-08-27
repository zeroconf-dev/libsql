FROM node:10.9.0-alpine as builder
WORKDIR /service/
RUN apk add --no-cache findutils gcc g++ libpq make postgresql-dev python

COPY package.json package-lock.json /service/
RUN npm install

FROM node:10.9.0-alpine
WORKDIR /service/

COPY package.json tsconfig.json tsconfig.build.json /service/
COPY --from=builder /service/node_modules /service/node_modules
COPY src /service/src

ENTRYPOINT npm run build
