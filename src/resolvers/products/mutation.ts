/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Product } from '../../models/product';
import { IPropsString } from '../../utils/interface';

export const addProduct = (
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
};

export const delProduct = (
  parent: unknown,
  { id }: IPropsString,
): object => {
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
};

export const upProduct = (
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
};

export const sortProduct = (
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
};
