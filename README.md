# 📚 Book Review API

A RESTful API built with Node.js and Express for a comprehensive Book Review system.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🔍 Overview

This project provides a complete RESTful API that enables users to register, login, add books, write reviews, and search for books by title or author. The API includes JWT authentication, pagination, and robust error handling.

## ⚙️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database (with Mongoose ORM)
- **JWT** - JSON Web Tokens for authentication
- **Joi** - Validation library
- **bcryptjs** - Password hashing utility

## ✨ Features

- 🔐 User authentication (signup and login)
- 📖 Book management (create, read)
- ⭐ Review system (create, update, delete)
- 🔍 Search functionality
- 📄 Pagination
- ⚠️ Error handling
- ✅ Input validation

## 📊 Database Schema

### User Model
```
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: { createdAt, updatedAt }
}
```

### Book Model
```
{
  title: String (required),
  author: String (required),
  genre: String (required),
  publishedYear: Number,
  description: String (required),
  createdBy: ObjectId (reference to User),
  timestamps: { createdAt, updatedAt }
}
```

### Review Model
```
{
  text: String (required),
  rating: Number (required, 1-5),
  book: ObjectId (reference to Book),
  user: ObjectId (reference to User),
  timestamps: { createdAt, updatedAt }
}
```

## 🛣️ API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `signup` | Register a new user |
| POST   | `/login`  | User login |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/books` | Add a new book (authenticated) |
| GET    | `/books` | Get all books with pagination |
| GET    | `/books/:id` | Get book details by ID |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/books/:id/reviews` | Submit a review (authenticated) |
| PUT    | `/api/reviews/:id` | Update a review (owner only) |
| DELETE | `/reviews/:id` | Delete a review (owner only) |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/search` | Search books by title or author |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/himanshik21/Book-Review-Backend.git
   cd book-review-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a .env file in the root directory**
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📝 Example API Requests

### 1. Authentication

#### 1.1 Signup
**Endpoint:** `POST /signup`

**Body (JSON):**
```json
{
  "username": "himanshi123",
  "email": "himanshi@example.com",
  "password": "securepassword"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/signup \
-H "Content-Type: application/json" \
-d '{"username": "himanshi123", "email": "himanshi@example.com", "password": "securepassword"}'
```

#### 1.2 Login
**Endpoint:** `POST /login`

**Body (JSON):**
```json
{
  "email": "himanshi@example.com",
  "password": "securepassword"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"email": "himanshi@example.com", "password": "securepassword"}'
```

### 2. Books

#### 2.1 Add a Book
**Endpoint:** `POST /books`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Body (JSON):**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "description": "Classic novel"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_token_here>" \
-d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "description": "Classic novel"}'
```

### 3. Reviews

#### 3.1 Add Review
**Endpoint:** `POST /books/:id/reviews`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Body (JSON):**
```json
{
  "rating": 5,
  "text": "Amazing book!"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/books/<bookId>/reviews \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_token_here>" \
-d '{"rating": 5, "text": "Amazing book!"}'
```

#### 3.2 Update Review
**Endpoint:** `PUT /reviews/:id`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Body (JSON):**
```json
{
  "rating": 4,
  "text": "Updated review"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/reviews/<reviewId> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_token_here>" \
-d '{"rating": 4, "text": "Updated review"}'
```

#### 3.3 Delete Review
**Endpoint:** `DELETE /api/reviews/:id`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/reviews/<reviewId> \
-H "Authorization: Bearer <your_token_here>"
```

### 4. Search Books

#### 4.1 Search by Title or Author
**Endpoint:** `GET /search?query=great`

**cURL:**
```bash
curl http://localhost:3000/search?query=great
```

## 🧩 Design Decisions and Assumptions

1. **Authentication**: JWT-based authentication was chosen for its stateless nature and scalability.
2. **Database**: MongoDB was selected for its flexibility with document-based data and ease of use with Node.js.
3. **Pagination**: Implemented for all listing endpoints to improve performance and UX.
4. **Error Handling**: Comprehensive error handling with descriptive messages for better debugging.
5. **Validation**: Input validation using Joi to ensure data integrity.
6. **One review per user per book**: Enforced by a compound index to maintain data quality.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
