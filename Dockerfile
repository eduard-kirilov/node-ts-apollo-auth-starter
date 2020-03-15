FROM node:13.0.1-alpine
WORKDIR /home/os-one
COPY . /home/os-one
RUN yarn \
    && yarn global add nodemon
ENV DB_HOST=mongodb+srv://admin:C3l03cja12cn5@os-mtwj9.gcp.mongodb.net/os-two?retryWrites=true&w=majority \
    PORT=3001
CMD ["nodemon", "src/index.js"]