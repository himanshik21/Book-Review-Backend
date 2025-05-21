const Book = require('../models/book.model');

// Search books by title or author
exports.searchBooks = async (req, res, next) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    // Build search filter
    const searchFilter = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    };
    
    // Calculate pagination values
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get matching books
    const books = await Book.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'username');
    
    const totalBooks = await Book.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalBooks / parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: books.length,
      pagination: {
        totalBooks,
        totalPages,
        currentPage: parseInt(page),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      },
      data: {
        books
      }
    });
  } catch (error) {
    next(error);
  }
};