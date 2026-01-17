@echo off
echo ========================================
echo Budget Visualization App - Setup
echo ========================================
echo.

REM Check if Python is installed
echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Python is NOT installed on your computer.
    echo.
    echo PLEASE FOLLOW THESE STEPS:
    echo.
    echo 1. Go to: https://www.python.org/downloads/
    echo 2. Click the big yellow "Download Python" button
    echo 3. Run the installer
    echo 4. IMPORTANT: Check the box "Add Python to PATH"
    echo    (at the bottom of the first screen)
    echo 5. Click "Install Now"
    echo 6. Wait for installation to complete
    echo 7. Close this window and run INSTALL.bat again
    echo.
    pause
    exit /b 1
)

echo Python is installed!
python --version
echo.

REM Check if pip is available
echo Checking for pip...
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: pip is not available.
    echo.
    echo Trying to install pip...
    python -m ensurepip --default-pip
    if %errorlevel% neq 0 (
        echo.
        echo Could not install pip automatically.
        echo.
        echo SOLUTION:
        echo 1. Uninstall Python
        echo 2. Reinstall Python from https://www.python.org/downloads/
        echo 3. Make sure to check "Add Python to PATH"
        echo 4. Run this installer again
        echo.
        pause
        exit /b 1
    )
)

echo pip is available!
echo.

REM Install required libraries
echo Installing required libraries...
echo This will take 1-2 minutes (only needed once)
echo.

pip install pandas openpyxl matplotlib

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed.
    echo.
    echo Try running this command yourself:
    echo pip install pandas openpyxl matplotlib
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Installation complete!
echo ========================================
echo.
echo You can now use the app!
echo.
echo TO RUN THE APP:
echo Just double-click "run.bat"
echo.
pause
