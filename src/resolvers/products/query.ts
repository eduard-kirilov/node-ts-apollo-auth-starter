/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { isArray } from 'lodash';
import { Product } from '../../models/product';
import { IPropsString, IQueryIds } from '../../utils/interface';

export const product = async (parent: unknown, { _id }: IPropsString) => {
  try {
    const product = await Product.findById(_id);
    return product;
  } catch (err) {
    throw err;
  }
};

export const products = async (parent: unknown, { ids }: IQueryIds) => {
  try {
    if (isArray(ids) && ids.length) {
      const products = await Product.find({
        _id: { $in: ids, $options: 'i' },
      });
      return products;
    }
    const products = await Product.find();
    return products;
  } catch (err) {
    throw err;
  }
};
