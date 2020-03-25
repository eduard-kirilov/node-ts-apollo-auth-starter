/**
* Node, Mongo, GraphQL - Starter Kit
* https://github.com/eduard-kirilov/Online-store-5-api-products
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/

const Product = require('../models/Product');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Product {
    id: ID,
    title: String,
    subtitle: String,
    url: String,
  }
  type Query {
    product(
      id: ID!
    ): Product
    products: [Product]
  }
  type Mutation {
    addProduct(
      title: String,
      subtitle: String,
      url: String,
    ): Product
    upProduct(
      id: ID!,
      title: String,
      subtitle: String,
      url: String,
    ): Product
    sortProduct(
      title: String,
    ): Product
    delProduct (
        id: ID
    ): Product
  }
`;

const resolvers = {
  Query: {
    product: (parent, { id }) => Product.findById(id),
    products: (parent, { title }) => {
      if (title && title !== '') {
        return Product.find({ title: { $regex: title, $options: 'i' } });
      }
      return Product.find();
    },
  },
  Mutation: {
    addProduct: (parent, { title, subtitle, url }) => {
      const product = new Product({
        title,
        subtitle,
        url,
      });
      return product.save();
    },
    delProduct: (parent, { id }) => {
      return Product.findOneAndRemove(
        {
          _id: id,
        },
        err => {
          if (err) console.error(err);
        },
      );
    },
    upProduct: (parent, { id, title, subtitle, url }) => {
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
    },
    sortProduct: (parent, { id, title, subtitle, url }) => {
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
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: resolvers,
});
