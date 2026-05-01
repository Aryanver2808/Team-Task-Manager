# Team Task Manager - Quick Reference Guide

## 🚀 Getting Started (5 Minutes)

### 1. Install & Setup
```bash
# Windows
install.bat

# Linux/Mac
bash install.sh

# Or manually
npm run install-all
```

### 2. Configure MongoDB
Choose one option:

**Option A: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/team-task-manager
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `server/.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/team-task-manager
```

### 3. Start Development
```bash
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📖 Documentation Map

| Document | Purpose | Read When |
|----------|---------|-----------|
| **README.md** | Project overview | Starting the project |
| **DEVELOPER_GUIDE.md** | API reference & development | Building features |
| **TESTING_GUIDE.md** | Testing checklist | Before deployment |
| **DEPLOYMENT_GUIDE.md** | Production setup | Ready to deploy |
| **This file** | Quick reference | Need quick answers |

---

## 🔐 Test Accounts

After running `npm run seed`:

```
Email: admin@example.com
Email: jane@example.com
Email: bob@example.com
Email: alice@example.com

Password: password123 (all accounts)
```

---

## 💻 Common Commands

### Development
```bash
npm run dev              # Start both backend & frontend
npm run server          # Backend only
npm run client          # Frontend only
```

### Backend
```bash
cd server
npm run dev             # Development with auto-reload
npm start               # Production mode
npm run seed            # Populate sample data
npm test                # Run tests
```

### Frontend
```bash
cd client
npm start               # Development server
npm run build           # Production build
npm test                # Run tests
```

### Database
```bash
cd server
npm run seed            # Add sample data
# MongoDB CLI (if installed):
mongosh mongodb://localhost:27017/team-task-manager
```

---

## 🗂️ Project Structure Quick View

```
├── server/              # Express.js backend
│   ├── config/         # MongoDB connection
│   ├── controllers/     # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & validation
│   └── seed.js         # Sample data
│
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # UI components
│   │   ├── context/    # State management
│   │   ├── services/   # API client
│   │   └── styles/     # CSS files
│   └── public/         # Static assets
│
└── docker-compose.yml  # Docker orchestration
```

---

## 🔌 API Quick Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication
```bash
# Signup
POST /auth/signup
{
  "name": "John",
  "email": "john@example.com",
  "password": "securepass"
}

# Login
POST /auth/login
{
  "email": "john@example.com",
  "password": "securepass"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John",
    "email": "john@example.com",
    "role": "Member"
  }
}
```

### Projects
```bash
# List projects
GET /projects

# Create project
POST /projects
{
  "name": "Website Redesign",
  "description": "New design"
}

# Get project
GET /projects/{id}

# Update project
PUT /projects/{id}

# Delete project
DELETE /projects/{id}
```

### Tasks
```bash
# Create task
POST /tasks
{
  "title": "Design homepage",
  "project": "projectId",
  "priority": "High",
  "dueDate": "2024-12-31"
}

# Get project tasks
GET /tasks/project/{projectId}

# Get my tasks
GET /tasks/assigned/my-tasks

# Update task
PUT /tasks/{id}

# Delete task
DELETE /tasks/{id}

# Get dashboard stats
GET /tasks/dashboard/stats
```

### Teams
```bash
# List teams
GET /teams

# Create team
POST /teams
{
  "name": "Frontend Team",
  "description": "UI developers"
}

# Get team
GET /teams/{id}

# Add member
POST /teams/{id}/members
{
  "userId": "userId",
  "role": "Developer"
}

# Remove member
DELETE /teams/{id}/members/{userId}
```

---

## 🐛 Troubleshooting Quick Fix

### Problem: Cannot connect to MongoDB
```
Solution:
1. Ensure MongoDB is running (local)
2. Check connection string in server/.env
3. Verify MongoDB Atlas IP whitelist (cloud)
4. Test connection: mongosh mongodb://...
```

### Problem: Port 5000 or 3000 already in use
```bash
# Kill process on port 5000 (Linux/Mac)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Problem: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: CORS errors
```
Check that:
1. Backend is running on correct port
2. Frontend API URL in .env matches backend
3. CORS middleware is configured
```

### Problem: Login fails
```
Check that:
1. User exists in database
2. Password is correct
3. MongoDB is connected
4. JWT_SECRET matches between requests
```

---

## 📊 Environment Variables

### Backend (`server/.env`)
```
PORT=5000                                          # Server port
NODE_ENV=development                              # development/production
MONGODB_URI=mongodb://localhost:27017/...         # Database connection
JWT_SECRET=your_secret_key_min_32_chars           # Auth token secret
JWT_EXPIRE=7d                                     # Token expiration
BCRYPT_ROUNDS=10                                  # Password hash rounds
FRONTEND_URL=http://localhost:3000               # Frontend origin
```

### Frontend (`client/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api     # Backend API URL
```

---

## 🚀 Next Steps

1. **Local Testing**
   - Run `npm run dev`
   - Create account
   - Create project
   - Add tasks
   - Test features

2. **Production Deployment**
   - Read DEPLOYMENT_GUIDE.md
   - Set up MongoDB Atlas
   - Deploy to Railway (backend)
   - Deploy to Vercel (frontend)

3. **Customization**
   - Modify project/task fields
   - Add new features
   - Style UI
   - Add integrations

---

## 📞 Help & Support

- Check README.md for overview
- See DEVELOPER_GUIDE.md for detailed API docs
- Review TESTING_GUIDE.md for testing help
- Follow DEPLOYMENT_GUIDE.md for deployment
- Check code comments in source files
- Review error messages in browser console & server logs

---

## ✅ Project Status

✅ Backend complete
✅ Frontend complete
✅ Database schemas defined
✅ API endpoints implemented
✅ Authentication working
✅ Docker configured
✅ Documentation complete
✅ Ready for production

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready
