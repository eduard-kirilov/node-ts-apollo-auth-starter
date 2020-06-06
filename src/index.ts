/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
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
import expressStatusMonitor from 'express-status-monitor';
import { makeExecutableSchema } from 'graphql-tools';

// import GraphQL.
import  { resolvers } from './resolvers';
import  { typeDefs } from './shema';

// import Middleware.
import { mongooseMiddleware } from './utils/mongoose';
import { ssessionMiddleware } from './utils/session';
import { passportMiddleware } from './utils/passport';

// import process.env.
const {
  NODE_ENV = '',
  PORT = '',
  HOST = '',
  ORIGIN_HOST,
} = process.env;


// Initialization of express application
export const app = express();

// Connect to DB MongoDB.
mongooseMiddleware();

// Express configuration.
app.set('host', HOST);
app.set('port', PORT);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ssessionMiddleware);
app.use(passportMiddleware.initialize());
app.use(passportMiddleware.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

// Error Handler.
if (NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}

// Using graphql middleware
const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [typeDefs],
      resolvers: resolvers,
    }),
    introspection: true,
    playground: true,
    context: ({ req }) => ({ req }),
  });

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: ORIGIN_HOST,
  },
});

app.listen(PORT, () => {
    console.log(`Node env on ${NODE_ENV}`);
    console.log(`${chalk.green('✓')} Server running on ${HOST}:${PORT}  `);
    console.log(`${chalk.green('✓')} GraphQL running on ${HOST}:${PORT}/graphql  `);
})
