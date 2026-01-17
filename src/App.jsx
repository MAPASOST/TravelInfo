import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import BudgetVsActualChart from './components/BudgetVsActualChart';
import TrendChart from './components/TrendChart';
import CategoryPieChart from './components/CategoryPieChart';
import VarianceTable from './components/VarianceTable';
import FileUpload from './components/FileUpload';
import UpdateNotification from './components/UpdateNotification';
import { parseExcelData } from './utils/excelParser';

function App() {
  const [budgetData, setBudgetData] = useState(null);
  const [plData, setPlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  useEffect(() => {
    // Listen for update events if running in Electron
    if (window.electronAPI) {
      window.electronAPI.onUpdateAvailable(() => setUpdateAvailable(true));
      window.electronAPI.onUpdateDownloaded(() => setUpdateDownloaded(true));
    }
  }, []);

  const handleBudgetUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await parseExcelData(file);
      setBudgetData(data);
    } catch (err) {
      setError('Error parsing budget file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePLUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await parseExcelData(file);
      setPlData(data);
    } catch (err) {
      setError('Error parsing P&L file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasData = budgetData && plData;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Budget & P&L Visualization Dashboard</h1>
        <p className="subtitle">Upload your budget and profit & loss statements to generate comprehensive analysis</p>
      </header>

      {updateAvailable && !updateDownloaded && (
        <UpdateNotification message="A new update is being downloaded..." />
      )}
      {updateDownloaded && (
        <UpdateNotification
          message="Update downloaded! Click to restart and install."
          action={() => window.electronAPI.restartApp()}
          actionLabel="Restart Now"
        />
      )}

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

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {hasData && (
        <div className="dashboard">
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
