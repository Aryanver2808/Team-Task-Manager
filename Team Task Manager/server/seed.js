require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Team = require('./models/Team');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await Team.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.insertMany([
      {
        name: 'John Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'Admin'
      },
      {
        name: 'Jane Developer',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'Member'
      },
      {
        name: 'Bob Designer',
        email: 'bob@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'Member'
      },
      {
        name: 'Alice Manager',
        email: 'alice@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'Member'
      }
    ]);
    console.log('Created 4 sample users');

    // Create sample projects
    const projects = await Project.insertMany([
      {
        name: 'Website Redesign',
        description: 'Complete redesign of company website with modern UI',
        owner: users[0]._id,
        status: 'Active',
        startDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'Mobile App Development',
        description: 'Build iOS and Android mobile application',
        owner: users[0]._id,
        status: 'Active',
        startDate: new Date(),
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'API Integration',
        description: 'Integrate third-party payment and analytics APIs',
        owner: users[1]._id,
        status: 'In Progress',
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Created 3 sample projects');

    // Create sample tasks
    const tasks = await Task.insertMany([
      {
        title: 'Design homepage mockup',
        description: 'Create responsive homepage design in Figma',
        project: projects[0]._id,
        assignedTo: users[2]._id,
        priority: 'High',
        status: 'In Progress',
        createdBy: users[0]._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Implement authentication',
        description: 'Set up user registration and login system',
        project: projects[0]._id,
        assignedTo: users[1]._id,
        priority: 'Urgent',
        status: 'Todo',
        createdBy: users[0]._id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Database schema design',
        description: 'Design database structure and relationships',
        project: projects[1]._id,
        assignedTo: users[1]._id,
        priority: 'High',
        status: 'Done',
        createdBy: users[0]._id,
        completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Create API endpoints',
        description: 'Develop RESTful API for mobile app',
        project: projects[1]._id,
        assignedTo: users[1]._id,
        priority: 'High',
        status: 'In Progress',
        createdBy: users[0]._id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Stripe integration',
        description: 'Integrate Stripe payment gateway',
        project: projects[2]._id,
        assignedTo: users[1]._id,
        priority: 'Medium',
        status: 'In Review',
        createdBy: users[1]._id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Setup analytics',
        description: 'Integrate Google Analytics and Mixpanel',
        project: projects[2]._id,
        assignedTo: users[3]._id,
        priority: 'Low',
        status: 'Todo',
        createdBy: users[1]._id,
        dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Overdue Design Review',
        description: 'This task is overdue and needs immediate attention',
        project: projects[0]._id,
        assignedTo: users[2]._id,
        priority: 'Urgent',
        status: 'Todo',
        createdBy: users[0]._id,
        dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Created 7 sample tasks');

    // Create sample teams
    const teams = await Team.insertMany([
      {
        name: 'Frontend Team',
        description: 'Web and UI development team',
        owner: users[0]._id,
        members: [
          { user: users[0]._id, role: 'Admin' },
          { user: users[2]._id, role: 'Member' },
          { user: users[3]._id, role: 'Member' }
        ],
        projects: [projects[0]._id]
      },
      {
        name: 'Backend Team',
        description: 'Server and API development team',
        owner: users[1]._id,
        members: [
          { user: users[1]._id, role: 'Admin' },
          { user: users[2]._id, role: 'Member' }
        ],
        projects: [projects[1]._id, projects[2]._id]
      },
      {
        name: 'Full Stack Team',
        description: 'Complete development team',
        owner: users[0]._id,
        members: [
          { user: users[0]._id, role: 'Admin' },
          { user: users[1]._id, role: 'Member' },
          { user: users[2]._id, role: 'Member' },
          { user: users[3]._id, role: 'Member' }
        ],
        projects: projects.map(p => p._id)
      }
    ]);
    console.log('Created 3 sample teams');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Email: admin@example.com | Password: password123');
    console.log('   Email: jane@example.com | Password: password123');
    console.log('   Email: bob@example.com | Password: password123');
    console.log('   Email: alice@example.com | Password: password123');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

connectDB().then(() => seedDatabase());
