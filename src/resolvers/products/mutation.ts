/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import { Products } from '../../models/products';
import { IPropsString } from '../../utils/interface';
import { handleError } from '../../utils/helper';

export const addProduct = (
  _: unknown,
  { title, subtitle, url, price }: IPropsString,
) => {
  try {
    const products = new Products({
      title,
      subtitle,
      url,
      price,
    });
    return products.save();
  } catch (err) {
    throw err;
  }
};

export const delProduct = async (_: unknown, { _id }: IPropsString) => {
  try {
    await Products.findOneAndRemove({ _id }, handleError);
    return { _id };
  } catch (err) {
    throw err;
  }
};

export const upProduct = async (
  _: unknown,
  { _id, title, subtitle, url, price }: IPropsString,
) => {
  try {
    const products = await Products.updateOne(
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
    if (products.upsertedId) {
      return { _id };
    }
    throw new Error('Product not found');
  } catch (err) {
    throw err;
  }
};

export const sortProduct = (
  _: unknown,
  { id, title, subtitle, url, price }: IPropsString,
) => {
  try {
    return Products.updateOne(
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
