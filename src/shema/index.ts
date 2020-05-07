/**
* Node, TS, Apollo, Auth, - Starter
* https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/
export const typeDefs = `
  type User {
    _id: ID!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    _id: ID!
  }
  type Product {
    _id: ID
    title: String
    subtitle: String
    url: String
    price: String
  }
  type ProductId {
    _id: ID
  }
  type Query {
    users: [User!]!
    currentUser: User
    product(_id: String!): Product
    products(ids: [String]): [Product]
  }
  type Mutation {
    addProduct(
      price: String,
      subtitle: String,
      title: String,
      url: String,
    ): ProductId
    upProduct(
      _id: String!,
      price: String,
      subtitle: String,
      title: String,
      url: String,
    ): ProductId
    sortProduct(title: String): Product
    delProduct (_id: String!): ProductId
    signup(email: String!, password: String!): AuthData!
    login(email: String, password: String): User
    logout: Boolean
  }
`;