const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    // args lay tu schema
    book: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getBookById(args.id);
    },
    authors: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllAuthors();
    },
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(args.id);
    },
  },
  Book: {
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(parent.authorId);
    },
  },
  Author: {
    books: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllBooks({ authorId: parent.id });
    },
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) => { 
      try {
        //Check existed author 
        const author = await mongoDataMethods.checkExistedAuthor(args.data);
        if(author) throw new Error("Author already exists")
  
        return await mongoDataMethods.createAuthor(args.data);
      } catch (error) {
        return error
      }
    },
    createBook: async (parent, args, { mongoDataMethods }) => {
      try {  
        // Check existed book
        const book = await mongoDataMethods.checkExistedBook(args.data);
        if(book) throw new Error("Book already exists")
  
        return await mongoDataMethods.createBook(args.data);
      } catch (error) {
        return error     
      }
    },
    createGenre: async (parent, args, { mongoDataMethods }) => {
      try {
        // Check existed genre
        const genre = await mongoDataMethods.checkExistedGenre(args);
        if(genre) throw new Error("Genre already exists")

        return await mongoDataMethods.createGenre(args);
      } catch (error) {
        return error
      }
    },
  },
};

module.exports = resolvers;
