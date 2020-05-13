FROM node:13-alpine

RUN npm install -g yarn

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn install

COPY ckweb/package.json /app
COPY ckweb/yarn.lock /app
RUN cd ckweb && yarn install

COPY . /app
RUN yarn build-web

CMD yarn start