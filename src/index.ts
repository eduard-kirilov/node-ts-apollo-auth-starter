/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
import express from 'express';
import http from 'http';
import expressStatusMonitor from 'express-status-monitor';
import logger from 'morgan';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';


// import GraphQL.
import  { resolvers } from './resolvers';
import  { typeDefs } from './shema';

// import Middleware.
import { mongooseMiddleware } from './utils/mongoose';
import { sessionMiddleware } from './utils/session';
import { passportMiddleware } from './utils/passport';

// import process.env.
const {
  ORIGIN_HOST = '',
  NODE_ENV = '',
  PORT = '',
  HOST = '',
} = process.env;


// Initialization of express application
const app = express();

// Connect to DB MongoDB.
mongooseMiddleware();

// Express configuration.
app.set('host', HOST);
app.set('port', PORT);
app.use(expressStatusMonitor());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passportMiddleware.initialize());
app.use(passportMiddleware.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

/* 
 * Our httpServer handles incoming requests to our Express app.
 * Below, we tell Apollo Server to "drain" this httpServer,
 * enabling our servers to shut down gracefully.
 */
const httpServer = http.createServer(app);

// Using graphql middleware
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

const init = async () => {
  try {
    await server.start();
    app.use(
      '/graphql',
      cors<cors.CorsRequest>({
        origin: [ORIGIN_HOST],
        credentials: true,
      }),
      /**
       * expressMiddleware accepts the same arguments:
       * an Apollo Server instance and optional configuration options
       */
      expressMiddleware(server, {
        context: async ({ req }: Record<string, any>) => ({ req }),
      }),
    );
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
    console.log(`Node env on ${NODE_ENV}`);
    console.log(`✓ Server running on ${HOST}:${PORT}  `);
    console.log(`✓ GraphQL running on ${HOST}:${PORT}/graphql  `);

  } catch (error) {
      console.error(error)
  }
}

init();
