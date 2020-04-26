/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Product } from '../../models/product';
import { IPropsString, IProducts } from '../../utils/interface';

export const product = async (parent: unknown, { id }: IPropsString) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    throw err;
  }
};

export const products = async (parent: unknown, { title }: IProducts) => {
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
};
