# Team Task Manager - Developer Guide

## 📋 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

#### 1. Clone and Setup
```bash
# Navigate to project
cd Team\ Task\ Manager

# Install all dependencies
npm run install-all
```

#### 2. Configure Environments

**Backend (.env in server/)**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env in client/)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3. Seed Database (Optional)
```bash
cd server
npm run seed
```

This creates sample users, projects, tasks, and teams for testing.

#### 4. Start Development

**Option A: Separate Terminals**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

**Option B: Single Command**
```bash
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔐 Test Accounts (After Seeding)

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | password123 | Admin |
| jane@example.com | password123 | Member |
| bob@example.com | password123 | Member |
| alice@example.com | password123 | Member |

## 🏗️ Project Architecture

### Backend Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   ├── auth.js               # JWT authentication
│   └── roleCheck.js          # Role-based authorization
├── models/
│   ├── User.js               # User schema
│   ├── Project.js            # Project schema
│   ├── Task.js               # Task schema
│   └── Team.js               # Team schema
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── projectController.js  # Project operations
│   ├── taskController.js     # Task operations
│   ├── teamController.js     # Team operations
│   └── userController.js     # User operations
├── routes/
│   ├── auth.js               # Auth endpoints
│   ├── projects.js           # Project endpoints
│   ├── tasks.js              # Task endpoints
│   ├── teams.js              # Team endpoints
│   └── users.js              # User endpoints
├── utils/
│   └── helpers.js            # Helper functions
├── server.js                 # Express app entry
├── seed.js                   # Database seeding
└── package.json
```

### Frontend Structure

```
client/src/
├── components/
│   └── Header.js             # Navigation header
├── context/
│   └── AuthContext.js        # Global auth state
├── pages/
│   ├── Login.js              # Login page
│   ├── Signup.js             # Signup page
│   ├── Dashboard.js          # Dashboard page
│   ├── Projects.js           # Projects list page
│   ├── ProjectDetail.js      # Project detail page
│   └── Teams.js              # Teams page
├── services/
│   └── api.js                # Axios API client
├── styles/
│   ├── index.css             # Global styles
│   ├── header.css            # Header styles
│   ├── auth.css              # Auth pages styles
│   ├── dashboard.css         # Dashboard styles
│   ├── projects.css          # Projects styles
│   ├── project-detail.css    # Project detail styles
│   └── teams.css             # Teams styles
├── App.js                    # Main app & routing
└── index.js                  # React entry point
```

## 📚 API Reference

### Authentication

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Member"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Projects

#### Create Project
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description",
  "dueDate": "2026-06-01"
}
```

#### Get All Projects
```http
GET /api/projects
Authorization: Bearer {token}
```

Returns projects with task statistics and progress.

#### Get Project Details
```http
GET /api/projects/:id
Authorization: Bearer {token}
```

Returns project with all associated tasks.

#### Update Project
```http
PUT /api/projects/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "status": "Active",
  "description": "Updated description"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
Authorization: Bearer {token}
```

Cascades deletion to all associated tasks.

### Tasks

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task description",
  "projectId": "...",
  "priority": "High",
  "dueDate": "2026-05-15"
}
```

#### Get Tasks by Project
```http
GET /api/tasks/project/:projectId?status=Todo&priority=High
Authorization: Bearer {token}
```

Supports filtering by status and priority.

#### Get Assigned Tasks
```http
GET /api/tasks/assigned/my-tasks
Authorization: Bearer {token}
```

Returns tasks assigned to current user, grouped by status.

#### Get Dashboard Stats
```http
GET /api/tasks/dashboard/stats
Authorization: Bearer {token}
```

Returns overview statistics and overdue tasks.

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated title",
  "status": "In Progress",
  "priority": "Urgent",
  "assignedTo": "userId"
}
```

Automatically sets `completedAt` when status changes to "Done".

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {token}
```

### Teams

#### Create Team
```http
POST /api/teams
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Team Name",
  "description": "Team description"
}
```

#### Get All Teams
```http
GET /api/teams
Authorization: Bearer {token}
```

#### Get Team Details
```http
GET /api/teams/:id
Authorization: Bearer {token}
```

#### Add Team Member
```http
POST /api/teams/:teamId/members
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "...",
  "role": "Member"
}
```

#### Remove Team Member
```http
DELETE /api/teams/:teamId/members/:userId
Authorization: Bearer {token}
```

#### Update Team
```http
PUT /api/teams/:teamId
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Team Name",
  "description": "Updated description"
}
```

#### Delete Team
```http
DELETE /api/teams/:teamId
Authorization: Bearer {token}
```

### Users

#### Get All Users
```http
GET /api/users
```

Public endpoint - no authentication required.

#### Get User Profile
```http
GET /api/users/profile/:id
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/users/profile/update
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "profileImage": "https://..."
}
```

## 🐳 Docker Deployment

### Local Docker Development
```bash
docker-compose up
```

Services:
- MongoDB: localhost:27017
- Backend: localhost:5000
- Frontend: localhost:3000

### Docker Files

- **Dockerfile** - Backend Node.js image
- **client/Dockerfile** - Frontend React + Nginx image
- **nginx.conf** - Nginx reverse proxy configuration
- **docker-compose.yml** - Multi-container orchestration

## 🚀 Production Deployment

### Railway Backend Deployment

1. Create Railway account at railway.app
2. Connect GitHub repository
3. Set environment variables:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Strong random secret
   - `NODE_ENV` - Set to "production"
   - `PORT` - 5000

4. Deploy

### Vercel Frontend Deployment

```bash
cd client
npm run build
vercel --prod
```

Set environment variable:
- `REACT_APP_API_URL` - Railway backend URL

## 📊 Database Relationships

```
User
  ├─── owns ──→ Projects
  ├─── owns ──→ Teams
  ├─── assigned to ──→ Tasks
  └─── creates ──→ Tasks

Project
  ├─── has many ──→ Tasks
  └─── belongs to ──→ Teams

Task
  ├─── belongs to ──→ Project
  ├─── assigned to ──→ User
  └─── created by ──→ User

Team
  ├─── has many ──→ Members (Users)
  └─── has many ──→ Projects
```

## 🔒 Authentication Flow

1. **Signup/Login** - User provides credentials
2. **Password Hash** - Password hashed with bcryptjs (10 rounds)
3. **JWT Token** - Generated and returned to client
4. **Token Storage** - Client stores token in localStorage
5. **API Requests** - Token sent in Authorization header
6. **Verification** - Server validates token signature
7. **Authorization** - Role-based access control applied

## 🛠️ Development Commands

### Backend
```bash
cd server

npm install           # Install dependencies
npm run dev          # Start with nodemon
npm start            # Start production
npm run seed         # Seed database
npm test             # Run tests
```

### Frontend
```bash
cd client

npm install           # Install dependencies
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests
```

### Root
```bash
npm run install-all   # Install all dependencies
npm run dev          # Start both backend and frontend
npm run build        # Build frontend
npm run server       # Start backend only
npm run client       # Start frontend only
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB service is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP

### CORS Errors
- Verify backend is running on correct port
- Check FRONTEND_URL in backend .env
- Ensure REACT_APP_API_URL is correct in client .env

### Token Expired
- Clear browser localStorage
- Login again
- Check JWT_EXPIRE and JWT_SECRET

### Port Already in Use
```bash
# Kill process on port
lsof -ti:5000 | xargs kill -9  # Linux/Mac
netstat -ano | findstr :5000   # Windows (find PID then taskkill)
```

### npm Dependencies Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📝 Code Style Guidelines

### Backend
- Use async/await for asynchronous operations
- Use meaningful error messages
- Validate inputs server-side
- Use try-catch blocks
- Follow REST conventions

### Frontend
- Use functional components with hooks
- Use Context API for global state
- Keep components focused and small
- Use CSS modules where needed
- Handle loading and error states

## 🧪 Testing Features

1. Create account via Signup
2. Create a project
3. Add tasks with different priorities
4. Assign tasks to team members
5. Update task status through workflow
6. Create teams and add members
7. Check dashboard for statistics
8. Monitor overdue tasks

## 📄 License

MIT License - Free to use for personal and commercial projects

## 🤝 Support

For issues or questions:
1. Check this guide
2. Review API documentation
3. Check backend console for error logs
4. Inspect frontend browser console for errors

---

**Happy coding! 🚀**
