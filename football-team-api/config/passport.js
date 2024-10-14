// config/passport.js
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const User = require('../models/User'); // Adjust the path as necessary
const keys = require('./keys');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from authorization header
  secretOrKey: keys.secretOrKey // Secret key for verifying the token
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id); // Find user by ID in the token payload
      if (user) {
        return done(null, user); // User found, authentication successful
      }
      return done(null, false); // User not found
    } catch (err) {
      return done(err, false); // Error occurred during the process
    }
  }));
};