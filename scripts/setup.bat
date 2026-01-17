@echo off
REM Budget Visualization App - Setup Script (Windows)
REM This script sets up the development environment

echo.
echo 🚀 Setting up Budget Visualization App...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

for /f "delims=" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js is installed: %NODE_VERSION%

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: npm is not installed
    exit /b 1
)

for /f "delims=" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm is installed: v%NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error installing dependencies
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

REM Generate icons
echo 🎨 Generating app icons...
call npm run make-icons 2>nul || echo ⚠️  Icon generation skipped (optional)

echo.
echo ✨ Setup complete!
echo.
echo To start the development server, run:
echo   npm start
echo.
echo To build for production, run:
echo   npm run build:electron
echo.
echo For more information, see:
echo   - README.md - Usage and features
echo   - INSTALLATION.md - Detailed installation guide
echo   - EXCEL_FORMAT_GUIDE.md - Excel file format requirements
echo.

pause
