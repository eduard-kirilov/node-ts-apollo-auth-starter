export const typeDefs = `
  type User {
    _id: ID!
    email: String!
    password: String!
  }
  type AuthData {
    userId: ID!
  }
  type Product {
    _id: ID,
    title: String,
    subtitle: String,
    url: String,
  }
  type Query {
    users: [User!]!
    user(userId: ID!): User!
    product(id: ID!): Product
    products(title: String): [Product]
  }
  type Mutation {
    addProduct(
      title: String,
      subtitle: String,
      url: String,
    ): Product
    upProduct(
      _id: ID!,
      title: String,
      subtitle: String,
      url: String,
    ): Product
    sortProduct(title: String): Product
    delProduct (_id: ID): Product
    createUser(email: String!, password: String!): AuthData!
  }
`;