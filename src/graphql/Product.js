const graphql = require('graphql');
const Product = require('../models/Product');

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = graphql;

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    subtitle: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { title, subtitle, url }) {
        const product = new Product({
          title,
          subtitle,
          url,
        });
        return product.save();
      },
    },
    delProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Product.findOneAndRemove(
          {
            _id: id,
          },
          (err) => {
            if (err) console.error(err);
          },
        );
      },
    },
    upProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, title, subtitle, url }) {
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
          (err) => {
            if (err) console.error(err);
          },
        );
      },
    },
    sortProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        vote: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { id, title, subtitle, url }) {
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
          (err) => {
            if (err) console.error(err);
          },
        );
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: `Query`,
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Product.findById(id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      args: {
        title: { type: GraphQLString },
      },
      resolve(parent, { title }) {
        if (title !== '') {
          return Product.find({ title: { $regex: title, $options: 'i' } });
        }
        return Product.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
