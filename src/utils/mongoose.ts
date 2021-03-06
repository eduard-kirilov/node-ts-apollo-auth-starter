/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
import mongoose from 'mongoose';
import chalk from 'chalk';

const { DB_HOST = '' } = process.env;

export const mongooseMiddleware = ():void => {
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(DB_HOST);
  mongoose.connection.on('connected', () => {
    console.log(`${chalk.green('✓')} MongoDB successfully connected.`);
  });
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log(`${chalk.red('✗')} MongoDB connection error. Please make sure MongoDB is running.`);
    process.exit();
  });
};
