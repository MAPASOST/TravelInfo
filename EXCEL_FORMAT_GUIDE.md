# Excel File Format Guide

This guide explains how to format your budget and profit & loss (P&L) Excel files for use with the Budget Visualization App.

## File Format Requirements

The app expects Excel files (.xlsx or .xls) with a specific structure:

### Basic Structure

```
Column A: Category names
Columns B onwards: Period values (months, quarters, etc.)
Row 1: Headers
Rows 2+: Data
```

## Example Budget File

Here's an example of a properly formatted budget file:

| Category | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
|----------|------|------|------|------|------|------|------|------|------|------|------|------|
| Salaries | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 | 50000 |
| Marketing | 10000 | 12000 | 15000 | 8000 | 9000 | 11000 | 13000 | 14000 | 10000 | 9500 | 11500 | 12000 |
| Operations | 20000 | 22000 | 21000 | 23000 | 20000 | 21500 | 22500 | 21000 | 20500 | 21500 | 22000 | 21000 |
| IT & Software | 5000 | 5000 | 7000 | 5000 | 6000 | 5500 | 5000 | 6500 | 5500 | 5000 | 6000 | 5500 |
| Rent | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 |
| Utilities | 3000 | 3200 | 3100 | 2900 | 3000 | 3300 | 3500 | 3400 | 3200 | 3100 | 3000 | 3200 |

## Example P&L File

Your P&L file should have the same structure, with actual spending amounts:

| Category | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
|----------|------|------|------|------|------|------|------|------|------|------|------|------|
| Salaries | 50000 | 50000 | 50000 | 51000 | 50000 | 50000 | 52000 | 50000 | 50000 | 50000 | 51000 | 50000 |
| Marketing | 9500 | 11800 | 16200 | 8200 | 9100 | 12000 | 13500 | 15000 | 10200 | 9300 | 11000 | 11500 |
| Operations | 19800 | 22100 | 21500 | 23200 | 20100 | 21300 | 22800 | 21200 | 20600 | 21700 | 21900 | 20900 |
| IT & Software | 4800 | 5100 | 7200 | 5000 | 6200 | 5600 | 4900 | 6700 | 5400 | 5100 | 5900 | 5500 |
| Rent | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 | 15000 |
| Utilities | 2900 | 3300 | 3200 | 2800 | 3100 | 3400 | 3600 | 3500 | 3100 | 3200 | 2900 | 3100 |

## Detailed Requirements

### 1. Headers (Row 1)

- **Cell A1**: Must contain a label for the category column (e.g., "Category", "Expense Type", "Account")
- **Cells B1 onwards**: Period names (e.g., "Jan", "Feb", "Q1", "Quarter 1", "Period 1")
- Period names should be consistent across both budget and P&L files

### 2. Category Names (Column A)

- **Starting from A2**: Enter your expense or revenue categories
- Categories should match between your budget and P&L files for accurate comparison
- Use clear, descriptive names
- Examples:
  - Salaries & Wages
  - Marketing & Advertising
  - Office Rent
  - IT & Software
  - Travel & Entertainment

### 3. Data Values (Columns B onwards)

- Enter numeric values only (no currency symbols or commas)
- The app will automatically format numbers as currency
- Use actual numbers, not formulas (the app reads values, not formulas)
- Empty cells are treated as 0

## Tips for Best Results

### Category Matching

Ensure category names are **exactly the same** in both files:

✅ **Good Example:**
- Budget: "Marketing & Advertising"
- P&L: "Marketing & Advertising"

❌ **Bad Example:**
- Budget: "Marketing & Advertising"
- P&L: "Marketing" (won't match)

### Period Consistency

Use the same time periods in both files:

✅ **Good Example:**
- Budget: Jan, Feb, Mar, Apr...
- P&L: Jan, Feb, Mar, Apr...

❌ **Bad Example:**
- Budget: Jan, Feb, Mar, Apr...
- P&L: January, February, March... (may still work but less consistent)

### Multiple Sheets

If your Excel file has multiple sheets:
- The app will only read the **first sheet**
- Make sure your data is on the first sheet
- You can have additional sheets for notes or calculations

## Quarterly or Custom Periods

You can use any period names you want:

### Quarterly Example

| Category | Q1 2024 | Q2 2024 | Q3 2024 | Q4 2024 |
|----------|---------|---------|---------|---------|
| Salaries | 150000 | 150000 | 150000 | 150000 |
| Marketing | 37000 | 28000 | 37000 | 35000 |

### Custom Periods

| Category | Week 1 | Week 2 | Week 3 | Week 4 |
|----------|--------|--------|--------|--------|
| Revenue | 50000 | 52000 | 48000 | 51000 |
| Expenses | 30000 | 31000 | 29000 | 30500 |

## Common Mistakes to Avoid

1. **Currency symbols**: Don't use $, €, £, etc.
   - ❌ $50,000
   - ✅ 50000

2. **Commas in numbers**: The app may not parse these correctly
   - ❌ 50,000
   - ✅ 50000

3. **Different category names**: Must match exactly
   - ❌ Budget: "IT", P&L: "Information Technology"
   - ✅ Both: "IT & Software"

4. **Missing headers**: First row must have headers
   - ❌ Starting with data in row 1
   - ✅ Headers in row 1, data from row 2

5. **Empty first column**: Category names are required
   - ❌ Leaving cell A2 blank
   - ✅ Entering category name in A2

## Creating Your Own Templates

### In Excel:

1. Open a new workbook
2. In cell A1, type "Category"
3. In cells B1, C1, D1, etc., type your period names (Jan, Feb, Mar, etc.)
4. Starting from row 2, enter your categories in column A
5. Enter your budget/actual values in the corresponding cells
6. Save as .xlsx or .xls

### In Google Sheets:

1. Create your budget in Google Sheets using the same format
2. Go to File → Download → Microsoft Excel (.xlsx)
3. Use the downloaded file in the app

## Exporting from Accounting Software

Most accounting software can export to Excel format:

- **QuickBooks**: Reports → Export to Excel
- **Xero**: Reports → Export → Excel
- **FreshBooks**: Reports → Download as Excel

Make sure to:
1. Export with the correct structure (categories in rows, periods in columns)
2. Remove any extra formatting or summary rows
3. Ensure the first row contains headers

## Testing Your File

Before uploading to the app:

1. ✅ Check that row 1 has headers
2. ✅ Verify category names match between budget and P&L
3. ✅ Confirm all values are numbers (no text in data cells)
4. ✅ Ensure period names are consistent
5. ✅ Remove any blank rows between data

## Support

If your Excel file isn't loading correctly:

1. Check the error message in the app
2. Verify your file matches the format described above
3. Try opening the file in Excel to check for formatting issues
4. Create a simple test file with 2-3 categories and periods to verify the format works

---

For more help, refer to the main README.md file or create an issue on GitHub.
