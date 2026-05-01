@echo off
REM Team Task Manager - Installation Script for Windows
REM This script automates the setup of the entire application

echo.
echo ╔════════════════════════════════════════╗
echo ║  Team Task Manager Installation       ║
echo ║  MERN Full-Stack Application          ║
echo ╚════════════════════════════════════════╝
echo.

REM Check Node.js
echo 🔍 Checking Node.js...
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js %%i

REM Check npm
echo 🔍 Checking npm...
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo ✅ npm %%i

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

REM Create backend .env if not exists
if not exist .env (
    echo 📝 Creating backend .env file...
    (
        echo PORT=5000
        echo NODE_ENV=development
        echo MONGODB_URI=mongodb://localhost:27017/team-task-manager
        echo JWT_SECRET=your_super_secret_jwt_key_change_in_production
        echo JWT_EXPIRE=7d
        echo BCRYPT_ROUNDS=10
        echo FRONTEND_URL=http://localhost:3000
    ) > .env
    echo ✅ Backend .env created
) else (
    echo ✅ Backend .env already exists
)

cd ..

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

REM Create frontend .env if not exists
if not exist .env (
    echo 📝 Creating frontend .env file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
    ) > .env
    echo ✅ Frontend .env created
) else (
    echo ✅ Frontend .env already exists
)

cd ..

echo.
echo ╔════════════════════════════════════════╗
echo ║  ✅ Installation Complete!            ║
echo ╚════════════════════════════════════════╝
echo.

echo 📋 Next Steps:
echo.
echo 1. ⚙️  Configure MongoDB:
echo    - Local: Make sure MongoDB service is running
echo    - Cloud: Update MONGODB_URI in server\.env
echo.
echo 2. 🚀 Start Development:
echo    npm run dev
echo.
echo 3. 🌐 Access Application:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 4. 📊 ^(Optional^) Seed Database:
echo    cd server ^&^& npm run seed
echo.
echo 5. 📚 Documentation:
echo    - DEVELOPER_GUIDE.md - API guide
echo    - TESTING_GUIDE.md - Testing instructions
echo    - DEPLOYMENT_GUIDE.md - Production deployment
echo.

echo 🎯 Happy coding! 🚀
echo.
pause
