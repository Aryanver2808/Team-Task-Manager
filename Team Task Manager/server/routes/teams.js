const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Create team
router.post('/', teamController.createTeam);

// Get all teams
router.get('/', teamController.getAllTeams);

// Get single team
router.get('/:id', teamController.getTeam);

// Add member to team
router.post('/:teamId/members', teamController.addMember);

// Remove member from team
router.delete('/:teamId/members/:userId', teamController.removeMember);

// Update team
router.put('/:teamId', teamController.updateTeam);

// Delete team
router.delete('/:teamId', teamController.deleteTeam);

module.exports = router;
