import React, { useState } from 'react';
import { exportToPDF, exportChartsWithScreenshots } from '../utils/pdfExport';
import './ExportButtons.css';

const ExportButtons = ({ budgetData, plData }) => {
  const [exporting, setExporting] = useState(false);

  const handleExportReport = async () => {
    setExporting(true);
    try {
      await exportToPDF(budgetData, plData);
      // Success feedback could be added here
    } catch (error) {
      alert('Error exporting PDF: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const handleExportCharts = async () => {
    setExporting(true);
    try {
      await exportChartsWithScreenshots(budgetData, plData);
      // Success feedback could be added here
    } catch (error) {
      alert('Error exporting charts: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  if (!budgetData || !plData) {
    return null;
  }

  return (
    <div className="export-buttons">
      <button
        className="export-button"
        onClick={handleExportReport}
        disabled={exporting}
        title="Export detailed report as PDF"
      >
        {exporting ? '⏳' : '📄'} Export Report
      </button>
      <button
        className="export-button"
        onClick={handleExportCharts}
        disabled={exporting}
        title="Export charts and visualizations as PDF"
      >
        {exporting ? '⏳' : '📊'} Export Charts
      </button>
    </div>
  );
};

export default ExportButtons;
