let Book = require('../models/book');
let books = [];
let currentId = 1;

function getBooks(req, res) {
  res.send(books);
}

function postBook (req, res) {
  let newBook = new Book(req.body);
  newBook.id = currentId;
  currentId++;
  books.push(newBook);
  res.send(newBook);
};

function getBook (req, res) {
  let book = books.find((book=>book.id == req.params.id))
  res.send(book);
};

function deleteBook(req, res) {
  books = books.filter((book=>book.id != req.params.id))
  res.send(true);
};

function updateBook(req, res) {
  let book = books.find((book=>book.id == req.params.id))
  Object.assign(book, req.body);
  res.send(book);
};

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };
