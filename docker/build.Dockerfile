FROM node:10.9.0-alpine
WORKDIR /service/

COPY package.json package-lock.json /service/
RUN npm install

COPY tsconfig.json tsconfig.build.json /service/
COPY src /service/src

ENTRYPOINT [ "npm" ]

CMD [ "run", "build" ]
