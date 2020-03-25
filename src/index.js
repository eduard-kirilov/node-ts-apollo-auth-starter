/**
* Node, Mongo, GraphQL - Starter Kit
* https://github.com/eduard-kirilov/Online-store-5-api-products
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/

const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressStatusMonitor = require('express-status-monitor');

/**
 * Controllers.
 */
const makeExecutableSchema = require("./controllers/product");
/**
 * Data base.
 */
const { setUpConnection } = require('./utils/db');
/**
 * API keys and Passport configuration.
 */
// const passportConfig = require('./utils/passport');

const {
  NODE_ENV,
  PORT,
  HOST,
  SESSION_SECRET,
  DB_HOST,
} = process.env;
// Initialization of express application
const app = express();

/**
 * Connect to MongoDB.
 */
setUpConnection()
/**
 * Express configuration.
 */
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
  store: new MongoStore({
    url: DB_HOST,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
/**
 * Error Handler.
 */
if (NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

// Using graphql middleware
const server = new ApolloServer({
    schema: makeExecutableSchema,
    playground: true
  });

server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`${chalk.green('✓')} 🚀 Server running on http://localhost:${PORT}  `);
    console.log(`${chalk.green('✓')} 🚀 GraphQL running on http://localhost:${PORT}/graphql  `);
})

module.exports = app;