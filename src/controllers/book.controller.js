const Book = require('../models/book.model');
const Review = require('../models/review.model');


// POST /api/books
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, genre, publishedYear, description } = req.body;
    
    const newBook = await Book.create({
      title,
      author,
      genre,
      publishedYear,
      description,
      createdBy: req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: {
        book: newBook
      }
    });
  } catch (error) {
    next(error);
  }
};


// GET /api/books
exports.getAllBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    
    // Build filter object
    const filter = {};
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };
    
    // Calculate pagination values
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get books
    const books = await Book.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'username');

    const totalBooks = await Book.countDocuments(filter);
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

// GET /api/books/:id   -> Get a single book by ID with reviews
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    // Calculate pagination values for reviews
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const book = await Book.findById(id)
      .populate('createdBy', 'username');
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    
    // Get reviews with pagination
    const reviews = await Review.find({ book: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user', 'username');
  
    const totalReviews = await Review.countDocuments({ book: id });
    
    // Calculate average rating
    let averageRating = 0;
    if (totalReviews > 0) {
      const ratingsSum = await Review.aggregate([
        { $match: { book: book._id } },
        { $group: { _id: null, avg: { $avg: '$rating' } } }
      ]);
      
      if (ratingsSum.length > 0) {
        averageRating = parseFloat(ratingsSum[0].avg.toFixed(1));
      }
    }
    
    // Calculate total pages for reviews
    const totalPages = Math.ceil(totalReviews / parseInt(limit));
    
    res.status(200).json({
      success: true,
      data: {
        book,
        reviews: {
          items: reviews,
          count: reviews.length,
          totalReviews,
          totalPages,
          currentPage: parseInt(page),
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        },
        averageRating
      }
    });
  } catch (error) {
    next(error);
  }
};