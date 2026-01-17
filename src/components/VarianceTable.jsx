import React from 'react';
import { mergeDataForComparison } from '../utils/excelParser';
import './VarianceTable.css';

const VarianceTable = ({ budgetData, plData }) => {
  const data = mergeDataForComparison(budgetData, plData);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Calculate totals
  const totals = data.reduce((acc, row) => ({
    budget: acc.budget + row.budget,
    actual: acc.actual + row.actual,
    variance: acc.variance + row.variance
  }), { budget: 0, actual: 0, variance: 0 });

  const totalVariancePercent = totals.budget !== 0
    ? ((totals.variance / totals.budget) * 100).toFixed(1)
    : 0;

  return (
    <div className="variance-table-container">
      <table className="variance-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Actual</th>
            <th>Variance ($)</th>
            <th>Variance (%)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const isOverBudget = row.variance > 0;
            const isSignificant = Math.abs(row.variancePercent) > 10;

            return (
              <tr key={index} className={isSignificant ? 'significant' : ''}>
                <td className="category-cell">{row.category}</td>
                <td className="number-cell">{formatCurrency(row.budget)}</td>
                <td className="number-cell">{formatCurrency(row.actual)}</td>
                <td className={`number-cell ${isOverBudget ? 'negative' : 'positive'}`}>
                  {formatCurrency(row.variance)}
                </td>
                <td className={`number-cell ${isOverBudget ? 'negative' : 'positive'}`}>
                  {row.variancePercent > 0 ? '+' : ''}{row.variancePercent}%
                </td>
                <td className="status-cell">
                  {isOverBudget ? (
                    <span className="status-badge over">Over Budget</span>
                  ) : row.variance < 0 ? (
                    <span className="status-badge under">Under Budget</span>
                  ) : (
                    <span className="status-badge on-track">On Track</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="totals-row">
            <td className="category-cell"><strong>Total</strong></td>
            <td className="number-cell"><strong>{formatCurrency(totals.budget)}</strong></td>
            <td className="number-cell"><strong>{formatCurrency(totals.actual)}</strong></td>
            <td className={`number-cell ${totals.variance > 0 ? 'negative' : 'positive'}`}>
              <strong>{formatCurrency(totals.variance)}</strong>
            </td>
            <td className={`number-cell ${totals.variance > 0 ? 'negative' : 'positive'}`}>
              <strong>{totalVariancePercent > 0 ? '+' : ''}{totalVariancePercent}%</strong>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default VarianceTable;
