/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import * as usersQuery from './users/query';
import * as usersMutation from './users/mutation';
import * as productsQuery from './products/query';
import * as productsMutation from './products/mutation';

export const resolvers = {
  Query: {
    ...productsQuery,
    ...usersQuery,
  },
  Mutation: {
    ...productsMutation,
    ...usersMutation,
  },
};
