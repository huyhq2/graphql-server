const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type BookPagination {
    bookList: [Book]!
    totalCount: Int
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  type Genre {
    id: ID!
    name: String
  }

  input BookInput {
    name: String!
    genre: String!
    authorId: ID!
  }

  input AuthorInput {
    name: String!
    age: Int
  }

  # ROOT TYPE
  type Query {
    books(page: Int, size: Int): BookPagination
    book(id: ID!): Book
    booksOfAuthor(authorId: ID!, page: Int, size: Int): BookPagination
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(data: AuthorInput!): Author
    createBook(data: BookInput!): Book
    createGenre(name: String): Genre
  }
`;

module.exports = typeDefs;
