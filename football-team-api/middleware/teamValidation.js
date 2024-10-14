// middleware/teamValidation.js
const { check, validationResult } = require('express-validator');

exports.validateTeam = [
  check('name').notEmpty(),
  check('city').notEmpty(),
  check('stadium').notEmpty(),
  check('founded').isNumeric(),
  check('coach').notEmpty(),
  check('league').notEmpty(),
  check('players').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];