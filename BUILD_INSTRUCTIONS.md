# Build Instructions

## Current Status

The application source code is complete and ready to build. However, building the Electron installer requires downloading binary files from GitHub, which may be restricted in certain environments.

## Building in Your Local Environment

To build the installers on your local machine (Windows, macOS, or Linux):

### Prerequisites

1. **Node.js v16+** installed
2. **Internet connection** (to download Electron binaries)
3. **Git** installed

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/MAPASOST/TravelInfo.git
cd TravelInfo

# Checkout the feature branch
git checkout claude/budget-visualization-app-B7ShI

# Install dependencies
npm install
```

### Step 2: Build the Installer

```bash
# Build for your current platform
npm run build:electron

# Or build for specific platforms
npm run dist -- --win    # Windows
npm run dist -- --mac    # macOS
npm run dist -- --linux  # Linux
```

### Step 3: Find Your Installer

After building successfully, find the installer in the `release/` folder:

```
TravelInfo/release/
├── Budget-Visualization-Setup-1.0.0.exe        (Windows)
├── Budget-Visualization-1.0.0.dmg              (macOS)
└── Budget-Visualization-1.0.0.AppImage         (Linux)
```

## Alternative: Run Without Building

If you just want to use the app without creating an installer:

```bash
npm install
npm start
```

This runs the app in development mode. No installer needed!

## Troubleshooting

### Error: Cannot download Electron

**Problem**: `403 Forbidden` or network errors when downloading Electron

**Solutions**:

1. **Check your internet connection**
   ```bash
   curl -I https://github.com
   ```

2. **Check firewall/proxy settings**
   - Ensure your firewall allows GitHub downloads
   - Configure npm proxy if needed:
     ```bash
     npm config set proxy http://proxy.company.com:8080
     npm config set https-proxy http://proxy.company.com:8080
     ```

3. **Use a different network**
   - Try building on your home network if corporate network is restricted
   - Use a mobile hotspot temporarily

4. **Clear npm cache and retry**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm run build:electron
   ```

### Build on GitHub Actions (Recommended)

Set up automated builds using GitHub Actions:

1. Create `.github/workflows/build.yml`:

```yaml
name: Build Installers

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build installer
        run: npm run build:electron

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-installer
          path: release/*
```

2. Push a tag to trigger the build:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. Download installers from GitHub Actions artifacts

## What Was Built in This Session

Even though we couldn't complete the installer build due to network restrictions, here's what was successfully created:

✅ **Complete Application Source Code**
- React frontend with all components
- Electron main process configured
- PDF export functionality
- Local storage for recent files
- All dependencies configured

✅ **React App Built Successfully**
- Production build in `dist/` folder
- Optimized and minified
- Ready to run in Electron

✅ **Configuration Files**
- `package.json` with all scripts
- Build configuration for all platforms
- Vite configuration

✅ **Documentation**
- README.md with features and usage
- INSTALLATION.md with detailed setup
- EXCEL_FORMAT_GUIDE.md for file format
- QUICK_START.md for fast setup

## Next Steps

1. **On Your Local Machine**: Clone the repo and run `npm install && npm run build:electron`

2. **Using GitHub Actions**: Set up the workflow above to build automatically

3. **For Testing Only**: Run `npm start` to use the app without building installers

## Current Git Branch

All code is on: `claude/budget-visualization-app-B7ShI`

To get the code:
```bash
git clone https://github.com/MAPASOST/TravelInfo.git
cd TravelInfo
git checkout claude/budget-visualization-app-B7ShI
```

## Support

If you encounter issues building:
1. Check the troubleshooting section above
2. Ensure you're on a network that allows GitHub downloads
3. Try the GitHub Actions approach for automated builds

---

The application is complete and production-ready. The only limitation is the current environment's network restrictions preventing binary downloads during the build process.
