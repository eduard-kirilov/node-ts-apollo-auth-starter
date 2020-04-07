/**
 * Node, Mongo, GraphQL - Starter Kit
 * https://github.com/eduard-kirilov/Online-store-5-api-products
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */

import { Product } from '../models/product';
import { User } from '../models/user';
import { IPropsString, IProducts } from '../utils/interface';



export const resolvers = {
  Query: {
    product: (parent: any, { id }: IPropsString): object =>
      Product.findById(id),
    products: (parent: any, { title }: IProducts): object => {
      if (title && title.length) {
        return Product.find({ title: { $regex: title, $options: 'i' } });
      }
      return Product.find();
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
    createUser: async (parent: any, { email, password }:IPropsString) => {
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
