const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'flight_tracker.db')
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Create tables
const initDatabase = () => {
  // Destinations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(origin, destination)
    )
  `)

  // Prices table
  db.exec(`
    CREATE TABLE IF NOT EXISTS prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination_id INTEGER NOT NULL,
      price REAL NOT NULL,
      date DATE NOT NULL,
      airline TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
    )
  `)

  // Create index for faster price queries
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_prices_destination_date
    ON prices(destination_id, date DESC)
  `)

  // Alerts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination_id INTEGER NOT NULL,
      target_price REAL NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
    )
  `)

  console.log('Database initialized successfully')
}

initDatabase()

module.exports = db
