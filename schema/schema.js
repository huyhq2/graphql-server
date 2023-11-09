const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  type Genre {
    id: ID!
    name: String,
  }
  
  input BookInput {
    name: String!,
    genre: String!,
    authorId: ID!
  }

  input AuthorInput {
    name: String!,
    age: Int
  }

  # ROOT TYPE
  type Query {
    books: [Book]
    book(id: ID!): Book
    booksOfAuthor(authorId: ID!): [Book]!
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(data: AuthorInput!): Author
    createBook(data: BookInput!): Book
    createGenre(name: String ): Genre 
  }
`;

module.exports = typeDefs;
