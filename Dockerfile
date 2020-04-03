FROM node:13.0.1-alpine
WORKDIR /home/os-one
COPY . /home/os-one
RUN yarn \
    && yarn global add nodemon
ENV DB_HOST=${DB_HOST} \
    PORT=${PORT}
CMD ["nodemon", "src/index.js"]