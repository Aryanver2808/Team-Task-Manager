const Team = require('../models/Team');
const User = require('../models/User');

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Team name is required'
      });
    }

    const team = await Team.create({
      name,
      description,
      owner: req.user.id,
      members: [{
        user: req.user.id,
        role: 'Admin'
      }]
    });

    await team.populate('owner', 'name email');
    await team.populate('members.user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating team',
      error: error.message
    });
  }
};

// Get All Teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('owner', 'name email')
      .populate('members.user', 'name email')
      .populate('projects', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      teams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message
    });
  }
};

// Get Team
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members.user', 'name email')
      .populate('projects', 'name');

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    res.status(200).json({
      success: true,
      team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message
    });
  }
};

// Add Member to Team
exports.addMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId, role } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if user is team admin
    const isAdmin = team.members.some(m => 
      m.user.toString() === req.user.id && m.role === 'Admin'
    );

    if (!isAdmin && team.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only team admin can add members'
      });
    }

    // Check if member already exists
    const memberExists = team.members.some(m => m.user.toString() === userId);
    if (memberExists) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this team'
      });
    }

    // Add member
    team.members.push({
      user: userId,
      role: role || 'Member'
    });

    await team.save();
    await team.populate('members.user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Member added successfully',
      team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding member',
      error: error.message
    });
  }
};

// Remove Member from Team
exports.removeMember = async (req, res) => {
  try {
    const { teamId, userId } = req.params;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if user is team admin
    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only team owner can remove members'
      });
    }

    // Remove member
    team.members = team.members.filter(m => m.user.toString() !== userId);

    await team.save();
    await team.populate('members.user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Member removed successfully',
      team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing member',
      error: error.message
    });
  }
};

// Update Team
exports.updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, description } = req.body;

    let team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if user is team owner
    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only team owner can update team'
      });
    }

    team = await Team.findByIdAndUpdate(
      teamId,
      { name, description },
      { new: true, runValidators: true }
    ).populate('owner', 'name email').populate('members.user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Team updated successfully',
      team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating team',
      error: error.message
    });
  }
};

// Delete Team
exports.deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if user is team owner
    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only team owner can delete team'
      });
    }

    await Team.findByIdAndDelete(teamId);

    res.status(200).json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team',
      error: error.message
    });
  }
};
