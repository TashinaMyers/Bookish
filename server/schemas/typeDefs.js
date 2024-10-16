const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    books: [Book]
    book(bookId: String!): Book
    bookSearch(searchTerm: String!): [Book]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookId: String!
      title: String!
      description: String!
      authors: [String]
      image: String
      link: String
    ): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
