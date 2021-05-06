let books = [];
let currentId = 1;
const util = require('util');

class Book {
  constructor(params) {
    Object.assign(this, params);
  }

  static addBook(newBook) {
    newBook.id = currentId;
    currentId++;
    books.push(newBook)
    return newBook;
  }

  static removeAll() {
    books = [];
  }

  static remove(bookIdToRemove) {
    books = books.filter((book => book.id != bookIdToRemove))
  }

  static getBook(bookId) {
    return books.find((book => book.id == bookId))
  }

  static getAll() {
    return books
  }

  static updateBook(updatedBook) {
    let book = books.find((book => book.id == updatedBook.id))
    Object.assign(book, updatedBook);
    return book;
  }
}

//Exports the Book for use elsewhere.
module.exports = Book;
