'use client'

import { useState } from 'react'
import { createDestination } from '@/lib/api'

interface DestinationFormProps {
  onSuccess: () => void
}

export default function DestinationForm({ onSuccess }: DestinationFormProps) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await createDestination({ origin, destination })
      setOrigin('')
      setDestination('')
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create destination')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label htmlFor="origin">Origin Airport (e.g., JFK, LAX)</label>
        <input
          type="text"
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          placeholder="JFK"
          maxLength={3}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination">Destination Airport (e.g., LAX, LHR)</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          placeholder="LAX"
          maxLength={3}
          required
        />
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Adding...' : 'Add Destination'}
      </button>
    </form>
  )
}
