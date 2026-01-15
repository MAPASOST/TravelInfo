'use client'

import { useState } from 'react'
import { addPrice } from '@/lib/api'

interface PriceFormProps {
  destinationId: number
  onSuccess: () => void
  onCancel: () => void
}

export default function PriceForm({ destinationId, onSuccess, onCancel }: PriceFormProps) {
  const [price, setPrice] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [airline, setAirline] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await addPrice({
        destinationId,
        price: parseFloat(price),
        date,
        airline: airline || undefined,
      })
      setPrice('')
      setAirline('')
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add price')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="299.99"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Flight Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="airline">Airline (Optional)</label>
        <input
          type="text"
          id="airline"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
          placeholder="United Airlines"
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add Price'}
        </button>
        <button type="button" className="btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
