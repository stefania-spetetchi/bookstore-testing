let mongoose = require('mongoose');
let Book = require('../models/book');

function getBooks(req, res) {
  let query = Book.find({});
  query.exec((err, books) => {
    if(err) res.send(err);
    res.send(books);
  });
}

function postBook (req, res) {
  //Creates a new book
  var newBook = new Book(req.body);
  //Save it into the DB.
  newBook.save((err,book) => {
    if (err) {
      res.send(err);
    } else {
      res.send(book);
    }
  });
};

function getBook (req, res) {
  Book.findById(req.params.id, (err, book) => {
    if(err) res.send(err);
    res.send(book);
  });
};

function deleteBook(req, res) {
  Book.remove({_id : req.params.id}, (err, result) => {
    res.send(result);
  });
};

function updateBook(req, res) {
  Book.findById({_id: req.params.id}, (err, book) => {
    if(err) res.send(err);
    Object.assign(book, req.body).save((err, book) => {
      if(err) res.send(err);
      res.send(book);
    });
  });
};

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };
