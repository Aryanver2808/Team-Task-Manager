# Team Task Manager - Getting Started Guide

Welcome to Team Task Manager! This comprehensive guide will help you get the application running in minutes.

## 🎯 What You Get

A **production-ready** full-stack MERN application with:
- ✅ Complete backend (Express + MongoDB)
- ✅ Complete frontend (React with routing)
- ✅ User authentication & authorization
- ✅ Project and task management
- ✅ Team collaboration features
- ✅ Dashboard with statistics
- ✅ Docker support
- ✅ Comprehensive documentation

## 📚 Documentation Guide

Choose your path based on your needs:

| Goal | Document | Time |
|------|----------|------|
| **Quick Start** | [QUICK_START.md](QUICK_START.md) | 5 min |
| **Install & Run** | See "Installation" below | 10 min |
| **Understand API** | [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) | 20 min |
| **Test Features** | [TESTING_GUIDE.md](TESTING_GUIDE.md) | 30 min |
| **Deploy Online** | [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | 60 min |

---

## 🚀 Installation (Choose One Method)

### Method 1: Automatic Installation (Recommended)

#### Windows
1. Click on `install.bat` 
2. Wait for installation to complete
3. Follow the on-screen instructions

#### Linux/Mac
```bash
bash install.sh
```

### Method 2: Manual Installation

#### Step 1: Install Dependencies
```bash
npm run install-all
```

#### Step 2: Setup Environment Variables

**Backend** - Create `server/.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Create `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### Step 3: Start Application
```bash
npm run dev
```

---

## 🗄️ MongoDB Setup

Choose **ONE** option:

### Option A: Local MongoDB (Easiest for Development)

**Windows**:
```bash
# Install MongoDB Community
# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Mac** (using Homebrew):
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux**:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Verify Connection**:
```bash
# Connection string should work:
mongodb://localhost:27017/team-task-manager
```

### Option B: MongoDB Atlas (Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Create database user (save credentials)
5. Whitelist your IP (or 0.0.0.0 for development)
6. Get connection string
7. Update `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager?retryWrites=true&w=majority
```

---

## 🏃 Running the Application

### Start Everything
```bash
npm run dev
```

This starts:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB connection (configured in .env)

### Start Separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

---

## 📝 Populate Sample Data (Optional)

After application is running:

```bash
cd server
npm run seed
```

This creates:
- 4 test users
- 3 sample projects
- 7 sample tasks
- 3 sample teams

**Test Accounts**:
| Email | Password | Role |
|-------|----------|------|
| admin@example.com | password123 | Admin |
| jane@example.com | password123 | Member |
| bob@example.com | password123 | Member |
| alice@example.com | password123 | Member |

---

## ✅ Verify Installation

### Check Backend
```bash
curl http://localhost:5000/api/auth/me
# Should return authentication error (expected)
```

### Check Frontend
Visit: http://localhost:3000
- Login page should load
- Try signup with test account

### Check Database
```bash
# If using local MongoDB
mongosh mongodb://localhost:27017/team-task-manager

# View collections
show collections

# Count users
db.users.countDocuments()
```

---

## 🎮 First Time Using the App

1. **Create Account**
   - Click "Sign Up"
   - Enter name, email, password
   - Click "Sign Up"

2. **Create Project**
   - Go to "Projects"
   - Click "Create New Project"
   - Enter project name and description
   - Click "Create"

3. **Create Task**
   - Click on project
   - Click "Add Task"
   - Enter task details
   - Set priority and due date
   - Click "Create Task"

4. **View Dashboard**
   - Click "Dashboard"
   - See statistics and progress
   - View all your assigned tasks

5. **Manage Teams**
   - Go to "Teams"
   - Create teams
   - Add team members

---

## 🐳 Docker Setup

### All-in-One Docker Deployment
```bash
docker-compose up
```

Starts:
- MongoDB (port 27017)
- Backend (port 5000)
- Frontend (port 3000)

### Stop Everything
```bash
docker-compose down
```

---

## 🔄 Common Development Tasks

### Update Dependencies
```bash
cd server && npm update && cd ..
cd client && npm update && cd ..
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

### Run Tests
```bash
cd server && npm test
cd client && npm test
```

### View Backend Logs
```bash
npm run server
# Shows detailed logs
```

### View Database
```bash
# Using MongoDB CLI (if installed)
mongosh mongodb://localhost:27017/team-task-manager

# Or use MongoDB Atlas web interface
```

---

## 🚨 Troubleshooting

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "Cannot connect to MongoDB"
```
1. Check MongoDB is running
2. Verify MONGODB_URI in server/.env
3. If using Atlas, check IP whitelist
4. Test: mongosh <your_connection_string>
```

### "Frontend shows blank page"
```
1. Check browser console for errors (F12)
2. Verify backend is running
3. Check REACT_APP_API_URL in client/.env
4. Clear browser cache
5. Restart frontend: npm run client
```

### "npm install fails"
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📋 Project Structure

```
Team Task Manager/
├── server/              # Express backend
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── controllers/     # Business logic
│   ├── middleware/     # Authentication
│   └── seed.js         # Sample data
│
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── context/    # State management
│   │   └── services/   # API client
│   └── Dockerfile
│
└── docs/               # Documentation
    ├── README.md
    ├── QUICK_START.md
    ├── DEVELOPER_GUIDE.md
    ├── TESTING_GUIDE.md
    └── DEPLOYMENT_GUIDE.md
```

---

## 🚀 Next Steps

### Ready to Code?
1. Review [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
2. Check API endpoints
3. Start building features

### Ready to Deploy?
1. Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Set up MongoDB Atlas
3. Deploy to Railway + Vercel

### Need Help?
- Check [QUICK_START.md](QUICK_START.md)
- Review code comments
- Check browser console (frontend)
- Check server logs (backend)

---

## 💡 Tips

1. **Development**: Keep `npm run dev` running in background
2. **Database**: Use MongoDB Atlas for cloud, local MongoDB for dev
3. **Code Changes**: Frontend auto-reloads, backend needs restart (use nodemon)
4. **Testing**: Test locally before deploying
5. **Git**: Commit .env.example, never commit .env

---

## 📞 Support

**Issue Checker**:
1. Read relevant documentation section
2. Check browser console (frontend issues)
3. Check server logs (backend issues)
4. Review code comments
5. Check error messages

**Learning Resources**:
- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [Node.js Docs](https://nodejs.org)

---

## ✨ You're Ready!

Your Team Task Manager is ready to use. Start with:

```bash
npm run dev
```

Then visit: http://localhost:3000

**Happy coding! 🚀**

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: ✅ Production Ready
