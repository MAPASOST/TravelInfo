import * as XLSX from 'xlsx';

/**
 * Parse Excel file data into a structured format
 * Expected format: First row contains headers (Category, Jan, Feb, Mar, etc.)
 * Subsequent rows contain category names and monthly values
 */
export const parseExcelData = async (fileData) => {
  return new Promise((resolve, reject) => {
    try {
      let arrayBuffer;

      if (fileData instanceof ArrayBuffer) {
        arrayBuffer = fileData;
      } else if (fileData instanceof Blob || fileData instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = processWorkbook(e.target.result);
            resolve(data);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(fileData);
        return;
      } else if (Array.isArray(fileData)) {
        // Data from Electron (array of bytes)
        arrayBuffer = new Uint8Array(fileData).buffer;
      } else {
        reject(new Error('Unsupported file format'));
        return;
      }

      const data = processWorkbook(arrayBuffer);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const processWorkbook = (arrayBuffer) => {
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (!jsonData || jsonData.length < 2) {
    throw new Error('Excel file must contain at least headers and one data row');
  }

  // Extract headers and data
  const headers = jsonData[0];
  const rows = jsonData.slice(1);

  // Find category column (usually first column)
  const categoryIndex = 0;

  // Extract month/period columns (everything after the category column)
  const periodColumns = headers.slice(1).map((header, idx) => ({
    name: header || `Period ${idx + 1}`,
    index: idx + 1
  }));

  // Structure the data
  const categories = [];
  const timeline = [];
  let totalByPeriod = {};

  rows.forEach(row => {
    if (!row[categoryIndex]) return; // Skip empty rows

    const category = {
      name: String(row[categoryIndex]).trim(),
      values: [],
      total: 0
    };

    periodColumns.forEach(period => {
      const value = parseFloat(row[period.index]) || 0;
      category.values.push({
        period: period.name,
        amount: value
      });
      category.total += value;

      // Accumulate totals by period
      if (!totalByPeriod[period.name]) {
        totalByPeriod[period.name] = 0;
      }
      totalByPeriod[period.name] += value;
    });

    categories.push(category);
  });

  // Create timeline data
  periodColumns.forEach(period => {
    timeline.push({
      period: period.name,
      total: totalByPeriod[period.name] || 0
    });
  });

  return {
    categories,
    timeline,
    periods: periodColumns.map(p => p.name),
    grandTotal: categories.reduce((sum, cat) => sum + cat.total, 0)
  };
};

/**
 * Merge budget and P&L data for comparison
 */
export const mergeDataForComparison = (budgetData, plData) => {
  const comparison = [];

  budgetData.categories.forEach(budgetCat => {
    const plCat = plData.categories.find(p => p.name === budgetCat.name);
    const actualTotal = plCat ? plCat.total : 0;
    const variance = actualTotal - budgetCat.total;
    const variancePercent = budgetCat.total !== 0
      ? ((variance / budgetCat.total) * 100).toFixed(1)
      : 0;

    comparison.push({
      category: budgetCat.name,
      budget: budgetCat.total,
      actual: actualTotal,
      variance,
      variancePercent: parseFloat(variancePercent)
    });
  });

  // Add any categories that exist in P&L but not in budget
  plData.categories.forEach(plCat => {
    const existsInBudget = budgetData.categories.find(b => b.name === plCat.name);
    if (!existsInBudget) {
      comparison.push({
        category: plCat.name,
        budget: 0,
        actual: plCat.total,
        variance: plCat.total,
        variancePercent: 100
      });
    }
  });

  return comparison;
};

/**
 * Merge timeline data for trend analysis
 */
export const mergeTimelineData = (budgetData, plData) => {
  const merged = [];

  budgetData.timeline.forEach((budgetPeriod, index) => {
    const plPeriod = plData.timeline[index];

    merged.push({
      period: budgetPeriod.period,
      budget: budgetPeriod.total,
      actual: plPeriod ? plPeriod.total : 0
    });
  });

  return merged;
};
