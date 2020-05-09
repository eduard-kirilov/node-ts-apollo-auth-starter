/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { IPropsNum } from './interface';

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
}