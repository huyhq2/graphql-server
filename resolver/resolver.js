const { DEFAULT_PAGE_SIZE } = require("../constants/mongodb");

const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) => {
      const { page = 1, size = DEFAULT_PAGE_SIZE, condition } = args;
      // calculate skip records
      const skip = page > 1 ? (page - 1) * DEFAULT_PAGE_SIZE : 0;
      const limit = size > 0 ? size : DEFAULT_PAGE_SIZE;
      return await mongoDataMethods.getBooks({ skip, limit, condition });
    },
    book: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getBookById(args.id);
    },
    authors: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllAuthors();
    },
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(args.id);
    },
    booksOfAuthor: async (parent, args, { mongoDataMethods }) => {
      const { page = 1, size = DEFAULT_PAGE_SIZE, authorId } = args;
      // calculate skip records
      const skip = page > 1 ? (page - 1) * DEFAULT_PAGE_SIZE : 0;
      const limit = size > 0 ? size : DEFAULT_PAGE_SIZE;

      return await mongoDataMethods.getBooksByAuthorId({
        skip,
        limit,
        authorId,
      });
    },
  },
  Book: {
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(parent.authorId);
    },
  },
  Author: {
    books: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getBooksByAuthorId(args.authorId);
    },
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) => {
      try {
        //Check existed author
        const author = await mongoDataMethods.checkExistedAuthor(args.data);
        if (author) throw new Error("Author already exists");

        return await mongoDataMethods.createAuthor(args.data);
      } catch (error) {
        return error;
      }
    },
    createBook: async (parent, args, { mongoDataMethods }) => {
      try {
        // Check existed book
        const book = await mongoDataMethods.checkExistedBook(args.data);
        if (book) throw new Error("Book already exists");

        return await mongoDataMethods.createBook(args.data);
      } catch (error) {
        return error;
      }
    },
    createGenre: async (parent, args, { mongoDataMethods }) => {
      try {
        // Check existed genre
        const genre = await mongoDataMethods.checkExistedGenre(args);
        if (genre) throw new Error("Genre already exists");

        return await mongoDataMethods.createGenre(args);
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = resolvers;
