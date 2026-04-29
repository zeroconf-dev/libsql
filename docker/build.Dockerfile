FROM node:24.15.0-alpine3.23 AS builder
WORKDIR /service/
RUN apk add --no-cache findutils gcc g++ libpq make postgresql-dev python3

COPY package.json package-lock.json /service/
RUN npm install

FROM node:24.15.0-alpine3.23
WORKDIR /service/

COPY package.json tsconfig.json tsconfig.build.json /service/
COPY --from=builder /service/node_modules /service/node_modules
COPY src /service/src

CMD [ "npm", "run", "build" ]
