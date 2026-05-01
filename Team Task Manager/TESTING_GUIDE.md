# Team Task Manager - Testing Guide

## 🧪 Pre-Deployment Testing Checklist

### 1. Environment Setup
- [ ] MongoDB is installed and running
- [ ] Node.js 16+ is installed
- [ ] All dependencies installed (`npm run install-all`)
- [ ] .env files configured for both backend and frontend
- [ ] Backend can start (`npm run dev` in server folder)

### 2. Backend API Testing

#### Authentication Tests
```bash
# Test Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Test Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Current User (requires token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Project Tests
```bash
# Get all projects
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Project",
    "description": "A test project"
  }'
```

#### Task Tests
```bash
# Get dashboard stats
curl -X GET http://localhost:5000/api/tasks/dashboard/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get assigned tasks
curl -X GET http://localhost:5000/api/tasks/assigned/my-tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Task",
    "description": "A test task",
    "projectId": "PROJECT_ID",
    "priority": "High"
  }'
```

### 3. Frontend Testing

#### User Flow Testing
1. **Signup/Login**
   - [ ] Navigate to signup page
   - [ ] Create a new account
   - [ ] Verify email validation works
   - [ ] Verify password validation (min 6 chars)
   - [ ] Login with created account
   - [ ] Logout functionality works

2. **Dashboard Testing**
   - [ ] Dashboard loads without errors
   - [ ] Statistics cards display correctly
   - [ ] Progress bars show correct percentage
   - [ ] Overdue task count is accurate

3. **Project Management**
   - [ ] Create new project
   - [ ] Project appears in list
   - [ ] View project details
   - [ ] Update project name/description
   - [ ] Delete project (confirm dialog appears)
   - [ ] Progress bar updates when tasks change

4. **Task Management**
   - [ ] Create task in project
   - [ ] Set task priority
   - [ ] Set task due date
   - [ ] Update task status (Todo → In Progress → In Review → Done)
   - [ ] Task completion date is set when marked Done
   - [ ] Delete task

5. **Team Management**
   - [ ] Create new team
   - [ ] Team appears in list
   - [ ] View team members
   - [ ] Update team info
   - [ ] Delete team

6. **UI/UX Testing**
   - [ ] All pages are responsive
   - [ ] Navigation works correctly
   - [ ] Error messages display properly
   - [ ] Loading states show
   - [ ] Buttons are functional
   - [ ] Forms validate inputs

### 4. Database Testing

#### Test with Sample Data
```bash
cd server
npm run seed
```

Verify in MongoDB:
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/team-task-manager

# Check collections
db.users.find().pretty()
db.projects.find().pretty()
db.tasks.find().pretty()
db.teams.find().pretty()
```

### 5. Integration Testing

#### End-to-End Flow
1. **User Registration & Login**
   - Create new account
   - Login successfully
   - Verify token is stored

2. **Create Project & Tasks**
   - Create a new project
   - Add multiple tasks with different priorities
   - Assign tasks to self
   - Update task statuses

3. **Team Creation**
   - Create a new team
   - Add team members
   - Create project for team
   - Verify team access

4. **Dashboard Verification**
   - Check all stats are correct
   - Verify overdue tasks appear
   - Check progress calculations

### 6. Error Handling Testing

#### Test Error Cases
- [ ] Invalid email format on signup
- [ ] Duplicate email on signup
- [ ] Wrong password on login
- [ ] Missing required fields
- [ ] Network error handling
- [ ] Invalid token handling
- [ ] Token expiration

### 7. Performance Testing

#### Load Testing
```bash
# Test with concurrent requests
# (Using a tool like Apache Bench)
ab -n 100 -c 10 http://localhost:5000/api/projects
```

#### Response Time Checks
- [ ] API response < 500ms for simple queries
- [ ] Frontend page load < 3 seconds
- [ ] Dashboard stats load quickly

### 8. Browser Compatibility Testing

Test on:
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Mobile browsers

### 9. Security Testing

- [ ] Passwords are hashed in database
- [ ] JWT token is required for protected routes
- [ ] Users can only access their own data
- [ ] Admin can perform admin functions
- [ ] No sensitive data in localStorage except token
- [ ] CORS is properly configured
- [ ] Input validation on server-side

### 10. Mobile Responsiveness Testing

- [ ] Header is responsive
- [ ] Navigation works on mobile
- [ ] Forms are mobile-friendly
- [ ] Cards stack properly
- [ ] No horizontal scrolling
- [ ] Buttons are touch-friendly

## 🚀 Deployment Testing

### Before Railway Deployment
- [ ] All tests pass
- [ ] Build completes without errors
- [ ] No console errors in browser
- [ ] All environment variables configured
- [ ] MongoDB Atlas connection string tested

### After Railway Deployment
- [ ] Backend API is accessible
- [ ] Authentication works
- [ ] Database operations work
- [ ] All endpoints are accessible

### Before Vercel Deployment
- [ ] Frontend builds without errors
- [ ] API_URL points to Railway backend
- [ ] All pages load correctly
- [ ] Navigation works

### After Vercel Deployment
- [ ] Frontend is accessible
- [ ] API calls work to Railway backend
- [ ] Authentication works
- [ ] All features functional

## 📊 Test Results Template

```markdown
# Test Results - [Date]

## Backend
- [ ] Server starts successfully
- [ ] Database connects
- [ ] All endpoints respond
- [ ] Authentication works
- [ ] Authorization works

## Frontend
- [ ] No build errors
- [ ] No console errors
- [ ] All pages load
- [ ] All features work
- [ ] Responsive design works

## Integration
- [ ] Full user flow works
- [ ] Data persists correctly
- [ ] Real-time updates work

## Performance
- [ ] API response time: < 500ms
- [ ] Page load time: < 3s
- [ ] No memory leaks

## Security
- [ ] All sensitive data protected
- [ ] CORS configured
- [ ] Input validation works
- [ ] Authentication secure

## Status: ✅ PASSED / ❌ FAILED

Tested by: [Name]
Date: [Date]
Notes: [Any issues found]
```

## 🐛 Common Issues & Solutions

### Backend Issues
| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check MongoDB is running, verify URI |
| Port 5000 in use | Kill process: `lsof -ti:5000 \| xargs kill -9` |
| Module not found | Run `npm install` |
| Token invalid | Clear localStorage, login again |

### Frontend Issues
| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for errors |
| API call fails | Verify backend is running, check API_URL |
| CORS error | Check backend CORS config |
| Build fails | Delete node_modules, reinstall |

## ✅ Testing Checklist Summary

Use this for final verification before production:

- [ ] **Code Quality**
  - [ ] No console errors
  - [ ] No ESLint warnings
  - [ ] Code is formatted
  - [ ] Comments where needed

- [ ] **Functionality**
  - [ ] All features work
  - [ ] No broken links
  - [ ] Forms validate
  - [ ] Error handling works

- [ ] **Performance**
  - [ ] App loads quickly
  - [ ] No memory leaks
  - [ ] API responds fast
  - [ ] Smooth animations

- [ ] **Security**
  - [ ] Passwords hashed
  - [ ] Auth enforced
  - [ ] Data validated
  - [ ] No exposed secrets

- [ ] **Deployment**
  - [ ] Environment configured
  - [ ] Database ready
  - [ ] SSL certificate ready
  - [ ] Backup plan ready

---

**Ready for production when all items are checked! ✅**
