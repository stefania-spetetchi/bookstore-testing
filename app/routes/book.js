let Book = require('../models/book');

function getBooks(req, res) {
  res.send(Book.getAll())
}

function postBook (req, res) {
  let newBook = new Book(req.body);
  Book.addBook(newBook)
  res.send(newBook);
};

function getBook (req, res) {
  res.send(Book.getBook(req.params.id));
};

function deleteBook(req, res) {
  Book.remove(req.params.id)
  res.send(true);
};

function updateBook(req, res) {
  res.send(Book.updateBook(req.body));
};

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };
