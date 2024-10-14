// routes/team.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateTeam } = require('../middleware/teamValidation');
const TeamController = require('../controllers/teamController');

// Get all teams
router.get('/', TeamController.getTeams);

// Create a team
router.post('/', passport.authenticate('jwt', { session: false }), validateTeam, TeamController.createTeam);

// Update a team
router.put('/:id', passport.authenticate('jwt', { session: false }), validateTeam, TeamController.updateTeam);

// Delete a team
router.delete('/:id', passport.authenticate('jwt', { session: false }), TeamController.deleteTeam);

module.exports = router;