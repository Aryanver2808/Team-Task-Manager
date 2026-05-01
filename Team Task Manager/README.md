# Team Task Manager

A full-stack MERN web application for managing team projects, tasks, and progress with role-based access control (Admin/Member). Track project status, assign tasks, monitor deadlines, and collaborate with your team.

**Demo**: Ready for production deployment on Railway + Vercel  
**Status**: ✅ Complete and tested

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure signup/login with JWT tokens
- Password hashing with bcryptjs
- Role-based access (Admin/Member)
- Protected routes

### 📋 Project Management
- Create/manage projects with status tracking
- Task progress visualization
- Project ownership and permissions

### ✅ Task Management
- Priority levels (Low/Medium/High/Urgent)
- Status workflow (Todo → In Progress → In Review → Done)
- Task assignment and due dates
- Overdue detection

### 👥 Team Management
- Create teams and manage members
- Role-based permissions
- Team project organization

### 📊 Dashboard
- Task statistics
- Project progress
- Overdue alerts
- Completion metrics

## �️ Tech Stack

### Backend
- **Node.js + Express.js** - Server framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password security

### Frontend
- **React 18** - UI library
- **Context API** - State management
- **Axios** - HTTP client
- **CSS3** - Styling

### DevOps
- **Docker** - Containerization
- **Railway** - Backend hosting
- **Vercel** - Frontend hosting

## 🚀 Getting Started

### BaQuick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# 1. Install all dependencies
npm run install-all

# 2. Setup environment variables (see below)

# 3. Start development
npm run dev
```

### Environment Setup

**Backend** (`server/.env`)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`client/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Seed Sample Data
```bash
cd server
npm run seed
```

**Test Accounts:**
```Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get details
- `PUT /api/projects/:id` - Update
- `DELETE /api/projects/:id` - Delete

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/project/:id` - List project tasks
- `GET /api/tasks/assigned/my-tasks` - My tasks
- `GET /api/tasks/dashboard/stats` - Dashboard stats
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Teams
- `GET /api/teams` - List teams
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team
- `POST /api/teams/:id/members` - Add member
- `DELETE /api/teams/:id/members/:uid` - Remove member
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

**Full API Docs**: See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/update` - Update profile

## 🚢 Deployment

### Railway Deployment

1. Create a Railway account at railway.app
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

4. Deploy frontend to Vercel:
   ```bash
   cd client
   npm run build
   vercel --prod
   ```

## 📝 Notes

- Database relationships are properly managed with Mongoose
- ValiCommands

```bash
# Install all dependencies
npm run install-all

# Development (both backend & frontend)
npm run dev
✅ Features Implemented

- ✅ User authentication (signup/login)
- ✅ Project management (CRUD)
- ✅ Task management with priorities
- ✅ Task status workflow
- ✅ Team management
- ✅ Role-based access control
- ✅ Dashboard with statistics
- ✅ Overdue task detection
- ✅ Password hashing (bcryptjs)
- ✅ JWT token authentication
- ✅ Database relationships
- ✅ Docker support
- ✅ Production ready
- ✅ Comprehensive documentation

## 🐛 Support

**Having issues?**

1. Check [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for API docs
2. See [TESTING_GUIDE.md](TESTING_GUIDE.md) for troubleshooting
3. Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for deploy issues

## 📄 License

MIT - Free for personal and commercial use run server

# Frontend only
npm run client

# Build frontend
npm run build

# Backend specific
cd server
npm run dev       # Development
npm start         # Production
npm run seed      # Populate database

# Frontend specific
cd client
npm start         # Development
npm run build     # Production build
```
MIT
