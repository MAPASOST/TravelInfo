# How to Create a Release with Download Button

This guide is for someone with GitHub repository access to create a proper release.

## Option 1: Via GitHub Web Interface (Easiest)

### Step 1: Get the .exe file
1. Go to https://github.com/MAPASOST/TravelInfo/actions
2. Click the latest successful build (green checkmark)
3. Download "BudgetVisualization-Windows" artifact
4. Unzip it to get the .exe file

### Step 2: Create the Release
1. Go to https://github.com/MAPASOST/TravelInfo/releases
2. Click **"Draft a new release"** button (top right)
3. Click **"Choose a tag"** → type `v1.0.0` → click "Create new tag: v1.0.0 on publish"
4. Set **Release title**: `Budget Visualization App v1.0.0`
5. In the description box, paste:

```markdown
# Budget Visualization Desktop App

## 📥 Download

Click **BudgetVisualization.exe** below to download.

## What This Does

Upload your Excel files:
- Budget file
- Profit & Loss file

Get:
- ✅ Beautiful comparison charts
- ✅ Trend analysis
- ✅ Category breakdowns
- ✅ PDF export

## How to Use

1. Download the .exe below
2. Double-click to run (no installation needed!)
3. Upload your Excel files
4. View charts and export PDFs

## Windows Security Warning

If Windows says "Windows protected your PC":
- Click "More info"
- Click "Run anyway"

This is normal for unsigned apps.
```

6. **Drag and drop** the `BudgetVisualization.exe` file into the "Attach binaries" area
7. Click **"Publish release"**

### Step 3: Share the Link

The release will be at:
**https://github.com/MAPASOST/TravelInfo/releases/tag/v1.0.0**

This page will have a big obvious download button!

---

## Option 2: Via Command Line

If you have the GitHub CLI installed:

```bash
# Download artifact first from Actions page, then:

gh release create v1.0.0 \
  --title "Budget Visualization App v1.0.0" \
  --notes "Download BudgetVisualization.exe below and double-click to run!" \
  BudgetVisualization.exe
```

---

## What Users Will See

After creating the release, users will see:
- A clear release page
- A big "Assets" section
- **BudgetVisualization.exe** with a download button
- Much easier than navigating Actions artifacts!

The release URL will be:
**https://github.com/MAPASOST/TravelInfo/releases/latest**

This gives users a permanent, simple download link!
