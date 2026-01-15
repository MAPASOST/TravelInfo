'use client'

import { useState, useEffect } from 'react'
import DestinationForm from '@/components/DestinationForm'
import DestinationList from '@/components/DestinationList'
import PriceForm from '@/components/PriceForm'
import { getDestinations, Destination } from '@/lib/api'

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)

  const loadDestinations = async () => {
    try {
      setLoading(true)
      const data = await getDestinations()
      setDestinations(data)
      setError('')
    } catch (err) {
      setError('Failed to load destinations. Make sure the backend server is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDestinations()
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>✈️ Flight Price Tracker</h1>
        <p>Track flight prices and get predictions for your favorite destinations</p>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <h2>Add New Destination</h2>
        <DestinationForm onSuccess={loadDestinations} />
      </div>

      {selectedDestination && (
        <div className="card">
          <h2>Add Price for {selectedDestination.origin} → {selectedDestination.destination}</h2>
          <PriceForm
            destinationId={selectedDestination.id}
            onSuccess={() => {
              loadDestinations()
              setSelectedDestination(null)
            }}
            onCancel={() => setSelectedDestination(null)}
          />
        </div>
      )}

      <div className="card">
        <h2>Your Tracked Destinations</h2>
        {loading ? (
          <div className="loading">Loading destinations...</div>
        ) : (
          <DestinationList
            destinations={destinations}
            onSelectDestination={setSelectedDestination}
            onUpdate={loadDestinations}
          />
        )}
      </div>
    </div>
  )
}
