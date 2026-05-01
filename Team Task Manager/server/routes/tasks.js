const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Create task
router.post('/', taskController.createTask);

// Get tasks by project
router.get('/project/:projectId', taskController.getTasksByProject);

// Get assigned tasks
router.get('/assigned/my-tasks', taskController.getAssignedTasks);

// Get dashboard stats
router.get('/dashboard/stats', taskController.getDashboardStats);

// Update task
router.put('/:id', taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
