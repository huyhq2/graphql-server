const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");

const mongoDataMethods = {
    getAllBooks: async (condition = null) =>
      condition ? await Book.find() : await Book.find(condition),
    getBookById: async (id) => await Book.findById(id),
    //TODO: pagination
    getBooksByAuthorId: async (id) => await Book.find({ authorId: id }), 
    getAllAuthors: async () => await Author.find(),
    getAuthorById: async (id) => await Author.findById(id),
    createAuthor: async (args) => {
      const newAuthor = new Author(args);
      return await newAuthor.save();
    },
    createBook: async (args) => {
      const newBook = new Book(args);
      return await newBook.save();
    },
    createGenre: async (args) => {
      const newGenre = new Genre(args);
      return await newGenre.save();
    },
    checkExistedBook: async (arg) => await Book.findOne(arg),
    checkExistedAuthor: async (arg) => await Author.findOne(arg),
    checkExistedGenre: async (arg) => await Genre.findOne(arg)
    
};

module.exports = mongoDataMethods;
