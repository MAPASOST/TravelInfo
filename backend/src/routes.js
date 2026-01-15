const express = require('express')
const db = require('./database')
const { predictPrice, checkAlerts } = require('./prediction')

const router = express.Router()

// Get all destinations with their prices, alerts, and predictions
router.get('/destinations', (req, res) => {
  try {
    const destinations = db.prepare('SELECT * FROM destinations ORDER BY created_at DESC').all()

    const result = destinations.map((dest) => {
      // Get prices
      const prices = db
        .prepare(
          `
        SELECT * FROM prices
        WHERE destination_id = ?
        ORDER BY date DESC, created_at DESC
      `
        )
        .all(dest.id)

      // Get alerts
      const alerts = db
        .prepare(
          `
        SELECT * FROM alerts
        WHERE destination_id = ?
        ORDER BY created_at DESC
      `
        )
        .all(dest.id)

      // Get prediction
      const prediction = predictPrice(dest.id)

      return {
        ...dest,
        prices,
        alerts,
        prediction: prediction.predictedPrice ? prediction : null,
      }
    })

    res.json(result)
  } catch (error) {
    console.error('Error fetching destinations:', error)
    res.status(500).json({ error: 'Failed to fetch destinations' })
  }
})

// Create a new destination
router.post('/destinations', (req, res) => {
  try {
    const { origin, destination } = req.body

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' })
    }

    const stmt = db.prepare('INSERT INTO destinations (origin, destination) VALUES (?, ?)')
    const result = stmt.run(origin.toUpperCase(), destination.toUpperCase())

    const newDestination = db.prepare('SELECT * FROM destinations WHERE id = ?').get(result.lastInsertRowid)

    res.status(201).json(newDestination)
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'This route is already being tracked' })
    }
    console.error('Error creating destination:', error)
    res.status(500).json({ error: 'Failed to create destination' })
  }
})

// Delete a destination
router.delete('/destinations/:id', (req, res) => {
  try {
    const { id } = req.params
    const stmt = db.prepare('DELETE FROM destinations WHERE id = ?')
    const result = stmt.run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    res.json({ message: 'Destination deleted successfully' })
  } catch (error) {
    console.error('Error deleting destination:', error)
    res.status(500).json({ error: 'Failed to delete destination' })
  }
})

// Add a price for a destination
router.post('/prices', (req, res) => {
  try {
    const { destinationId, price, date, airline } = req.body

    if (!destinationId || !price || !date) {
      return res.status(400).json({ error: 'Destination ID, price, and date are required' })
    }

    // Verify destination exists
    const destination = db.prepare('SELECT * FROM destinations WHERE id = ?').get(destinationId)
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    const stmt = db.prepare('INSERT INTO prices (destination_id, price, date, airline) VALUES (?, ?, ?, ?)')
    const result = stmt.run(destinationId, price, date, airline || null)

    const newPrice = db.prepare('SELECT * FROM prices WHERE id = ?').get(result.lastInsertRowid)

    // Check if this price triggers any alerts
    const alertCheck = checkAlerts(destinationId, price)
    if (alertCheck.triggered) {
      console.log(`Alert triggered for destination ${destinationId}: Price ${price} is below target`)
    }

    res.status(201).json(newPrice)
  } catch (error) {
    console.error('Error adding price:', error)
    res.status(500).json({ error: 'Failed to add price' })
  }
})

// Get prices for a specific destination
router.get('/prices/:destinationId', (req, res) => {
  try {
    const { destinationId } = req.params
    const prices = db
      .prepare(
        `
      SELECT * FROM prices
      WHERE destination_id = ?
      ORDER BY date DESC, created_at DESC
    `
      )
      .all(destinationId)

    res.json(prices)
  } catch (error) {
    console.error('Error fetching prices:', error)
    res.status(500).json({ error: 'Failed to fetch prices' })
  }
})

// Create an alert
router.post('/alerts', (req, res) => {
  try {
    const { destinationId, targetPrice } = req.body

    if (!destinationId || !targetPrice) {
      return res.status(400).json({ error: 'Destination ID and target price are required' })
    }

    // Verify destination exists
    const destination = db.prepare('SELECT * FROM destinations WHERE id = ?').get(destinationId)
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    const stmt = db.prepare('INSERT INTO alerts (destination_id, target_price) VALUES (?, ?)')
    const result = stmt.run(destinationId, targetPrice)

    const newAlert = db.prepare('SELECT * FROM alerts WHERE id = ?').get(result.lastInsertRowid)

    res.status(201).json(newAlert)
  } catch (error) {
    console.error('Error creating alert:', error)
    res.status(500).json({ error: 'Failed to create alert' })
  }
})

// Update an alert
router.put('/alerts/:id', (req, res) => {
  try {
    const { id } = req.params
    const { isActive, targetPrice } = req.body

    const updates = []
    const values = []

    if (typeof isActive === 'boolean') {
      updates.push('is_active = ?')
      values.push(isActive ? 1 : 0)
    }

    if (targetPrice !== undefined) {
      updates.push('target_price = ?')
      values.push(targetPrice)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' })
    }

    values.push(id)

    const stmt = db.prepare(`UPDATE alerts SET ${updates.join(', ')} WHERE id = ?`)
    const result = stmt.run(...values)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Alert not found' })
    }

    const updatedAlert = db.prepare('SELECT * FROM alerts WHERE id = ?').get(id)

    res.json(updatedAlert)
  } catch (error) {
    console.error('Error updating alert:', error)
    res.status(500).json({ error: 'Failed to update alert' })
  }
})

// Delete an alert
router.delete('/alerts/:id', (req, res) => {
  try {
    const { id } = req.params
    const stmt = db.prepare('DELETE FROM alerts WHERE id = ?')
    const result = stmt.run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Alert not found' })
    }

    res.json({ message: 'Alert deleted successfully' })
  } catch (error) {
    console.error('Error deleting alert:', error)
    res.status(500).json({ error: 'Failed to delete alert' })
  }
})

// Get prediction for a specific destination
router.get('/predictions/:destinationId', (req, res) => {
  try {
    const { destinationId } = req.params
    const prediction = predictPrice(parseInt(destinationId))

    if (!prediction.predictedPrice) {
      return res.status(400).json({ error: prediction.message })
    }

    res.json(prediction)
  } catch (error) {
    console.error('Error generating prediction:', error)
    res.status(500).json({ error: 'Failed to generate prediction' })
  }
})

module.exports = router
