FROM node:current-alpine

RUN npm install -g yarn --force

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn install

RUN mkdir ckweb
COPY ckweb/package.json /app/ckweb
COPY ckweb/yarn.lock /app/ckweb
RUN cd ckweb && yarn install

COPY . /app
RUN yarn build-web

CMD yarn start