const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Create project
router.post('/', projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get single project
router.get('/:id', projectController.getProject);

// Update project
router.put('/:id', projectController.updateProject);

// Delete project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
