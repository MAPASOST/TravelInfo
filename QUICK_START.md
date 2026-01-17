# Quick Start Guide

Get up and running with Budget Visualization App in 5 minutes!

## For End Users

### 1. Download the App

Download the installer for your operating system:

- **Windows**: `Budget-Visualization-Setup.exe`
- **macOS**: `Budget-Visualization.dmg`
- **Linux**: `Budget-Visualization.AppImage`

### 2. Install

#### Windows
1. Double-click the `.exe` file
2. Follow the installation wizard
3. Launch from Start Menu

#### macOS
1. Open the `.dmg` file
2. Drag the app to Applications folder
3. Launch from Applications

#### Linux
```bash
chmod +x Budget-Visualization.AppImage
./Budget-Visualization.AppImage
```

### 3. Use the App

1. **Prepare Your Excel Files**
   - Budget file with categories and amounts
   - P&L file with actual spending
   - See [EXCEL_FORMAT_GUIDE.md](EXCEL_FORMAT_GUIDE.md) for format details

2. **Upload Files**
   - Click "Upload Budget File"
   - Click "Upload P&L Statement"

3. **View Your Analysis**
   - Charts appear automatically
   - Export to PDF using the Export buttons

## For Developers

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/MAPASOST/TravelInfo.git
cd TravelInfo

# Run setup script
# On Linux/Mac:
chmod +x scripts/setup.sh
./scripts/setup.sh

# On Windows:
scripts\setup.bat

# Or manually:
npm install
npm start
```

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build:electron

# Generate icons
npm run make-icons
```

## Excel File Format Quick Reference

Your Excel files should look like this:

| Category   | Jan   | Feb   | Mar   | ... |
|------------|-------|-------|-------|-----|
| Salaries   | 50000 | 50000 | 50000 | ... |
| Marketing  | 10000 | 12000 | 15000 | ... |
| Operations | 20000 | 22000 | 21000 | ... |

**Key Points:**
- First row = headers (Category + period names)
- First column = category names
- Numbers only (no $ or commas)
- Same categories in both budget and P&L files

## Key Features

### 📊 Charts
- **Bar Charts**: Budget vs Actual comparison
- **Line Charts**: Trends over time
- **Pie Charts**: Category breakdowns

### 📄 Export
- Click "Export Report" for detailed PDF report
- Click "Export Charts" for visual PDF

### 💾 Recent Files
- Recently opened files appear for quick access
- Clear history with the × button

### 🔄 Auto-Updates
- App checks for updates automatically
- Notification appears when update is available
- One-click restart to install

## Common Issues

### Files Won't Load
- Check Excel format (see [EXCEL_FORMAT_GUIDE.md](EXCEL_FORMAT_GUIDE.md))
- Ensure first row has headers
- Remove $ symbols and commas from numbers

### App Won't Start
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Build Fails
```bash
# Clear build cache
rm -rf dist release
npm run build:electron
```

## Next Steps

- 📖 Read [README.md](README.md) for full documentation
- 🔧 See [INSTALLATION.md](INSTALLATION.md) for detailed setup
- 📊 Check [EXCEL_FORMAT_GUIDE.md](EXCEL_FORMAT_GUIDE.md) for file format details

## Support

Questions or issues? Open an issue on GitHub!

---

**Happy Budgeting!** 💰📈
