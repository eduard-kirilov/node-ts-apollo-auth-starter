/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Products } from '../../models/products';
import { IPropsString, IPaginate } from '../../utils/interface';
import { switchDirection as sd } from '../../utils/helper';

export const product = async (parent: unknown, { _id }: IPropsString) => {
  try {
    const products = await Products.findById(_id);
    return products;
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
      data = await Products.find().sort({ _id: sd[dir] })
        .skip(per_page * page)
        .limit( per_page );
    } else if (ids && (typeof page !== 'number' || !page)) {
      options = { _id: { $in: ids } };
      data = await Products.find({ _id: { $in: ids } }).sort({ _id: sd[dir] })
    } else {
      data = await Products.find().sort({ _id: sd[dir] });
    }

    const total = await Products.countDocuments({});

    return {
      data,
      page,
      total,
    };
  } catch (err) {
    throw err;
  }
};
