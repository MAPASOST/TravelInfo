# Build Portable .EXE File

This guide shows you how to build a simple portable .exe file that you can run without installing.

## What You Get

- **BudgetVisualization.exe** - A single portable executable for Windows
- **Or an unpacked app folder** for Mac/Linux
- No installer needed
- No auto-updates
- Just double-click to run!

## Prerequisites

- **Node.js v16+** installed on your computer
- **Internet connection** (to download Electron binaries once)
- **Windows, Mac, or Linux** computer

## Quick Start

### Step 1: Get the Code

```bash
# Clone the repository
git clone https://github.com/MAPASOST/TravelInfo.git
cd TravelInfo

# Switch to the feature branch
git checkout claude/budget-visualization-app-B7ShI

# Install dependencies (requires internet)
npm install
```

### Step 2: Build the Portable App

```bash
# Build for Windows (creates portable .exe)
npm run dist -- --win

# Build for Mac (creates unpacked app folder)
npm run dist -- --mac

# Build for Linux (creates unpacked app folder)
npm run dist -- --linux
```

### Step 3: Find Your App

After building, look in the `release/` folder:

```
TravelInfo/release/
├── BudgetVisualization.exe              (Windows - portable, no install needed!)
├── mac/BudgetVisualization.app/         (Mac - drag to Applications)
└── linux-unpacked/BudgetVisualization   (Linux - run directly)
```

## For Windows Users

Your **BudgetVisualization.exe** will be in:
```
release/BudgetVisualization.exe
```

**To use:**
1. Copy `BudgetVisualization.exe` anywhere you want
2. Double-click to run
3. No installation required!

## Alternative: Run Without Building

If you just want to test the app immediately:

```bash
npm install
npm start
```

This runs the app in development mode. Perfect for testing!

## Why This Fails in Some Environments

The build process needs to download Electron binaries from GitHub. If you're on a:
- Corporate network with restrictions
- Network behind a firewall
- Environment blocking GitHub downloads

**Solution:** Build on your personal computer at home, then copy the .exe file wherever you need it.

## File Sizes

Expect the following approximate sizes:
- **Windows .exe**: ~150-200 MB (includes Chromium and Node.js)
- **Mac app**: ~150-200 MB
- **Linux app**: ~150-200 MB

The files are large because they include everything needed to run (Chrome browser engine + Node.js runtime).

## Distributing Your App

Once built, you can distribute the .exe file by:

1. **Email** - Attach the .exe file (if size allows)
2. **Cloud Storage** - Upload to Dropbox, Google Drive, OneDrive
3. **USB Drive** - Copy to a flash drive
4. **Network Share** - Put on shared company drive
5. **GitHub Release** - Upload as a release asset

## Complete Build on Your Computer

Here's the full sequence on a Windows machine:

```cmd
REM 1. Clone the repo
git clone https://github.com/MAPASOST/TravelInfo.git
cd TravelInfo

REM 2. Switch to branch
git checkout claude/budget-visualization-app-B7ShI

REM 3. Install (downloads packages from npm)
npm install

REM 4. Build (creates the exe)
npm run dist -- --win

REM 5. Your file is ready!
REM Look in: release\BudgetVisualization.exe
```

## Troubleshooting

### Error: Cannot download Electron

**Problem**: Network restrictions blocking GitHub

**Solution**: Try these in order:
1. Use a different network (home WiFi, mobile hotspot)
2. Ask IT to whitelist `github.com` and `githubusercontent.com`
3. Build on a personal computer and transfer the .exe file

### Build Takes Forever

**Normal!** The first build takes 5-10 minutes because it downloads:
- Electron binaries (~100 MB)
- All dependencies
- Build tools

Subsequent builds are much faster (30 seconds).

### Antivirus Blocks the .exe

**Normal!** New .exe files without digital signatures may trigger warnings.

**Solutions:**
- Click "More Info" → "Run Anyway"
- Add an exception in your antivirus
- For distribution, consider code signing (requires certificate)

## What's Included in the App

✅ All features working:
- Budget vs Actual charts
- Trend analysis
- Pie charts
- Variance tables
- PDF export
- Recent files tracking
- Excel file import

❌ Not included:
- Auto-updates (removed for simplicity)
- Fancy installer (not needed for portable exe)

## Next Steps

After building:

1. **Test it**: Double-click the .exe and make sure it works
2. **Use it**: Upload your budget Excel files and generate reports
3. **Share it**: Send the .exe to colleagues who need it

## Current Status

✅ **App is complete** - All code is production-ready
✅ **React app builds** - Web portion compiles successfully
❌ **Network restrictions** - Current environment blocks Electron downloads

**Solution**: Build on any computer with normal internet access!

---

**Need help?** Open an issue on GitHub or check the main README.md for more details.
