/**
 * Node, Mongo, GraphQL - Starter Kit
 * https://github.com/eduard-kirilov/Online-store-5-api-products
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */

import passport from 'passport';
import { Strategy } from 'passport-local';
import _ from 'lodash';

import { User } from '../models/user';
import { IUser } from '../utils/interface';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new Strategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user:IUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered.' });
      }
      if (!user.comparePassword) {
        return done(null, false, { msg: 'An error occurred on the server!' });
      }
      user.comparePassword(password, (err: object, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });
  }),
);
