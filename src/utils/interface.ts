/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
import { Request as ExpressRequest } from 'express';
import { PassportSubscriptionContext, PassportContext } from 'graphql-passport';
export interface IPropsString {
  [key: string]: string;
}

export interface IProducts {
  title?: string;
}

export  interface IUserCompare {
  comparePassword: any;
};

export interface UserContext extends PassportContext<IPropsString, ExpressRequest>{}
 
export interface SubContext extends PassportSubscriptionContext<IPropsString, ExpressRequest>{}