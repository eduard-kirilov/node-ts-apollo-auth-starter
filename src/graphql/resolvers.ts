/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
import { Product } from '../models/product';
import { User } from '../models/user';
import passport from 'passport';
import { IPropsString, IProducts } from '../utils/interface';


export const resolvers = {
  Query: {
    product: async (parent: any, { id }: IPropsString) => {
      try {
        const product = await Product.findById(id);
        return product;
      } catch (err) {
        throw err;
      }
    },
    products: async (parent: any, { title }: IProducts) => {
      try {
        if (title && title.length) {
          const products = await Product.find({ title: { $regex: title, $options: 'i' } });
          return products;
        }
        const products = await Product.find();
        return products
      } catch (err) {
        throw err;
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addProduct: (
      parent: any,
      { title, subtitle, url }: IPropsString,
    ): object => {
      const product = new Product({
        title,
        subtitle,
        url,
      });
      return product.save();
    },
    delProduct: (parent: any, { id }: IPropsString): object => {
      return Product.findOneAndRemove(
        {
          _id: id,
        },
        err => {
          if (err) console.error(err);
        },
      );
    },
    upProduct: (
      parent: any,
      { id, title, subtitle, url }: IPropsString,
    ): object => {
      return Product.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            title,
            subtitle,
            url,
          },
        },
        err => {
          if (err) console.error(err);
        },
      );
    },
    sortProduct: (
      parent: any,
      { id, title, subtitle, url }: IPropsString,
    ): object => {
      return Product.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            title,
            subtitle,
            url,
          },
        },
        err => {
          if (err) console.error(err);
        },
      );
    },
    signUp: async (parent: any, { email, password }:IPropsString) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error('User already Exists');
        } else {
          const newUser = new User({
            email: email,
            password: password
          });
          const savedUser = await newUser.save();
          return { userId: savedUser.id };
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
