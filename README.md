# Budget Visualization Desktop App

A powerful desktop application for visualizing organizational budgets and profit & loss statements with interactive charts and detailed variance analysis.

![Budget Visualization App](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 📊 **Budget vs Actual Comparison**: Side-by-side bar charts comparing budgeted amounts against actual spending
- 📈 **Trend Analysis**: Line charts showing spending patterns over time
- 🥧 **Category Breakdown**: Pie charts visualizing budget allocation and actual spending by category
- 📋 **Variance Analysis**: Detailed tables showing differences between budget and actual with percentages
- 🔄 **Auto-Updates**: Built-in automatic update system for seamless version updates
- 💼 **Professional UI**: Clean, modern interface with smooth animations
- 📁 **Excel Import**: Direct import from .xlsx and .xls files

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd TravelInfo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

This will start both the React development server and the Electron app.

## Building for Production

### Build the Application

```bash
npm run build:electron
```

This will create distributable packages in the `release` folder for your current platform.

### Build for Specific Platforms

```bash
# Windows
npm run dist -- --win

# macOS
npm run dist -- --mac

# Linux
npm run dist -- --linux
```

## Excel File Format

Your budget and P&L Excel files should follow this format:

| Category | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
|----------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| Salaries | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 |
| Marketing | 10000 | 12000 | 15000 | 8000 | 9000 | 11000 | 13000 | 14000 | 10000 | 9500 | 11500 | 12000 |
| Operations | 20000 | 22000 | 21000 | 23000 | 20000 | 21500 | 22500 | 21000 | 20500 | 21500 | 22000 | 21000 |
| IT & Software | 5000 | 5000 | 7000 | 5000 | 6000 | 5500 | 5000 | 6500 | 5500 | 5000 | 6000 | 5500 |

### Requirements:

- **First row**: Headers (Category name in first column, followed by period names)
- **First column**: Category names (e.g., Salaries, Marketing, Operations)
- **Data columns**: Numeric values for each period
- **Periods**: Can be months, quarters, or any time division

### Sample Files

Sample Excel templates are available in the `samples` folder:
- `budget_template.xlsx` - Budget template
- `pl_template.xlsx` - Profit & Loss template

## Usage

1. **Launch the Application**: Open the Budget Visualization app

2. **Upload Budget File**: Click "Upload Budget File" and select your budget Excel file

3. **Upload P&L File**: Click "Upload P&L Statement" and select your profit & loss Excel file

4. **View Visualizations**: Once both files are uploaded, the dashboard will display:
   - Budget vs Actual bar charts
   - Trend analysis line charts
   - Category breakdown pie charts
   - Detailed variance analysis table

5. **Interpret Results**:
   - **Green values**: Under budget (favorable)
   - **Red values**: Over budget (unfavorable)
   - **Variance %**: Percentage difference from budget
   - **Status badges**: Quick visual indicators

## Auto-Update System

The app includes an automatic update system:

1. When a new version is available, you'll see a notification at the top of the app
2. Updates download automatically in the background
3. Once downloaded, click "Restart Now" to install the update
4. No need to manually download or reinstall

### Publishing Updates

To publish updates to users:

1. Update the version in `package.json`
2. Build the application: `npm run build:electron`
3. Publish to your GitHub repository (configured in `package.json` under `build.publish`)
4. Users will automatically receive the update notification

## Development

### Project Structure

```
TravelInfo/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Preload script for IPC
├── src/
│   ├── components/      # React components
│   │   ├── BudgetVsActualChart.jsx
│   │   ├── TrendChart.jsx
│   │   ├── CategoryPieChart.jsx
│   │   ├── VarianceTable.jsx
│   │   ├── FileUpload.jsx
│   │   └── UpdateNotification.jsx
│   ├── utils/
│   │   └── excelParser.js
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   └── main.jsx         # React entry point
├── package.json
├── vite.config.js
└── index.html
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build React app for production
- `npm run build:electron` - Build Electron app with installers
- `npm run package` - Package without creating installers
- `npm run dist` - Create distribution packages

## Technology Stack

- **Electron**: Desktop app framework
- **React**: UI framework
- **Vite**: Build tool and dev server
- **Recharts**: Charting library
- **XLSX**: Excel file parsing
- **electron-updater**: Automatic updates

## Customization

### Changing Colors

Edit the color schemes in:
- `src/App.css` - Global theme colors
- `src/components/CategoryPieChart.jsx` - Pie chart colors
- Individual component files for chart colors

### Modifying Chart Styles

Each chart component can be customized:
- Bar charts: `src/components/BudgetVsActualChart.jsx`
- Line charts: `src/components/TrendChart.jsx`
- Pie charts: `src/components/CategoryPieChart.jsx`

### Adding New Visualizations

1. Create a new component in `src/components/`
2. Import the component in `src/App.jsx`
3. Add it to the dashboard grid

## Troubleshooting

### Excel Files Not Loading

- Ensure your Excel file has the correct format (see Excel File Format section)
- Check that the first row contains headers
- Verify all data columns contain numeric values

### App Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues

```bash
# Clear build caches
rm -rf dist release
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this application for your organization.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Made with ❤️ for better budget management**