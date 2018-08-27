FROM node:10.9.0-alpine
WORKDIR /service/

COPY package.json package-lock.json /service/
RUN npm install

RUN apk add --no-cache git

# COPY tsconfig.json /service/
# COPY src /service/src
# RUN npm run build
# COPY jest.config.js /service/

ENTRYPOINT [ "npm", "test" ]
