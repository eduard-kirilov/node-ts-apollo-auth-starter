/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import mongoose from 'mongoose';
import { IProduct, IAllAny } from '../utils/interface';

const Schema = mongoose.Schema;

var CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.model('counter', CounterSchema);

const ProductSchema = new Schema({
  title: String,
  subtitle: String,
  url: String,
  price: String,
  number: {
    type:Number,
    default: 0,
   },
});

ProductSchema.pre('save', async function (next) {
  try {
    const doc: IAllAny = this;

    const result: IAllAny = await Counter.findByIdAndUpdate(
      { _id: 'entityId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    )

    if (result && result.seq) {
      doc.number = result.seq;
    }
  } catch (err) {
    throw err;
  }  
});

export const Product = mongoose.model <IProduct> ('product', ProductSchema);
