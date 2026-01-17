import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { mergeDataForComparison } from '../utils/excelParser';

const BudgetVsActualChart = ({ budgetData, plData }) => {
  const data = mergeDataForComparison(budgetData, plData);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{data.category}</p>
          <p style={{ color: '#667eea', margin: '4px 0' }}>
            Budget: {formatCurrency(data.budget)}
          </p>
          <p style={{ color: '#38ef7d', margin: '4px 0' }}>
            Actual: {formatCurrency(data.actual)}
          </p>
          <p style={{
            color: data.variance >= 0 ? '#e53e3e' : '#38a169',
            margin: '4px 0',
            fontWeight: 'bold'
          }}>
            Variance: {formatCurrency(data.variance)} ({data.variancePercent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="category"
          angle={-45}
          textAnchor="end"
          height={100}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="square"
        />
        <Bar
          dataKey="budget"
          fill="#667eea"
          name="Budget"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="actual"
          fill="#38ef7d"
          name="Actual"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetVsActualChart;
