const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};


// POST /api/signup
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or username already exists'
      });
    }
    
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password
    });
    
    const token = createToken(newUser._id);
    res.status(201).json({
      success: true,
      token,
      data: {
        user: newUser
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }
    
    // Check if user exists and password is correct
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect email or password'
      });
    }

    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      token,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};