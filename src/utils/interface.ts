/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
import { Document } from 'mongoose'
import { Request } from 'express';

export interface IPropsString {
  [key: string]: string;
}

export interface IProducts {
  title?: string;
}

export  interface IUserCompare {
  comparePassword: any;
};

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    role: string;
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  },
}

export interface IProduct extends Document {
  title: string;
  subtitle: string;
  url: string;
}

export interface ICtx {
  req: Request;
}