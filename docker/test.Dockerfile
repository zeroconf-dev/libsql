FROM node:24.15.0-alpine3.23 as builder
WORKDIR /service/
RUN apk add --no-cache findutils gcc g++ libpq make postgresql-dev python3

COPY package.json package-lock.json /service/
RUN npm install

FROM node:24.15.0-alpine3.23
WORKDIR /service/
RUN apk add --no-cache git libpq

COPY --from=builder /service/node_modules /service/node_modules
COPY package.json .prettierrc.json /service/

ENV DATABASE_RUNNING=true

CMD [ "npm", "test" ]
