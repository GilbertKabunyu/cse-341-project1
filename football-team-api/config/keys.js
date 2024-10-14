// config/keys.js
require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/football-api',
  secretOrKey: process.env.JWT_SECRET || 'me' 
};