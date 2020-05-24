/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import passport from 'passport';
import { IPropsNum, IPropsString } from './interface';

export const isAuthenticated = (req: any) => {
  if (!req.isAuthenticated()) {
    throw new Error('User not authenticated');
  }
};

export const handleError = (err: any) => {
  if (err) {
    throw err;
  }
};

export const switchDirection: IPropsNum = {
  DESC: -1,
  ASC: 1,
};

export const authenticate = (args: IPropsString, req: any) =>
  new Promise((resolve: any, reject: any) => {
    passport.authenticate('local', async (err, user, info) => {
      try {
        if (err) throw new Error('User is not login!');
        if (!user)
          throw new Error('You entered an incorrect username or password!');

        await req.logIn(user, (err: any) => {
          if (err) reject(err);
          return resolve(user);
        });

        return resolve(user);
      } catch (err) {
        return reject(err);
      }
    })({ query: args });
  });
