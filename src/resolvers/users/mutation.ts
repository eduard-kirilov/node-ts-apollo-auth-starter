/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import passport from 'passport';
import { isAuthenticated } from '../../utils/helper';
import { ICtx, IPropsString } from '../../utils/interface';
import { User } from '../../models/user';

export const signup = async (
  parent: unknown,
  { email, password }: IPropsString,
  { req }: ICtx,
) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('User already Exists');
    } else {
      const newUser = new User({
        email: email,
        password: password,
      });

      const saveUser = await newUser.save();

      await req.logIn(saveUser, (err: any) => {
        if (err) throw new Error('User is not login');
      });

      return saveUser;
    }
  } catch (err) {
    throw err;
  }
};

export const login = (
  parent: unknown,
  args: IPropsString,
  { req }: ICtx,
) =>
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

export const logout = (
  parent: unknown,
  args: unknown,
  { req }: ICtx,
) => {
  try {
    console.log('isAuthenticated ', req.isAuthenticated())
    isAuthenticated(req);
    return req.logout();
  } catch (err) {
    throw err;
  }2
};
