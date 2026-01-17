import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import BudgetVsActualChart from './components/BudgetVsActualChart';
import TrendChart from './components/TrendChart';
import CategoryPieChart from './components/CategoryPieChart';
import VarianceTable from './components/VarianceTable';
import FileUpload from './components/FileUpload';
import RecentFiles from './components/RecentFiles';
import ExportButtons from './components/ExportButtons';
import { parseExcelData } from './utils/excelParser';
import {
  getRecentBudgetFiles,
  getRecentPLFiles,
  addRecentBudgetFile,
  addRecentPLFile,
  clearRecentFiles,
  saveLastSession
} from './utils/localStorage';

function App() {
  const [budgetData, setBudgetData] = useState(null);
  const [plData, setPlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentBudgetFiles, setRecentBudgetFiles] = useState([]);
  const [recentPLFiles, setRecentPLFiles] = useState([]);
  const [budgetFileName, setBudgetFileName] = useState('');
  const [plFileName, setPlFileName] = useState('');

  useEffect(() => {
    // Load recent files
    setRecentBudgetFiles(getRecentBudgetFiles());
    setRecentPLFiles(getRecentPLFiles());
  }, []);

  const handleBudgetUpload = async (file, filePath = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await parseExcelData(file);
      setBudgetData(data);
      setBudgetFileName(file.name || 'budget.xlsx');

      // Add to recent files if we have a path
      if (filePath) {
        const updated = addRecentBudgetFile(filePath, file.name);
        setRecentBudgetFiles(updated);
      }
    } catch (err) {
      setError('Error parsing budget file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePLUpload = async (file, filePath = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await parseExcelData(file);
      setPlData(data);
      setPlFileName(file.name || 'pl.xlsx');

      // Add to recent files if we have a path
      if (filePath) {
        const updated = addRecentPLFile(filePath, file.name);
        setRecentPLFiles(updated);
      }
    } catch (err) {
      setError('Error parsing P&L file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearRecentFiles = () => {
    if (confirm('Clear all recent files?')) {
      clearRecentFiles();
      setRecentBudgetFiles([]);
      setRecentPLFiles([]);
    }
  };

  // Save session when both files are loaded
  useEffect(() => {
    if (budgetData && plData) {
      saveLastSession(
        { name: budgetFileName, data: budgetData },
        { name: plFileName, data: plData }
      );
    }
  }, [budgetData, plData, budgetFileName, plFileName]);

  const hasData = budgetData && plData;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Budget & P&L Visualization Dashboard</h1>
        <p className="subtitle">Upload your budget and profit & loss statements to generate comprehensive analysis</p>
      </header>

      <div className="upload-section">
        <FileUpload
          label="Upload Budget File"
          onUpload={handleBudgetUpload}
          loading={loading}
          fileLoaded={!!budgetData}
        />
        <FileUpload
          label="Upload P&L Statement"
          onUpload={handlePLUpload}
          loading={loading}
          fileLoaded={!!plData}
        />
      </div>

      {!hasData && !loading && recentBudgetFiles.length > 0 && (
        <RecentFiles
          recentFiles={recentBudgetFiles}
          onSelect={(file) => {
            // In a real scenario, we'd load the file from path
            console.log('Selected recent budget file:', file);
          }}
          onClear={handleClearRecentFiles}
          type="Budget"
        />
      )}

      {!hasData && !loading && recentPLFiles.length > 0 && (
        <RecentFiles
          recentFiles={recentPLFiles}
          onSelect={(file) => {
            // In a real scenario, we'd load the file from path
            console.log('Selected recent P&L file:', file);
          }}
          onClear={handleClearRecentFiles}
          type="P&L"
        />
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {hasData && (
        <div className="dashboard">
          <ExportButtons budgetData={budgetData} plData={plData} />
          <div className="chart-grid">
            <div className="chart-container large">
              <h2>Budget vs Actual Comparison</h2>
              <BudgetVsActualChart budgetData={budgetData} plData={plData} />
            </div>

            <div className="chart-container large">
              <h2>Trend Analysis Over Time</h2>
              <TrendChart budgetData={budgetData} plData={plData} />
            </div>

            <div className="chart-container medium">
              <h2>Budget Category Breakdown</h2>
              <CategoryPieChart data={budgetData} title="Budget Allocation" />
            </div>

            <div className="chart-container medium">
              <h2>Actual Spending Breakdown</h2>
              <CategoryPieChart data={plData} title="Actual Spending" />
            </div>

            <div className="chart-container full">
              <h2>Variance Analysis</h2>
              <VarianceTable budgetData={budgetData} plData={plData} />
            </div>
          </div>
        </div>
      )}

      {!hasData && !loading && (
        <div className="welcome-message">
          <div className="welcome-icon">📊</div>
          <h2>Welcome to Budget Visualization</h2>
          <p>Upload your budget and P&L Excel files to get started with comprehensive financial analysis.</p>
          <ul className="feature-list">
            <li>📈 Bar charts comparing budget vs actual spending</li>
            <li>📉 Line charts showing spending trends over time</li>
            <li>🥧 Pie charts for category breakdowns</li>
            <li>📋 Detailed variance analysis tables</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
