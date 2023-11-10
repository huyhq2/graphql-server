const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");

const mongoDataMethods = {
  getBooks: async (args) => {
    const { skip, limit, condition } = args;
    // Get amount of books
    const totalCount = await Book.countDocuments();
    let bookList = [];
    if (condition) {
      bookList = await Book.find(condition).skip(skip).limit(limit);
    } else {
      bookList = await Book.find().skip(skip).limit(limit);
    }
    return { bookList, totalCount };
  },
  getBookById: async (id) => await Book.findById(id),
  getBooksByAuthorId: async (arg) => {
    const { skip, limit, authorId } = arg;
    const totalCount = await Book.countDocuments({ authorId: authorId });
    const bookList = await Book.find({ authorId: authorId })
      .skip(skip)
      .limit(limit);
    return { bookList, totalCount };
  },
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
  checkExistedGenre: async (arg) => await Genre.findOne(arg),
};

module.exports = mongoDataMethods;
