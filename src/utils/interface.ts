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
export interface IPropsNum {
  [key: string]: number;
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
  _id: String;
  title: string;
  subtitle: string;
  url: string;
  price: number;
}

export interface ICtx {
  req: Request;
}

export interface IQueryIds {
  ids: [string];
}

export interface IPaginate {
  page_size: number;
  first_id?: string;
  last_id?: string;
  direction: string;
  ids?: [string];
}