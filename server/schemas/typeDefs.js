const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Number
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: String
    user: User
  }
`;
