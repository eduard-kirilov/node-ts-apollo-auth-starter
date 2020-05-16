/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Product } from '../../models/product';
import { IPropsString, IPaginate } from '../../utils/interface';
import { switchDirection as sd } from '../../utils/helper';

export const product = async (parent: unknown, { _id }: IPropsString) => {
  try {
    const product = await Product.findById(_id);
    return product;
  } catch (err) {
    throw err;
  }
};

export const products = async (
  parent: unknown,
  { ids, per_page, page, direction: dir }: IPaginate,
) => {
  try {
    if (!dir) {
      throw new Error(
        'Required parameter "direction" its value must be "ASC" or "DESC"!',
      );
    }
    let data: any = [];
    let options: any = {};

    if (!ids && typeof page === 'number') {
      options = { number: { 
        $gte: page * per_page,
        $lt: (page + 1) * per_page,
      } };
    } else if (ids && (typeof page !== 'number' || !page)) {
      options = { _id: { $in: ids } };
    }

    console.log('options ', options)
    data = await Product.find(options).sort({ _id: sd[dir] });

    const total = await Product.countDocuments({});

    return {
      data,
      page,
      total,
    };
  } catch (err) {
    throw err;
  }
};
