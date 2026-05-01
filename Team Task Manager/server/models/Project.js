const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a project name'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }],
    status: {
      type: String,
      enum: ['Active', 'Completed', 'On Hold'],
      default: 'Active'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
