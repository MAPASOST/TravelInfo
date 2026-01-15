# ✈️ Flight Price Tracker

A full-stack web application that tracks flight prices and predicts future costs based on historical data. Monitor multiple destinations, set price alerts, and make data-driven travel decisions.

## Features

- **Multi-Destination Tracking**: Track flight prices for multiple routes simultaneously
- **Price Prediction**: ML-powered predictions based on historical price trends
- **Price Alerts**: Get notified when prices drop below your target threshold
- **Visual Analytics**: Interactive charts showing price history and trends
- **Historical Data**: Store and analyze price data over time

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Recharts** - Data visualization
- **Axios** - API communication

### Backend
- **Node.js + Express** - REST API server
- **SQLite** - Lightweight embedded database
- **better-sqlite3** - Fast SQLite3 bindings

## Project Structure

```
TravelInfo/
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/             # API client and utilities
│   └── package.json
│
├── backend/              # Express API server
│   ├── src/
│   │   ├── server.js    # Main server file
│   │   ├── database.js  # Database initialization
│   │   ├── routes.js    # API endpoints
│   │   └── prediction.js # Price prediction model
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository** (if not already done)

```bash
cd TravelInfo
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

### Running the Application

You need to run both the backend and frontend servers:

**Terminal 1 - Backend Server:**

```bash
cd backend
npm start
```

The API server will start on `http://localhost:3001`

**Terminal 2 - Frontend Server:**

```bash
cd frontend
npm run dev
```

The web application will be available at `http://localhost:3000`

### Development Mode

For development with auto-reload:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Usage Guide

### 1. Add a Destination

- Enter origin airport code (e.g., JFK, LAX)
- Enter destination airport code (e.g., LHR, CDG)
- Click "Add Destination"

### 2. Track Prices

- Click "Add Price" on any destination card
- Enter the price you found
- Select the flight date
- Optionally add airline information
- Click "Add Price"

### 3. View Predictions

- Once you have 3+ price entries, predictions will automatically appear
- Predictions show expected price 30 days in the future
- Confidence level indicates prediction reliability
- More data = better predictions

### 4. Set Price Alerts

- Click "Show Details" on a destination
- Scroll to "Price Alerts" section
- Click "Create New Alert"
- Enter your target price
- The system will check new prices against your alert threshold

### 5. Analyze Trends

- Use "Show Details" to view:
  - Price history chart
  - Recent prices list
  - Price trend (increasing/decreasing/stable)
  - Prediction confidence metrics

## API Endpoints

### Destinations

- `GET /api/destinations` - Get all destinations with prices, alerts, and predictions
- `POST /api/destinations` - Create a new destination
- `DELETE /api/destinations/:id` - Delete a destination

### Prices

- `GET /api/prices/:destinationId` - Get all prices for a destination
- `POST /api/prices` - Add a new price entry

### Alerts

- `POST /api/alerts` - Create a price alert
- `PUT /api/alerts/:id` - Update alert (activate/deactivate or change target)
- `DELETE /api/alerts/:id` - Delete an alert

### Predictions

- `GET /api/predictions/:destinationId` - Get price prediction for a destination

## Price Prediction Model

The application uses a simple but effective prediction algorithm:

1. **Data Collection**: Gathers all historical prices for a route
2. **Smoothing**: Applies moving average to reduce noise
3. **Linear Regression**: Calculates price trend over time
4. **Future Projection**: Predicts price 30 days ahead
5. **Confidence Scoring**: Based on data quantity and variance

**Confidence Factors:**
- More historical data points = higher confidence
- Lower price variance = higher confidence
- Minimum 3 data points required for prediction

**Limitations:**
- Requires at least 3 price entries
- Best with 10+ entries over time
- Does not account for seasonality beyond linear trends
- Simple model suitable for basic predictions

## Database Schema

### Destinations Table
```sql
- id: INTEGER PRIMARY KEY
- origin: TEXT (airport code)
- destination: TEXT (airport code)
- created_at: DATETIME
```

### Prices Table
```sql
- id: INTEGER PRIMARY KEY
- destination_id: INTEGER (foreign key)
- price: REAL
- date: DATE
- airline: TEXT (optional)
- created_at: DATETIME
```

### Alerts Table
```sql
- id: INTEGER PRIMARY KEY
- destination_id: INTEGER (foreign key)
- target_price: REAL
- is_active: BOOLEAN
- created_at: DATETIME
```

## Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=3001
```

### Frontend Configuration

The frontend automatically connects to `http://localhost:3001`. To change this, modify `next.config.js`:

```javascript
env: {
  NEXT_PUBLIC_API_URL: 'http://your-api-url',
}
```

## Tips for Best Results

1. **Regular Updates**: Add price data consistently to improve predictions
2. **Multiple Sources**: Track prices from different airlines for the same route
3. **Time Range**: Collect data over weeks/months for seasonal insights
4. **Set Realistic Alerts**: Base target prices on historical trends
5. **Compare Routes**: Track multiple destinations to find the best deals

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify Node.js version (18.x+)
- Run `npm install` in backend directory

### Frontend won't connect to backend
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify API_URL in next.config.js

### Database errors
- Delete `backend/flight_tracker.db` and restart backend
- Check file permissions in backend directory

### No predictions showing
- Add at least 3 price entries for a destination
- Check backend console for prediction errors

## Future Enhancements

Potential features for future versions:

- Real-time flight API integration (Amadeus, Skyscanner)
- Email/SMS notifications for price alerts
- Seasonal trend analysis
- Multi-city route optimization
- User authentication and profiles
- Mobile responsive design improvements
- Export data to CSV
- Advanced ML models (LSTM, Prophet)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Acknowledgments

Built with modern web technologies and a focus on simplicity and user experience.
