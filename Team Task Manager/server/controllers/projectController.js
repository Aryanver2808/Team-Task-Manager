const Project = require('../models/Project');
const Task = require('../models/Task');

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Project name is required'
      });
    }

    const project = await Project.create({
      name,
      description,
      dueDate,
      owner: req.user.id
    });

    await project.populate('owner', 'name email');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Get All Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id })
      .populate('owner', 'name email')
      .populate('teams')
      .sort({ createdAt: -1 });

    const projectsWithStats = await Promise.all(
      projects.map(async (project) => {
        const tasks = await Task.find({ project: project._id });
        const completedTasks = tasks.filter(t => t.status === 'Done');
        
        return {
          ...project.toObject(),
          taskStats: {
            total: tasks.length,
            completed: completedTasks.length,
            progress: tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0
          }
        };
      })
    );

    res.status(200).json({
      success: true,
      count: projectsWithStats.length,
      projects: projectsWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Get Single Project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('teams');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check authorization
    if (project.owner._id.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this project'
      });
    }

    const tasks = await Task.find({ project: project._id })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      project,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check authorization
    if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }

    const { name, description, status, dueDate } = req.body;

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, status, dueDate },
      { new: true, runValidators: true }
    ).populate('owner', 'name email');

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check authorization
    if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }

    // Delete all tasks associated with project
    await Task.deleteMany({ project: req.params.id });

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};
