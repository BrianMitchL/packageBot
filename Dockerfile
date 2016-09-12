FROM node:6
MAINTAINER Brian Mitchell <bman4789@gmail.com>

RUN mkdir -p /src
WORKDIR /src

ONBUILD COPY package.json /src
ONBUILD RUN npm install
ONBUILD COPY . /src

CMD [ "npm", "start" ]