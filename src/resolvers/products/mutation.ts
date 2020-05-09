/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Product } from '../../models/product';
import { IPropsString } from '../../utils/interface';
import { handleError } from '../../utils/helper';

export const addProduct = (
  parent: unknown,
  { title, subtitle, url, price }: IPropsString,
) => {
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

export const delProduct = async (parent: unknown, { _id }: IPropsString) => {
  try {
    await Product.findOneAndRemove({ _id }, handleError);
    return { _id };
  } catch (err) {
    throw err;
  }
};

export const upProduct = async (
  parent: unknown,
  { _id, title, subtitle, url, price }: IPropsString,
) => {
  try {
    const product = await Product.updateOne(
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
      handleError,
    );
    if (product.ok) {
      return { _id };
    }
    throw new Error('Product not found');
  } catch (err) {
    throw err;
  }
};

export const sortProduct = (
  parent: unknown,
  { id, title, subtitle, url, price }: IPropsString,
) => {
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
      handleError,
    );
  } catch (err) {
    throw err;
  }
};
