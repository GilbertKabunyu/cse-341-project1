// middleware/authValidation.js
const { check, validationResult } = require('express-validator');

// Validation rules for user registration
exports.validateRegistration = [
  check('username')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .isAlphanumeric().withMessage('Username must be alphanumeric'),
  check('email')
    .isEmail().withMessage('Email must be valid'),
  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('firstName')
    .notEmpty().withMessage('First name is required'),
  check('lastName')
    .notEmpty().withMessage('Last name is required'),
  check('dateOfBirth')
    .isISO8601().toDate().withMessage('Date of birth must be a valid date')
];

// Validation rules for user login
exports.validateLogin = [
  check('email')
    .isEmail().withMessage('Email must be valid'),
  check('password')
    .exists().withMessage('Password is required')
];

// Middleware to handle validation results
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};