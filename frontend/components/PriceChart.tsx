'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Price } from '@/lib/api'
import { format } from 'date-fns'

interface PriceChartProps {
  prices: Price[]
}

export default function PriceChart({ prices }: PriceChartProps) {
  const chartData = prices
    .slice()
    .reverse()
    .map((price) => ({
      date: format(new Date(price.date), 'MMM dd'),
      price: price.price,
    }))

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#667eea" strokeWidth={2} name="Price ($)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
