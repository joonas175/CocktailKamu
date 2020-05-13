FROM node:13-alpine

WORKDIR /app
COPY . /app

RUN npm install -g yarn
RUN yarn install && yarn build-web

CMD yarn start