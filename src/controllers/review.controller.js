const Review = require('../models/review.model');
const Book = require('../models/book.model');


// POST /api/books/:id/reviews
exports.createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    
    // Check if book exists
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    
    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      book: id,
      user: req.user._id
    });
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: 'You have already reviewed this book'
      });
    }
    
    const newReview = await Review.create({
      text,
      rating,
      book: id,
      user: req.user._id
    });

    await newReview.populate('user', 'username');
    
    res.status(201).json({
      success: true,
      data: {
        review: newReview
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/reviews/:id  -> update review
exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    
    // Find review
    let review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    // Check if user is the owner of the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You can only update your own reviews'
      });
    }
    
    // Update review
    review = await Review.findByIdAndUpdate(
      id,
      { text, rating },
      { new: true, runValidators: true }
    ).populate('user', 'username');
    
    res.status(200).json({
      success: true,
      data: {
        review
      }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/reviews/:id
exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
  
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You can only delete your own reviews'
      });
    }
    
    await Review.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};