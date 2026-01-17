@echo off
echo Starting Budget Visualization App...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed!
    echo.
    echo Please run INSTALL.bat first!
    echo.
    pause
    exit /b 1
)

REM Check if libraries are installed
python -c "import pandas, matplotlib, openpyxl" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Required libraries not installed!
    echo.
    echo Please run INSTALL.bat first!
    echo.
    pause
    exit /b 1
)

REM Run the app
echo.
echo Opening Budget Visualization App...
echo.
python BudgetVisualization.py

if %errorlevel% neq 0 (
    echo.
    echo The app closed with an error.
    echo Check that your Excel files are formatted correctly.
    echo.
    pause
)
