const db = require('./database')

/**
 * Simple linear regression implementation
 */
function linearRegression(x, y) {
  const n = x.length
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumXX = 0

  for (let i = 0; i < n; i++) {
    sumX += x[i]
    sumY += y[i]
    sumXY += x[i] * y[i]
    sumXX += x[i] * x[i]
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  return { slope, intercept }
}

/**
 * Calculate moving average for smoothing
 */
function movingAverage(data, windowSize) {
  const result = []
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1)
    const window = data.slice(start, i + 1)
    const avg = window.reduce((sum, val) => sum + val, 0) / window.length
    result.push(avg)
  }
  return result
}

/**
 * Predict flight price based on historical data
 */
function predictPrice(destinationId) {
  // Get all historical prices for this destination
  const prices = db
    .prepare(
      `
    SELECT price, date
    FROM prices
    WHERE destination_id = ?
    ORDER BY date ASC
  `
    )
    .all(destinationId)

  if (prices.length < 3) {
    return {
      destinationId,
      predictedPrice: null,
      confidence: 0,
      message: 'Not enough data for prediction (minimum 3 prices required)',
    }
  }

  // Convert dates to timestamps (days since first price)
  const firstDate = new Date(prices[0].date).getTime()
  const x = prices.map((p) => (new Date(p.date).getTime() - firstDate) / (1000 * 60 * 60 * 24))
  const y = prices.map((p) => p.price)

  // Apply moving average for noise reduction
  const smoothedY = movingAverage(y, Math.min(3, prices.length))

  // Perform linear regression
  const { slope, intercept } = linearRegression(x, smoothedY)

  // Predict for 30 days in the future
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 30)
  const futureDays = (futureDate.getTime() - firstDate) / (1000 * 60 * 60 * 24)
  let predictedPrice = slope * futureDays + intercept

  // Calculate confidence based on data points and trend stability
  // More data points = higher confidence
  // Less variance = higher confidence
  const variance = y.reduce((sum, val) => sum + Math.pow(val - y.reduce((a, b) => a + b) / y.length, 2), 0) / y.length
  const coefficientOfVariation = Math.sqrt(variance) / (y.reduce((a, b) => a + b) / y.length)

  let confidence = Math.min(95, 40 + prices.length * 5 - coefficientOfVariation * 100)
  confidence = Math.max(30, Math.round(confidence))

  // Ensure predicted price is reasonable (not negative, not too far from average)
  const avgPrice = y.reduce((a, b) => a + b) / y.length
  if (predictedPrice < 0) predictedPrice = avgPrice * 0.8
  if (predictedPrice > avgPrice * 2) predictedPrice = avgPrice * 1.2

  return {
    destinationId,
    predictedPrice: Math.round(predictedPrice * 100) / 100,
    confidence,
    date: futureDate.toISOString().split('T')[0],
    trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
    dataPoints: prices.length,
  }
}

/**
 * Check if current price triggers any alerts
 */
function checkAlerts(destinationId, currentPrice) {
  const alerts = db
    .prepare(
      `
    SELECT * FROM alerts
    WHERE destination_id = ? AND is_active = 1
  `
    )
    .all(destinationId)

  const triggered = alerts.filter((alert) => currentPrice <= alert.target_price)

  return {
    triggered: triggered.length > 0,
    alerts: triggered,
  }
}

module.exports = {
  predictPrice,
  checkAlerts,
}
