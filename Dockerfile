FROM node:6
MAINTAINER Brian Mitchell <bman4789@gmail.com>

RUN mkdir -p /src
WORKDIR /src

COPY package.json /src
RUN npm install

COPY . /src

CMD [ "npm", "start" ]
