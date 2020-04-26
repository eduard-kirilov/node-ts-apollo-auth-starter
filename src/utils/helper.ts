/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
export const isAuthenticated = (req: any) => {
  if (!req.isAuthenticated()) {
    throw new Error('User not authenticated');
  }
};
