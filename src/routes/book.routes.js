const express = require('express');
const { 
  createBook, 
  getAllBooks, 
  getBookById 
} = require('../controllers/book.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router
  .route('/books')
  .post(protect, createBook)
  .get(getAllBooks);

router
  .route('/books/:id')
  .get(getBookById);

module.exports = router;