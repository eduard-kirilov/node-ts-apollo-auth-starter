/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Product } from '../models/product';
import { User } from '../models/user';
import passport from 'passport';
import { IPropsString, IProducts, UserContext } from '../utils/interface';

export const resolvers = {
  Query: {
    product: async (parent: unknown, { id }: IPropsString) => {
      try {
        const product = await Product.findById(id);
        return product;
      } catch (err) {
        throw err;
      }
    },
    products: async (parent: unknown, { title }: IProducts) => {
      try {
        if (title && title.length) {
          const products = await Product.find({
            title: { $regex: title, $options: 'i' },
          });
          return products;
        }
        const products = await Product.find();
        return products;
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
      parent: unknown,
      { title, subtitle, url }: IPropsString,
    ): object => {
      const product = new Product({
        title,
        subtitle,
        url,
      });
      return product.save();
    },
    delProduct: (parent: unknown, { id }: IPropsString): object => {
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
      parent: unknown,
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
      parent: unknown,
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
    signUp: async (parent: unknown, { email, password }: IPropsString) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error('User already Exists');
        } else {
          const newUser = new User({
            email: email,
            password: password,
          });
          const savedUser = await newUser.save();
          return { userId: savedUser.id };
        }
      } catch (error) {
        throw error;
      }
    },
    login: async (
      parent: unknown,
      { email, password }: IPropsString,
      context: UserContext,
    ) => {
      const { user } = await context.authenticate('graphql-local', {
        email,
        password,
      });
      await context.login(user);
      return { user };
    },
    logout: (
      parent: unknown,
      args: unknown,
      context: UserContext
    ) =>
      context.logout(),
  },
};
