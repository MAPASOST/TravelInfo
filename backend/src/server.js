const express = require('express')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// API routes
app.use('/api', routes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Flight Price Tracker API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║   Flight Price Tracker API Server                    ║
║   Server running on http://localhost:${PORT}         ║
║   Database: SQLite (flight_tracker.db)                ║
╚═══════════════════════════════════════════════════════╝
  `)
})
