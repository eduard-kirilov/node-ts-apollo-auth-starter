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
  { ids, page_size, first_id, last_id, direction: dir }: IPaginate,
) => {
  try {
    if (!dir) {
      throw new Error(
        'Required parameter "direction" its value must be "ASC" or "DESC"!',
      );
    }
    let data: any = [];
    let options: any = {};
    let sortOptions: any = {};
    if (!ids && first_id && !last_id) {
      options = { _id: { $lt: first_id} };
      sortOptions = { _id: -1 };
    } else if (!ids && last_id && !first_id) {
      options = { _id: { $gt: last_id} };
      sortOptions = { _id: 1 };
    } else if (ids && !first_id && !last_id) {
      options = { _id: { $in: ids } };
    }

    data = await Product.find(options)
      .sort(sortOptions)
      .limit(page_size)
      .sort({ _id: sd[dir] });

    const firstId = data.length && data.length > 0 ? data[0]._id : null;

    let lastId = null;
    await (data || []).map(({ _id }: any) => (lastId = _id));
    const total = await Product.countDocuments({});

    return {
      data,
      first_id: firstId,
      last_id: lastId,
      total,
    };
  } catch (err) {
    throw err;
  }
};
