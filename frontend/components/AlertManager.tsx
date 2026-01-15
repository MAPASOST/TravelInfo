'use client'

import { useState } from 'react'
import { Alert, createAlert, updateAlert, deleteAlert } from '@/lib/api'

interface AlertManagerProps {
  destinationId: number
  alerts: Alert[]
  onUpdate: () => void
}

export default function AlertManager({ destinationId, alerts, onUpdate }: AlertManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [targetPrice, setTargetPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await createAlert({
        destinationId,
        targetPrice: parseFloat(targetPrice),
      })
      setTargetPrice('')
      setShowForm(false)
      onUpdate()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create alert')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAlert = async (alert: Alert) => {
    try {
      await updateAlert(alert.id, { isActive: !alert.isActive })
      onUpdate()
    } catch (err) {
      console.error('Failed to toggle alert', err)
    }
  }

  const handleDeleteAlert = async (alertId: number) => {
    if (!confirm('Are you sure you want to delete this alert?')) return

    try {
      await deleteAlert(alertId)
      onUpdate()
    } catch (err) {
      console.error('Failed to delete alert', err)
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>Price Alerts</h4>

      {alerts.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                background: '#f7fafc',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>Target: ${alert.targetPrice.toFixed(2)}</strong>
                <span
                  className={`alert-status ${alert.isActive ? 'active' : 'inactive'}`}
                  style={{ marginLeft: '1rem' }}
                >
                  {alert.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                  onClick={() => handleToggleAlert(alert)}
                >
                  {alert.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="btn btn-danger"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                  onClick={() => handleDeleteAlert(alert.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm ? (
        <button
          className="btn"
          style={{ marginTop: '1rem', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          onClick={() => setShowForm(true)}
        >
          Create New Alert
        </button>
      ) : (
        <form onSubmit={handleCreateAlert} style={{ marginTop: '1rem' }}>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label htmlFor="targetPrice">Target Price ($)</label>
            <input
              type="number"
              id="targetPrice"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="250.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Alert'}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setShowForm(false)
                setTargetPrice('')
                setError('')
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
