/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import session from 'express-session';
import MS from 'connect-mongo';

const {
  SESSION_SECRET = '',
  DB_HOST = '',
} = process.env;


export const sessionMiddleware = session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1209600000,
    httpOnly: false,
  }, // two weeks
  proxy: true,
  store: MS.create({
    mongoUrl: DB_HOST,
  })
});