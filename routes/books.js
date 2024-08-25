const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

// get all the books
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

// all issued books
router.get("/issued/by-user", (req, res) => {
  const userWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBook = [];
  userWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBook.push(book);
  });

  if (issuedBook.length === 0) {
    return (
      res.status(404),
      express.json({
        success: false,
        message: "No book have been issued",
      })
    );
  }

  return res.status(200).json({
    success: true,
    message: "User with the issued book....",
    data: issuedBook,
  });
});

// get book by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book doesn't found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Book found",
    data: book,
  });
});

// Add a new book
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data to add a book",
    });
  }

  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(400).json({
      success: false,
      message: "Book already exsist!!!",
    });
  }

  const allBooks = { ...books, data };
  return res.status(201).json({
    success: false,
    message: "New book added!!",
    data: allBooks,
  });
});

// Updating a book by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book not found for this id!!",
    });
  }

  const updatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    message: "Updated the book by their id",
    data: updatedData,
  });
});

module.exports = router;
