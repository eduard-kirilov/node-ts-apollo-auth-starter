/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import passport from 'passport';

import { Strategy } from 'passport-local';
import { User } from '../models/user';
import { IPropsString, IUserCompare, IUser } from '../utils/interface';

passport.serializeUser((user, done) => {
  const { id } = (user || {}) as IUser;
  return done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: Error, user: IUser) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
export const passportMiddleware = passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    },
    (email: any, password: any, done: any) => {
      User.findOne(
        { email: email.toLowerCase() },
        (err: any, user: IPropsString & IUserCompare) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            return done(null, false, { msg: 'Your account was registered.' });
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
        },
      );
    },
  ),
);
