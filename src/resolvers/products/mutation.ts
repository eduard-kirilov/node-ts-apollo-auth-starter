/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Product } from '../../models/product';
import { IPropsString } from '../../utils/interface';

export const addProduct = (
  parent: unknown,
  { title, subtitle, url, price }: IPropsString,
): object => {
  try {
    const product = new Product({
      title,
      subtitle,
      url,
      price,
    });
    return product.save();
  } catch (err) {
    throw err;
  }
};

export const delProduct = (parent: unknown, { _id }: IPropsString): object => {
  try {
    return Product.findOneAndRemove(
      {
        _id,
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
  { _id, title, subtitle, url, price }: IPropsString,
): object => {
  return Product.updateOne(
    {
      _id,
    },
    {
      $set: {
        title,
        subtitle,
        url,
        price,
      },
    },
    err => {
      if (err) console.error(err);
    },
  );
};

export const sortProduct = (
  parent: unknown,
  { id, title, subtitle, url, price }: IPropsString,
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
          price,
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
