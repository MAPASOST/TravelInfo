@echo off
echo Starting Budget Visualization App...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed!
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b 1
)

echo Python found!
echo.

REM Try to run the app
echo Checking required libraries...
python -c "import pandas, matplotlib, openpyxl" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Installing required libraries...
    echo This only needs to happen once.
    echo.
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install libraries.
        echo.
        pause
        exit /b 1
    )
)

echo.
echo Starting Budget Visualization...
echo.
python BudgetVisualization.py

if %errorlevel% neq 0 (
    echo.
    echo The app closed with an error.
    pause
)
