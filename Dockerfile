FROM node:14.4.0-alpine3.11
WORKDIR /home/server
RUN apk add python python2-dev make g++
COPY package*.json /home/server
RUN yarn \
    && yarn global add nodemon
COPY . /home/server
CMD ["nodemon", "src/index.ts"]