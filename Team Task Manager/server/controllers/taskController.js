const Task = require('../models/Task');
const Project = require('../models/Project');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, priority, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({
        success: false,
        message: 'Title and project ID are required'
      });
    }

    // Verify project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      priority,
      dueDate,
      createdBy: req.user.id
    });

    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');
    await task.populate('project', 'name');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

// Get Tasks by Project
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, assignedTo, priority } = req.query;

    let filter = { project: projectId };

    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

// Get Assigned Tasks
exports.getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ dueDate: 1 });

    // Categorize tasks
    const tasksByStatus = {
      todo: tasks.filter(t => t.status === 'Todo'),
      inProgress: tasks.filter(t => t.status === 'In Progress'),
      inReview: tasks.filter(t => t.status === 'In Review'),
      done: tasks.filter(t => t.status === 'Done')
    };

    // Find overdue tasks
    const now = new Date();
    const overdue = tasks.filter(t => t.dueDate && t.dueDate < now && t.status !== 'Done');

    res.status(200).json({
      success: true,
      stats: {
        total: tasks.length,
        todo: tasksByStatus.todo.length,
        inProgress: tasksByStatus.inProgress.length,
        inReview: tasksByStatus.inReview.length,
        done: tasksByStatus.done.length,
        overdue: overdue.length
      },
      tasksByStatus,
      overdue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assigned tasks',
      error: error.message
    });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, priority, status, dueDate } = req.body;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Update completedAt if status changes to Done
    if (status === 'Done' && task.status !== 'Done') {
      task.completedAt = new Date();
    }

    task = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo, priority, status, dueDate },
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email').populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Tasks assigned to user
    const assignedTasks = await Task.find({ assignedTo: req.user.id });
    const overdue = assignedTasks.filter(t => 
      t.dueDate && t.dueDate < new Date() && t.status !== 'Done'
    );

    // Projects created by user
    const userProjects = await Project.find({ owner: req.user.id });

    // Tasks in user's projects
    const projectIds = userProjects.map(p => p._id);
    const projectTasks = await Task.find({ project: { $in: projectIds } });
    const completedProjectTasks = projectTasks.filter(t => t.status === 'Done');

    const stats = {
      assignedTasks: assignedTasks.length,
      completedTasks: assignedTasks.filter(t => t.status === 'Done').length,
      overdueTasks: overdue.length,
      projects: userProjects.length,
      projectTasks: projectTasks.length,
      completedProjectTasks: completedProjectTasks.length,
      projectCompletion: projectTasks.length > 0 
        ? Math.round((completedProjectTasks.length / projectTasks.length) * 100)
        : 0
    };

    res.status(200).json({
      success: true,
      stats,
      recentTasks: assignedTasks.slice(0, 5),
      overdueTasks: overdue.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};
