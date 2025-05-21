# Book Review API

A RESTful API built with Node.js and Express for a Book Review system.

## Overview

This project is a complete RESTful API that allows users to register, login, add books, write reviews, and search for books by title or author. It includes JWT authentication, pagination, and proper error handling.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JWT for authentication
- Joi for validation
- bcryptjs for password hashing

## Features

- User authentication (signup and login)
- Book management (create, read)
- Review system (create, update, delete)
- Search functionality
- Pagination
- Error handling
- Input validation

## Database Schema

### User Model
- username: String (required, unique)
- email: String (required, unique)
- password: String (required, hashed)
- timestamps: createdAt, updatedAt

### Book Model
- title: String (required)
- author: String (required)
- genre: String (required)
- publishedYear: Number
- description: String (required)
- createdBy: ObjectId (reference to User)
- timestamps: createdAt, updatedAt

### Review Model
- text: String (required)
- rating: Number (required, 1-5)
- book: ObjectId (reference to Book)
- user: ObjectId (reference to User)
- timestamps: createdAt, updatedAt

## API Endpoints

### Authentication
- POST /api/signup - Register a new user
- POST /api/login - User login

### Books
- POST /api/books - Add a new book (authenticated)
- GET /api/books - Get all books with pagination
  - Query parameters: page, limit, author, genre
- GET /api/books/:id - Get book details by ID

### Reviews
- POST /api/books/:id/reviews - Submit a review (authenticated)
- PUT /api/reviews/:id - Update a review (owner only)
- DELETE /api/reviews/:id - Delete a review (owner only)

### Search
- GET /api/search - Search books by title or author
  - Query parameters: query, page, limit

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/book-review-api.git
   cd book-review-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a .env file in the root directory with the following variables
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```

4. Start the server
   ```
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Example API Requests

### Register a new user
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Add a new book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "publishedYear": 1925,
    "description": "A novel about the American Dream..."
  }'
```

### Get all books
```bash
curl -X GET "http://localhost:3000/api/books?page=1&limit=10&genre=Classic"
```

### Add a review
```bash
curl -X POST http://localhost:3000/api/books/BOOK_ID/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "text": "This is a great book!",
    "rating": 5
  }'
```

### Search for books
```bash
curl -X GET "http://localhost:3000/api/search?query=Gatsby&page=1&limit=10"
```

## Design Decisions and Assumptions

1. **Authentication**: JWT-based authentication was chosen for its stateless nature and scalability.
2. **Database**: MongoDB was selected for its flexibility with document-based data and ease of use with Node.js.
3. **Pagination**: Implemented for all listing endpoints to improve performance and UX.
4. **Error Handling**: Comprehensive error handling with descriptive messages for better debugging.
5. **Validation**: Input validation using Joi to ensure data integrity.
6. **One review per user per book**: Enforced by a compound index to maintain data quality.

## Future Improvements

1. Add unit and integration tests
2. Implement rate limiting
3. Add more advanced search and filtering capabilities
4. Add image upload for book covers
5. Implement user roles (admin, moderator)
6. Add social features (like, share)
# Book-Review-Backend