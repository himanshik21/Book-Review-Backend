const Joi = require('joi');

// User validation schemas
exports.signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Book validation schema
exports.bookSchema = Joi.object({
  title: Joi.string().max(200).required(),
  author: Joi.string().max(100).required(),
  genre: Joi.string().required(),
  publishedYear: Joi.number().integer().min(1).max(new Date().getFullYear()).required(),
  description: Joi.string().max(2000).required()
});

// Review validation schema
exports.reviewSchema = Joi.object({
  text: Joi.string().max(1000).required(),
  rating: Joi.number().min(1).max(5).required()
});