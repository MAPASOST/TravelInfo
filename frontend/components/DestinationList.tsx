'use client'

import { useState } from 'react'
import { DestinationWithDetails } from '@/lib/api'
import PriceChart from './PriceChart'
import AlertManager from './AlertManager'

interface DestinationListProps {
  destinations: DestinationWithDetails[]
  onSelectDestination: (destination: DestinationWithDetails) => void
  onUpdate: () => void
}

export default function DestinationList({
  destinations,
  onSelectDestination,
  onUpdate,
}: DestinationListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  if (destinations.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
        No destinations tracked yet. Add your first destination above!
      </p>
    )
  }

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="grid">
      {destinations.map((dest) => {
        const latestPrice = dest.prices[0]
        const activeAlert = dest.alerts.find((a) => a.isActive)

        return (
          <div key={dest.id}>
            <div className="destination-card">
              <div className="route">
                {dest.origin} → {dest.destination}
              </div>

              {latestPrice ? (
                <>
                  <div className="price">${latestPrice.price.toFixed(2)}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    Last updated: {new Date(latestPrice.date).toLocaleDateString()}
                  </div>
                </>
              ) : (
                <div style={{ color: '#666', margin: '0.5rem 0' }}>No prices recorded yet</div>
              )}

              {dest.prediction && (
                <div className="prediction">
                  Predicted: ${dest.prediction.predictedPrice.toFixed(2)} (
                  {dest.prediction.confidence}% confidence)
                </div>
              )}

              {activeAlert && (
                <div className="alert-status active">
                  Alert: ${activeAlert.targetPrice.toFixed(2)}
                </div>
              )}

              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn"
                  style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                  onClick={() => onSelectDestination(dest)}
                >
                  Add Price
                </button>
                <button
                  className="btn"
                  style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                  onClick={() => toggleExpanded(dest.id)}
                >
                  {expandedId === dest.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>

            {expandedId === dest.id && (
              <div className="card" style={{ marginTop: '1rem' }}>
                <h3>Price History</h3>
                {dest.prices.length > 0 ? (
                  <>
                    <PriceChart prices={dest.prices} />
                    <div style={{ marginTop: '1rem' }}>
                      <h4>Recent Prices:</h4>
                      <ul style={{ marginTop: '0.5rem' }}>
                        {dest.prices.slice(0, 5).map((price) => (
                          <li key={price.id} style={{ marginBottom: '0.5rem' }}>
                            ${price.price.toFixed(2)} - {new Date(price.date).toLocaleDateString()}
                            {price.airline && ` (${price.airline})`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p>No price history available</p>
                )}

                <AlertManager destinationId={dest.id} alerts={dest.alerts} onUpdate={onUpdate} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
