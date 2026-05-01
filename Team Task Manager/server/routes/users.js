const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Get all users (public)
router.get('/', userController.getAllUsers);

router.use(authMiddleware);

// Get user profile
router.get('/profile/:id', userController.getUserProfile);

// Update profile
router.put('/profile/update', userController.updateProfile);

module.exports = router;
