const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a team name'],
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
    members: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }],
    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
