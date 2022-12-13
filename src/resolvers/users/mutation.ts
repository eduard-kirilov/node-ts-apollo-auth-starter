/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { isAuthenticated, authenticate } from '../../utils/helper';
import { ICtx, IPropsString } from '../../utils/interface';
import { User } from '../../models/user';

export const signup = async (
  _: unknown,
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

      if (saveUser) return authenticate({ email, password }, req);
      throw new Error('Error on the server, the user was not created.');
    }
  } catch (err) {
    throw err;
  }
};

export const login = (
  _: unknown,
  args: IPropsString,
  { req }: ICtx,
) => authenticate(args, req);


export const logout = (
  _: unknown,
  __: unknown,
  { req }: ICtx,
) => {
  try {
    isAuthenticated(req);
    return req.logout();
  } catch (err) {
    throw err;
  }2
};
