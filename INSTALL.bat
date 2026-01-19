@echo off
title Budget Visualization - Installation
color 0A
echo ========================================
echo Budget Visualization App - Setup
echo ========================================
echo.
echo This installer will check your system
echo and set up everything you need.
echo.
echo Press any key to start...
pause >nul
cls

echo.
echo ========================================
echo STEP 1: Checking for Python
echo ========================================
echo.

python --version
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ============================================
    echo ERROR: Python is NOT found on your system!
    echo ============================================
    echo.
    echo You need to install Python first.
    echo.
    echo HERE'S WHAT TO DO:
    echo.
    echo 1. Go to: https://www.python.org/downloads/
    echo.
    echo 2. Click the big yellow "Download Python" button
    echo.
    echo 3. Run the installer
    echo.
    echo 4. VERY IMPORTANT: On the FIRST screen of the installer,
    echo    there is a checkbox at the BOTTOM that says:
    echo    [ ] Add Python to PATH
    echo.
    echo    YOU MUST CHECK THIS BOX!
    echo.
    echo 5. Click "Install Now"
    echo.
    echo 6. After Python is installed, run this INSTALL.bat again
    echo.
    echo ============================================
    echo.
    echo This window will stay open so you can see these instructions.
    echo Press any key to close this window...
    pause >nul
    exit /b 1
)

echo SUCCESS! Python is installed!
echo.
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo STEP 2: Checking for pip
echo ========================================
echo.

pip --version
if %errorlevel% neq 0 (
    echo.
    echo pip not found. Trying to enable it...
    python -m ensurepip --default-pip
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo ============================================
        echo ERROR: Could not enable pip
        echo ============================================
        echo.
        echo SOLUTION:
        echo 1. Uninstall Python from Windows Settings
        echo 2. Go to https://www.python.org/downloads/
        echo 3. Download and install Python again
        echo 4. CHECK THE BOX "Add Python to PATH"
        echo 5. Run this installer again
        echo.
        echo Press any key to close...
        pause >nul
        exit /b 1
    )
)

echo SUCCESS! pip is available!
echo.
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo STEP 3: Installing Required Libraries
echo ========================================
echo.
echo This will take 1-2 minutes...
echo Installing: pandas, openpyxl, matplotlib
echo.

pip install pandas openpyxl matplotlib

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ============================================
    echo ERROR: Could not install libraries
    echo ============================================
    echo.
    echo This might be due to:
    echo - No internet connection
    echo - Firewall blocking pip
    echo - Antivirus blocking installation
    echo.
    echo Try:
    echo 1. Check your internet connection
    echo 2. Run this installer as Administrator
    echo    (right-click INSTALL.bat and choose "Run as administrator")
    echo.
    echo Press any key to close...
    pause >nul
    exit /b 1
)

cls
color 0A
echo.
echo ========================================
echo          SUCCESS!
echo ========================================
echo.
echo Installation completed successfully!
echo.
echo All required libraries are installed:
echo - pandas (for Excel file reading)
echo - matplotlib (for charts)
echo - openpyxl (for Excel support)
echo.
echo ========================================
echo.
echo YOU CAN NOW USE THE APP!
echo.
echo Just double-click "run.bat" to start
echo.
echo ========================================
echo.
echo Press any key to close this window...
pause >nul

