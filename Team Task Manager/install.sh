#!/bin/bash

# Team Task Manager - Installation Script
# This script automates the setup of the entire application

set -e

echo "╔════════════════════════════════════════╗"
echo "║  Team Task Manager Installation       ║"
echo "║  MERN Full-Stack Application          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "🔍 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Check npm
echo "🔍 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm $(npm --version)"

# Check MongoDB
echo "🔍 Checking MongoDB..."
if ! command -v mongod &> /dev/null && ! command -v mongo &> /dev/null; then
    echo "⚠️  MongoDB not found locally"
    echo "   You can use MongoDB Atlas (cloud) or install locally"
    echo "   For now, proceeding with cloud MongoDB option..."
fi

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd server
npm install
echo "✅ Backend dependencies installed"

# Create backend .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ Backend .env created"
else
    echo "✅ Backend .env already exists"
fi

cd ..

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd client
npm install
echo "✅ Frontend dependencies installed"

# Create frontend .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
    echo "✅ Frontend .env created"
else
    echo "✅ Frontend .env already exists"
fi

cd ..

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ Installation Complete!            ║"
echo "╚════════════════════════════════════════╝"
echo ""

echo "📋 Next Steps:"
echo ""
echo "1. ⚙️  Configure MongoDB:"
echo "   - Local: Make sure MongoDB service is running"
echo "   - Cloud: Update MONGODB_URI in server/.env with MongoDB Atlas connection string"
echo ""
echo "2. 🚀 Start Development:"
echo "   npm run dev"
echo ""
echo "3. 🌐 Access Application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "4. 📊 (Optional) Seed Database:"
echo "   cd server && npm run seed"
echo ""
echo "5. 📚 Documentation:"
echo "   - DEVELOPER_GUIDE.md - API & development guide"
echo "   - TESTING_GUIDE.md - Testing instructions"
echo "   - DEPLOYMENT_GUIDE.md - Production deployment"
echo ""

echo "🎯 Happy coding! 🚀"
