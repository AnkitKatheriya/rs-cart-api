FROM node:18.15.0-alpine3.17 as build

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./app/

COPY . ./app/

RUN cd ./app; npm Install; npm run build;

FROM node:18.15.0-alpine3.17 as run

ENV NODE_ENV production

USER node

EXPOSE 8080

ENTRYPOINT ["node", "/app/dist/main"]
