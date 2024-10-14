// models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  stadium: { type: String, required: true },
  founded: { type: Number, required: true },
  championships: { type: Number, default: 0 },
  coach: { type: String, required: true },
  league: { type: String, require: true},
  players: [{ type: String }] // Array of player names
});

module.exports = mongoose.model('team', teamSchema);