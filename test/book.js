let Book = require("../app/models/book");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

let should = chai.should();

chai.use(chaiHttp);

beforeEach(() => {
  Book.removeAll();
});

describe("Books", () => {
  describe("/GET book", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(server)
        .get("/book")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST book", () => {
    it('it should POST a book ', done => {
      let book = {
        title: 'The Hunger Games',
        author: "Suzanne Collins",
        year: 2008,
        pages: 301
      };
      chai
        .request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('pages');
          res.body.should.have.property('year');
          done();
        });
    });
  });

  describe("/POST book", () => {
    it('it should not POST a book without pages field', (done) => {
      let book = {
        title: 'The Hunger Games',
        author: "Suzanne Collins",
        year: 2008,
      };
      chai
        .request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.should.have.property('error');
          // res.error.should.have.property('pages');
          // res.body.should.have.property('pages');
          // res.body.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });

  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
      let book = Book.addBook({
        title: 'The Hunger Games',
        author: "Suzanne Collins",
        year: 2008,
        pages: 301
      });

      chai
        .request(server)
        .get("/book/" + book.id)
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property('title');
          res.body.should.have.property('pages');
          res.body.should.have.property('year');
          res.body.should.have.property('id').eql(book.id);
          done();
        });
    })
  });

  describe('/PUT/:id book', () => {
    it('it should UPDATE a book given the id', (done) => {
      let book = Book.addBook({
        title: 'The Hunger Games',
        author: "Suzanne Collins",
        year: 2008,
        pages: 301
      });

      chai
        .request(server)
        .put("/book/" + book.id)
        .send({
          title: 'The Hunger Games', author: "Suzanne Collins", year: 2008, pages: 399, id: book.id
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("pages").eql(399);
          done();
        });

    })
  });

  describe('/DELETE/:id book', () => {
    it('it should DELETE a book by the given id', (done) => {
      let book = Book.addBook({
        title: 'The Hunger Games',
        author: "Suzanne Collins",
        year: 2008,
        pages: 301
      });

      chai
        .request(server)
        .delete("/book/" + book.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    })
  });
});