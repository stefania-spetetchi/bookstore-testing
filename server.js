let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = 8080;
let book = require('./app/routes/book');

app.use(bodyParser.json());

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.route("/book")
	.get(book.getBooks)
	.post(book.postBook);

app.route("/book/:id")
	.get(book.getBook)
	.delete(book.deleteBook)
	.put(book.updateBook);

app.listen(port);

console.log("Listening on port " + port);

module.exports = app; // for testing
