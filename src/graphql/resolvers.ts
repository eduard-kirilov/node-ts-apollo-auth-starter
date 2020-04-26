/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Product } from '../models/product';
import { User } from '../models/user';
import { IPropsString, IProducts } from '../utils/interface';
import { isAuthenticated } from '../utils/helper';
import passport from 'passport';

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
    currentUser: (parent: unknown, args: unknown, { req }: any) => {
      try {
        isAuthenticated(req);
        return req.user;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addProduct: (
      parent: unknown,
      { title, subtitle, url }: IPropsString,
    ): object => {
      try {
        const product = new Product({
          title,
          subtitle,
          url,
        });
        return product.save();
      } catch (err) {
        throw err;
      }
    },
    delProduct: (parent: unknown, { id }: IPropsString): object => {
      try {
        return Product.findOneAndRemove(
          {
            _id: id,
          },
          err => {
            if (err) throw err;
          },
        );
      } catch (err) {
        throw err;
      }
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
      try {
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
      } catch (err) {
        throw err;
      }
    },
    signUp: async (parent: unknown, { email, password }: any, { req }: any) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error('User already Exists');
        } else {
          const newUser = new User({
            email: email,
            password: password,
          });
          const saveUser = await newUser.save();
          console.log(saveUser);
          return req.logIn(saveUser, (err: any) => {
            try {
              if (err) throw new Error('User is not login');
              return saveUser._id;
            } catch (err) {
              throw err;
            }
          });
        }
      } catch (err) {
        throw err;
      }
    },
    login: (parent: unknown, args: IPropsString, { req }: any) =>
      new Promise((resolve: any, reject: any) => {
        passport.authenticate('local', async (err, user, info) => {
          try {
            if (err) throw new Error('User is not login!');
            if (!user)
              throw new Error('You entered an incorrect username or password!');

            await req.logIn(user, (err: any) => {
              if (err) reject(err);
              return resolve(user);
            });

            return resolve(user);
          } catch (err) {
            return reject(err);
          }
        })({ query: args });
      }),
    logout: (parent: unknown, args: unknown, ctx: any) => {
      try {
        return ctx.req.logout();
      } catch (err) {
        throw err;
      }
    },
  },
};
