# Team Task Manager - Copilot Instructions

## Project Summary
Full-stack MERN web application for managing team projects, tasks, and progress with role-based access control (Admin/Member).

## Technology Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Frontend**: React 18, React Router, Axios, Context API
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Railway (backend), Vercel (frontend)
- **Authentication**: JWT-based with bcryptjs password hashing

## Key Features Implemented
- ✅ User authentication (Signup/Login with JWT)
- ✅ Project management (CRUD operations)
- ✅ Task creation and assignment
- ✅ Status tracking (Todo, In Progress, In Review, Done)
- ✅ Team management with role-based access
- ✅ Dashboard with statistics and progress tracking
- ✅ Overdue task detection
- ✅ Role-Based Access Control (Admin/Member)
- ✅ Responsive UI with CSS styling

## Project Structure
```
Team Task Manager/
├── server/                 # Backend (Express.js)
│   ├── config/db.js       # MongoDB connection
│   ├── middleware/        # Auth & role check middleware
│   ├── models/            # Mongoose schemas (User, Project, Task, Team)
│   ├── controllers/        # Business logic
│   ├── routes/            # API endpoints
│   ├── server.js          # Main entry point
│   └── package.json
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # Header, Layout components
│   │   ├── context/       # AuthContext for state management
│   │   ├── pages/         # Login, Signup, Dashboard, Projects, Teams
│   │   ├── services/      # API client with axios
│   │   ├── styles/        # CSS modules
│   │   ├── App.js         # Main app with routing
│   │   └── index.js       # React entry point
│   └── package.json
├── docker-compose.yml     # Local development setup
├── Dockerfile             # Backend Docker image
├── Procfile              # Railway deployment config
├── README.md             # Project documentation
└── .github/
    └── SETUP.md          # Detailed setup instructions
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Project Endpoints
- `GET /api/projects` - Get all user projects with task stats
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details with tasks
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project (cascades to tasks)

### Task Endpoints
- `POST /api/tasks` - Create task in a project
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `GET /api/tasks/assigned/my-tasks` - Get user's assigned tasks
- `GET /api/tasks/dashboard/stats` - Get dashboard statistics
- `PUT /api/tasks/:id` - Update task status/details
- `DELETE /api/tasks/:id` - Delete task

### Team Endpoints
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team details
- `POST /api/teams/:teamId/members` - Add member to team
- `DELETE /api/teams/:teamId/members/:userId` - Remove member
- `PUT /api/teams/:teamId` - Update team
- `DELETE /api/teams/:teamId` - Delete team

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/update` - Update user profile

## Database Schema

### User
- name (string, required)
- email (string, required, unique)
- password (string, hashed with bcrypt)
- role (enum: Admin/Member)
- profileImage (string, optional)
- timestamps

### Project
- name (string, required)
- description (string)
- owner (ref: User)
- teams (array of Team refs)
- status (enum: Active/Completed/On Hold)
- startDate, dueDate (dates)
- timestamps

### Task
- title (string, required)
- description (string)
- project (ref: Project, required)
- assignedTo (ref: User)
- priority (enum: Low/Medium/High/Urgent)
- status (enum: Todo/In Progress/In Review/Done)
- dueDate (date)
- completedAt (date)
- createdBy (ref: User, required)
- timestamps

### Team
- name (string, required)
- description (string)
- owner (ref: User, required)
- members (array with user ref and role)
- projects (array of Project refs)
- timestamps

## Security Features
- JWT-based authentication with token expiration
- Password hashing with bcryptjs (10 rounds)
- Role-based access control middleware
- Input validation on signup/login
- Authorization checks on protected routes
- MongoDB indexes for query optimization

## Environment Variables Required

### Backend (.env in server/)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env in client/)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Local Development
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm start
```

### With Docker
```bash
docker-compose up
```

### Production Deployment (Railway)
1. Push to GitHub
2. Connect repo to Railway
3. Set environment variables
4. Deploy backend service
5. Deploy frontend to Vercel

## Development Guidelines

- Follow REST API conventions
- Use proper HTTP status codes
- Validate all inputs server-side
- Log errors appropriately
- Use meaningful commit messages
- Test major features before deployment

## Known Limitations
- No real-time notifications (future enhancement)
- No file upload for attachments (can be added)
- No comments on tasks (can be added)
- Single email template (can be expanded)

## Future Enhancements
- Real-time updates with WebSocket
- Task comments and discussion
- Email notifications
- File attachments
- Advanced filtering and search
- Gantt chart for projects
- Team collaboration features
- Activity logging

## Testing
Create a test account via signup, then use dashboard to test features:
1. Create a project
2. Create tasks in the project
3. Assign tasks to team members
4. Track progress through status changes
5. Monitor overdue tasks on dashboard

## Support & Documentation
- Detailed API documentation in `.github/SETUP.md`
- README.md for quick start
- Code comments throughout codebase
- Environment variable examples in `.env.example` files

## Maintenance
- Regular dependency updates: `npm update`
- MongoDB backups before major changes
- Error monitoring in production
- Performance monitoring
- Security patches promptly
