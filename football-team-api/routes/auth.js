// routes/auth.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Register
router.post('/register', [
  check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  check('email').isEmail().withMessage('Email must be valid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('dateOfBirth').isISO8601().toDate().withMessage('Date of birth must be a valid date')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password, firstName, lastName, dateOfBirth } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      firstName,
      lastName,
      dateOfBirth
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', [
  check('email').isEmail(),
  check('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  // ... (find user and compare password logic)
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/logout', (req, res) => {
  // Handle logout for session-based authentication
  req.logout();
  res.json({ msg: 'Logged out' });
});

module.exports = router;