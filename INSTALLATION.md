# Installation Guide

Complete installation instructions for the Budget Visualization Desktop App.

## Quick Start

### For End Users (Using Pre-built Installers)

1. **Download the installer** for your platform:
   - **Windows**: `Budget-Visualization-Setup-1.0.0.exe`
   - **macOS**: `Budget-Visualization-1.0.0.dmg`
   - **Linux**: `Budget-Visualization-1.0.0.AppImage`

2. **Run the installer**:
   - **Windows**: Double-click the `.exe` file and follow the installation wizard
   - **macOS**: Open the `.dmg` file and drag the app to Applications
   - **Linux**: Make the AppImage executable and run it:
     ```bash
     chmod +x Budget-Visualization-1.0.0.AppImage
     ./Budget-Visualization-1.0.0.AppImage
     ```

3. **Launch the app** from your applications menu

That's it! The app will automatically check for updates.

---

## For Developers

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git** (for cloning the repository)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MAPASOST/TravelInfo.git
   cd TravelInfo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required packages including:
   - Electron
   - React and React DOM
   - Vite (build tool)
   - Recharts (charting library)
   - XLSX (Excel parsing)
   - jsPDF and html2canvas (PDF export)
   - And all dev dependencies

3. **Generate app icons** (optional, icons are pre-generated):
   ```bash
   npm run make-icons
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

   This will:
   - Start the React development server on http://localhost:3000
   - Launch the Electron app
   - Enable hot-reloading for development

### Building for Production

#### Build for Current Platform

```bash
npm run build:electron
```

This will create a distributable package in the `release` folder for your current operating system.

#### Build for Specific Platforms

```bash
# Windows (creates .exe installer)
npm run dist -- --win

# macOS (creates .dmg)
npm run dist -- --mac

# Linux (creates .AppImage)
npm run dist -- --linux

# Build for all platforms
npm run dist -- --win --mac --linux
```

**Note**: To build for macOS, you need to be on a Mac. To build for Windows from Mac/Linux, you may need additional tools.

### Platform-Specific Notes

#### Windows

- The build creates an NSIS installer (`.exe`)
- The app will be installed to `C:\Program Files\Budget Visualization`
- A desktop shortcut is created automatically
- Auto-updates work out of the box

**Building on Windows:**
```bash
# Install dependencies
npm install

# Build
npm run build:electron
```

#### macOS

- The build creates a DMG disk image
- The app needs to be signed for distribution (requires Apple Developer account)
- For development, you can skip signing

**Building on macOS:**
```bash
# Install dependencies
npm install

# Build (unsigned, for testing)
npm run dist -- --mac

# Build signed (requires signing identity)
CSC_LINK=path/to/certificate.p12 CSC_KEY_PASSWORD=password npm run dist -- --mac
```

**macOS Gatekeeper:**
If you get a "cannot be opened" warning:
1. Right-click the app
2. Select "Open"
3. Click "Open" again in the dialog

#### Linux

- The build creates an AppImage (portable, no installation needed)
- Also can build `.deb` or `.rpm` packages

**Building on Linux:**
```bash
# Install dependencies
npm install

# Build AppImage
npm run dist -- --linux

# Build .deb package
npm run dist -- --linux deb

# Build .rpm package
npm run dist -- --linux rpm
```

**Running AppImage:**
```bash
chmod +x Budget-Visualization-1.0.0.AppImage
./Budget-Visualization-1.0.0.AppImage
```

### Troubleshooting Installation

#### "npm install" Fails

**Problem**: Dependencies fail to install

**Solutions**:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Use a different registry:
   ```bash
   npm install --registry https://registry.npmjs.org/
   ```

3. Check Node.js version:
   ```bash
   node --version
   ```
   Must be v16 or higher

#### Build Fails

**Problem**: `electron-builder` fails to create installer

**Solutions**:
1. Install build tools:

   **Windows**:
   ```bash
   npm install --global windows-build-tools
   ```

   **Linux (Ubuntu/Debian)**:
   ```bash
   sudo apt-get install -y build-essential
   ```

   **macOS**:
   ```bash
   xcode-select --install
   ```

2. Clear build cache:
   ```bash
   rm -rf dist release
   npm run build:electron
   ```

#### Icon Generation Fails

**Problem**: `npm run make-icons` fails

**Solutions**:
1. Ensure sharp and electron-icon-maker are installed:
   ```bash
   npm install --save-dev sharp electron-icon-maker
   ```

2. If still failing, use pre-generated icons in the `assets` folder

#### App Won't Start

**Problem**: Electron app opens blank window or crashes

**Solutions**:
1. Check if React dev server is running:
   - Open http://localhost:3000 in a browser
   - Should see the React app

2. Check console for errors:
   - In the Electron window, press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac)
   - Look for errors in the Console tab

3. Restart the development server:
   ```bash
   # Stop with Ctrl+C, then:
   npm start
   ```

### Advanced Configuration

#### Customizing the Build

Edit `package.json` to customize the build:

```json
{
  "build": {
    "appId": "com.yourcompany.budgetapp",
    "productName": "Your Budget App Name",
    "directories": {
      "buildResources": "assets",
      "output": "release"
    },
    "win": {
      "target": ["nsis"],
      "icon": "assets/icon.ico"
    },
    "mac": {
      "category": "public.app-category.finance",
      "icon": "assets/icon.icns"
    },
    "linux": {
      "category": "Office",
      "icon": "assets/icon.png"
    }
  }
}
```

#### Configuring Auto-Updates

The app uses `electron-updater` for automatic updates. To enable:

1. Update `package.json`:
   ```json
   {
     "build": {
       "publish": {
         "provider": "github",
         "owner": "your-username",
         "repo": "your-repo"
       }
     }
   }
   ```

2. Create a GitHub release with the built installers

3. Users will automatically receive update notifications

**Other update providers:**
- Amazon S3
- Generic HTTP server
- Custom update server

See: https://www.electron.build/auto-update

### Development Tips

#### Hot Reloading

The app supports hot reloading in development:
- React components reload automatically
- To reload Electron main process, restart the app

#### Debugging

**React DevTools:**
- Automatically available in development mode
- Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac)

**Electron Main Process:**
- Add `console.log()` statements in `electron/main.js`
- View output in the terminal where you ran `npm start`

**React Components:**
- Use React DevTools extension
- Add `console.log()` in component code
- View in Electron DevTools Console

#### Testing Different Scenarios

```bash
# Test with production build locally
npm run build
npm run start:electron

# Test installer without distributing
npm run package
# Opens the packaged app from the release folder
```

### CI/CD Setup

For automated builds on GitHub Actions:

Create `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build:electron

      - name: Upload artifacts
        uses: actions/upload-artifact@v2
        with:
          name: ${{ matrix.os }}-build
          path: release/
```

## Support

For issues or questions:
- Check the [README.md](README.md) for usage instructions
- Check the [EXCEL_FORMAT_GUIDE.md](EXCEL_FORMAT_GUIDE.md) for file format help
- Open an issue on GitHub

---

**Happy budgeting!** 📊
