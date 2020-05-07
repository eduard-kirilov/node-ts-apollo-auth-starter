FROM node:14.1.0-alpine3.11
WORKDIR /home/os-one
COPY . /home/os-one
RUN yarn && yarn global add nodemon
ENV DB_HOST=${DB_HOST} \
    PORT=${PORT}
CMD ["nodemon", "src/index.js"]