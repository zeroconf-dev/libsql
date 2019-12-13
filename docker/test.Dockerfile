FROM node:10.17.0-alpine as builder
WORKDIR /service/
RUN apk add --no-cache findutils gcc g++ libpq make postgresql-dev python

COPY package.json package-lock.json /service/
RUN npm install

FROM node:10.17.0-alpine
WORKDIR /service/
RUN apk add --no-cache git libpq

COPY --from=builder /service/node_modules /service/node_modules
COPY package.json .prettierrc.js /service/

ENTRYPOINT [ "npm", "test" ]
