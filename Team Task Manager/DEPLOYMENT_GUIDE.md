# Team Task Manager - Deployment Guide

## 🚀 Complete Deployment Instructions

### Prerequisites for Deployment
- GitHub account with repository
- Railway.app account (https://railway.app)
- Vercel account (https://vercel.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- Domain name (optional)

---

## 📦 Part 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Click "Create a Deployment"
4. Choose "Free" tier
5. Select region closest to your users
6. Create cluster (wait 5-10 minutes)

### Step 2: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Enter username: `taskmanager`
4. Choose "Autogenerate Secure Password"
5. Save password securely
6. Click "Add User"

### Step 3: Whitelist IPs

1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for simplicity)
4. Click "Confirm"

### Step 4: Get Connection String

1. Click "Clusters" → "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<username>` and `<password>` with your credentials
5. Replace `myFirstDatabase` with `team-task-manager`

Example:
```
mongodb+srv://taskmanager:PASSWORD@cluster0.xxxxx.mongodb.net/team-task-manager?retryWrites=true&w=majority
```

---

## 🚂 Part 2: Railway Backend Deployment

### Step 1: Prepare Repository

```bash
# Make sure everything is committed
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select your Team Task Manager repository
6. Railway auto-detects Node.js backend

### Step 3: Configure Environment Variables

In Railway Dashboard:

1. Go to "Variables" section
2. Add environment variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://taskmanager:PASSWORD@cluster0.xxxxx.mongodb.net/team-task-manager?retryWrites=true&w=majority
JWT_SECRET=your_very_secret_key_min_32_chars_long_12345
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Important**: Use strong JWT_SECRET (32+ characters, mix of letters, numbers, symbols)

### Step 4: Configure Build Settings

1. Click on the service
2. Go to "Settings"
3. Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `npm start`

### Step 5: Deploy

1. Railway automatically deploys on push
2. Wait for deployment to complete
3. Get the public URL (e.g., `https://name-production.up.railway.app`)
4. Test API endpoint: `https://name-production.up.railway.app/api/auth/me`

---

## 🎨 Part 3: Vercel Frontend Deployment

### Step 1: Build Frontend

```bash
cd client
npm run build
```

### Step 2: Deploy to Vercel

**Option A: Git Integration (Recommended)**

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select GitHub repository
5. Configure:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add Environment Variables:
```
REACT_APP_API_URL=https://your-railway-url.up.railway.app/api
```

7. Click "Deploy"

**Option B: Deploy via CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel --prod

# Configure environment variables
vercel env add REACT_APP_API_URL
# Enter your Railway backend URL
```

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-10 minutes)

---

## 🔗 Part 4: Connect Frontend to Backend

### Update API URL

After deployment:

1. Get Railway backend URL: `https://xxx-production.up.railway.app`
2. In Vercel, go to project settings
3. Environment Variables
4. Update `REACT_APP_API_URL` to: `https://xxx-production.up.railway.app/api`
5. Redeploy

---

## 🧪 Testing Deployment

### Test Backend

```bash
# Get current user
curl -X GET https://your-railway-url/api/auth/me \
  -H "Authorization: Bearer your_jwt_token"

# Get projects
curl -X GET https://your-railway-url/api/projects \
  -H "Authorization: Bearer your_jwt_token"
```

### Test Frontend

1. Go to your Vercel domain
2. Try signup with email
3. Login
4. Create project
5. Create task
6. Check dashboard

---

## 🔄 Continuous Integration Setup

### Automatic Deployment on Git Push

#### Railway
- Automatically deploys on push to main branch
- No configuration needed

#### Vercel
- Automatically deploys on push to main branch (if connected via Git)
- Create deployments for pull requests

---

## 📊 Monitoring & Logs

### Railway Logs

1. Dashboard → Your Project
2. Click on backend service
3. "Logs" tab shows real-time logs
4. Check for errors

```
npm run dev  # Shows development logs
```

### Vercel Analytics

1. Dashboard → Your Project
2. "Analytics" tab
3. See performance metrics
4. View error logs

---

## 🔐 Security Checklist

- [ ] Uploaded `.env` files (never commit)
- [ ] Used strong JWT_SECRET
- [ ] Whitelisted MongoDB IP
- [ ] Set `NODE_ENV=production` on Railway
- [ ] Disabled debug mode in production
- [ ] Used HTTPS only
- [ ] Set CORS_ORIGIN to Vercel domain
- [ ] Created admin user in production

---

## 💾 Database Backup

### MongoDB Atlas Backup

1. Go to MongoDB Atlas
2. Click "Backup" tab
3. Enable automatic backups
4. Set backup frequency (daily recommended)
5. Test restore process

---

## 🐛 Troubleshooting Deployment

### Railway Backend Issues

**Issue**: App crashes after deploy
```
Solution:
1. Check logs for error
2. Verify MONGODB_URI is correct
3. Ensure all env variables are set
4. Check file permissions
```

**Issue**: Cannot connect to MongoDB
```
Solution:
1. Verify connection string
2. Check MongoDB Atlas IP whitelist
3. Test connection locally first
```

**Issue**: API endpoints return 404
```
Solution:
1. Check railway URL matches backend routes
2. Verify server.js is configured correctly
3. Check root directory is set to 'server'
```

### Vercel Frontend Issues

**Issue**: Blank page or cannot connect to API
```
Solution:
1. Check REACT_APP_API_URL is set
2. Verify backend is running
3. Check browser console for CORS errors
4. Redeploy after env var change
```

**Issue**: Old code showing after deploy
```
Solution:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Do hard refresh (Ctrl+F5)
3. Check Vercel deployment is successful
```

**Issue**: Images or assets not loading
```
Solution:
1. Check public folder in client
2. Verify build includes assets
3. Check file paths are correct
```

---

## 📈 Performance Optimization

### Backend Optimization

```javascript
// Add compression
const compression = require('compression');
app.use(compression());

// Add request timeout
app.use((req, res, next) => {
  req.setTimeout(30000);
  next();
});
```

### Frontend Optimization

```bash
# Build with analysis
npm run build -- --analyze

# Lazy load routes
React.lazy(() => import('./pages/Dashboard'))
```

---

## 🔄 Updates & Maintenance

### Deploy Updates

```bash
# Make changes locally
git add .
git commit -m "Update features"
git push origin main

# Railway auto-deploys
# Vercel auto-deploys (if Git connected)
```

### Database Migration

```bash
# Backup before migration
# In MongoDB Atlas: Backup → Create Backup

# Run migration script
node server/migrations/migrate.js

# Verify data
mongosh mongodb://...
db.users.find().count()
```

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update safely
npm update

# Or update specific package
npm install package@latest

# Test before deploying
npm run dev

# Commit and push
git push origin main
```

---

## 📞 Support Resources

### Official Documentation
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Express: https://expressjs.com
- React: https://react.dev

### Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# View Railway logs
railway logs

# View Vercel build logs
vercel logs

# Run production server locally
NODE_ENV=production npm start
```

---

## ✅ Final Checklist

- [ ] **Backend**
  - [ ] Deployed to Railway
  - [ ] MongoDB connected
  - [ ] All env variables set
  - [ ] API endpoints working
  - [ ] CORS configured

- [ ] **Frontend**
  - [ ] Deployed to Vercel
  - [ ] API URL configured
  - [ ] Build successful
  - [ ] All pages loading
  - [ ] Features working

- [ ] **Database**
  - [ ] MongoDB Atlas ready
  - [ ] Backups enabled
  - [ ] Data imported
  - [ ] Connection tested

- [ ] **Monitoring**
  - [ ] Logs accessible
  - [ ] Error tracking setup
  - [ ] Performance monitoring
  - [ ] Alert configured

- [ ] **Security**
  - [ ] HTTPS enforced
  - [ ] Secrets not exposed
  - [ ] CORS properly configured
  - [ ] Auth working

---

## 🎉 You're Done!

Your Team Task Manager is now live!

### Access Your Application
- **Frontend**: https://your-domain.vercel.app
- **Backend API**: https://your-railway-url/api
- **Admin Panel**: (Not implemented, but can add)

### Next Steps
1. Create admin user account
2. Invite team members
3. Set up teams and projects
4. Start managing tasks!

---

**Need help? Check troubleshooting or review official documentation.**
