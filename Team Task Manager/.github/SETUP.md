# Team Task Manager - Setup Instructions

## Project Overview
Full-stack MERN application for managing team projects and tasks with role-based access control.

## Backend Setup

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (local or MongoDB Atlas)

### Installation
1. Navigate to server directory: `cd server`
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example` and configure:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/team-task-manager
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   ```
4. Start the server: `npm run dev`

Server will be available at `http://localhost:5000`

## Frontend Setup

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn

### Installation
1. Navigate to client directory: `cd client`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

Frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/project/:projectId` - Get project tasks
- `GET /api/tasks/assigned/my-tasks` - Get assigned tasks
- `GET /api/tasks/dashboard/stats` - Get dashboard statistics
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team details
- `POST /api/teams/:teamId/members` - Add member
- `DELETE /api/teams/:teamId/members/:userId` - Remove member
- `PUT /api/teams/:teamId` - Update team
- `DELETE /api/teams/:teamId` - Delete team

### Users
- `GET /api/users` - Get all users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/update` - Update profile

## Running with Docker

### Prerequisites
- Docker and Docker Compose

### Running
```bash
docker-compose up
```

- MongoDB: `localhost:27017`
- Backend: `localhost:5000`
- Frontend: `localhost:3000`

## Features Implemented

✅ User Authentication (JWT-based)
✅ Project Management (CRUD operations)
✅ Task Management with status tracking
✅ Team Management and member assignment
✅ Role-Based Access Control (Admin/Member)
✅ Dashboard with statistics
✅ Task filtering and status tracking
✅ Overdue task detection
✅ Progress tracking
✅ Responsive UI

## Project Structure

```
Team Task Manager/
├── server/                 # Backend (Express.js)
│   ├── config/            # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication & authorization
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   └── package.json       # Dependencies
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context API state
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   ├── styles/        # CSS styles
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json       # Dependencies
├── docker-compose.yml     # Docker configuration
├── Dockerfile             # Backend Docker image
└── README.md             # Project documentation
```

## Deployment to Railway

1. Push code to GitHub
2. Connect GitHub repo to Railway.app
3. Set environment variables in Railway dashboard:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Strong random secret
   - `NODE_ENV` - Set to "production"
4. Deploy backend service
5. For frontend, deploy to Vercel:
   ```bash
   cd client
   npm run build
   vercel --prod
   ```

## Testing

### Test Account Credentials
- Email: `test@example.com`
- Password: `password123`

Create a test account via the signup page first.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check MONGODB_URI in .env file
- For MongoDB Atlas, whitelist your IP

### CORS Issues
- Verify `FRONTEND_URL` in backend .env
- Check CORS middleware in server.js

### Token Expired
- Clear localStorage and login again
- Check JWT_EXPIRE and JWT_SECRET values

## Technology Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend**: React, React Router, Axios, Context API
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Styling**: CSS3

## Contributing

1. Create a feature branch
2. Make changes
3. Submit pull request

## License

MIT License
