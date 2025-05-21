const express = require('express');
const { 
  createReview, 
  updateReview, 
  deleteReview 
} = require('../controllers/review.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router
  .route('/books/:id/reviews')
  .post(protect, createReview);

router
  .route('/reviews/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;