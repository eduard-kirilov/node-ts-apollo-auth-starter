/**
* Node, Mongo, GraphQL - Starter Kit
* https://github.com/eduard-kirilov/Online-store-5-api-products
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/

const mongoose = require('mongoose');
const chalk = require('chalk');

const { DB_HOST } = process.env;

exports.setUpConnection = () => {
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
