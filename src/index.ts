/**
* Node, Mongo, GraphQL - Starter Kit
* https://github.com/eduard-kirilov/Online-store-5-api-products
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import logger from 'morgan';
import chalk from 'chalk';
import errorHandler from 'errorhandler';
import lusca from 'lusca';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import expressStatusMonitor from 'express-status-monitor';
import { makeExecutableSchema } from 'graphql-tools';

// GraphQL.
import  { resolvers } from './graphql/resolvers';
import  { typeDefs } from './graphql/typeDefs';

// Data base.
import { setUpConnection } from './utils/db';

// Init DB sesion
const MS = MongoStore(session);
// API keys and Passport configuration.
// const passportConfig = require('./utils/passport');

const {
  NODE_ENV = '',
  PORT = '',
  HOST = '',
  SESSION_SECRET = '',
  DB_HOST = '',
} = process.env;

// Initialization of express application
export const app = express();

// Connect to DB MongoDB.
setUpConnection();

// Express configuration.
app.set('host', HOST);
app.set('port', PORT);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MS({
    url: DB_HOST,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

// Error Handler.
if (NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next): void => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

// Using graphql middleware
const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [typeDefs],
      resolvers: resolvers,
    }),
    playground: true
  });

server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`${chalk.green('✓')} 🚀 Server running on http://localhost:${PORT}  `);
    console.log(`${chalk.green('✓')} 🚀 GraphQL running on http://localhost:${PORT}/graphql  `);
})
