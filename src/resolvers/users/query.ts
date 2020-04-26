/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { isAuthenticated } from '../../utils/helper';
import { ICtx } from '../../utils/interface';
import { User } from '../../models/user';

export const currentUser = (
  parent: unknown,
  args: unknown,
  { req }: ICtx,
) => {
  try {
    isAuthenticated(req);
    return req.user;
  } catch (error) {
    throw error;
  }
};

export const users = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err;
  }
};