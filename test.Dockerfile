FROM node:10.9.0-alpine
WORKDIR /service/

COPY package.json package-lock.json /service/
RUN npm install

COPY tsconfig.json /service/
COPY src /service/src
# RUN npm run build

COPY jest.config.js /service/
CMD "npm" "test"
