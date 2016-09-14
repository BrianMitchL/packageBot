FROM node:6
MAINTAINER Brian Mitchell <bman4789@gmail.com>

RUN mkdir -p /src
WORKDIR /src

COPY . /src
RUN npm install

CMD [ "npm", "start" ]