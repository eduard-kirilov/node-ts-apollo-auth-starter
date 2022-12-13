/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
import mongoose from 'mongoose';
// import chalk from 'chalk';

const { DB_HOST = '' } = process.env;

export const mongooseMiddleware = ():void => {
  mongoose.connect(DB_HOST);
  mongoose.connection.on('connected', () => {
    console.log(`✓ MongoDB successfully connected.`);
  });
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log(`✓ MongoDB connection error. Please make sure MongoDB is running.`);
    process.exit();
  });
};
