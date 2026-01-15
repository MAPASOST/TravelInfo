import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Destination {
  id: number
  origin: string
  destination: string
  createdAt: string
}

export interface Price {
  id: number
  destinationId: number
  price: number
  date: string
  airline?: string
  createdAt: string
}

export interface Alert {
  id: number
  destinationId: number
  targetPrice: number
  isActive: boolean
  createdAt: string
}

export interface Prediction {
  destinationId: number
  predictedPrice: number
  confidence: number
  date: string
}

export interface DestinationWithDetails extends Destination {
  prices: Price[]
  alerts: Alert[]
  prediction?: Prediction
}

// Destinations
export const getDestinations = async (): Promise<DestinationWithDetails[]> => {
  const response = await api.get('/destinations')
  return response.data
}

export const createDestination = async (data: {
  origin: string
  destination: string
}): Promise<Destination> => {
  const response = await api.post('/destinations', data)
  return response.data
}

export const deleteDestination = async (id: number): Promise<void> => {
  await api.delete(`/destinations/${id}`)
}

// Prices
export const addPrice = async (data: {
  destinationId: number
  price: number
  date: string
  airline?: string
}): Promise<Price> => {
  const response = await api.post('/prices', data)
  return response.data
}

export const getPrices = async (destinationId: number): Promise<Price[]> => {
  const response = await api.get(`/prices/${destinationId}`)
  return response.data
}

// Alerts
export const createAlert = async (data: {
  destinationId: number
  targetPrice: number
}): Promise<Alert> => {
  const response = await api.post('/alerts', data)
  return response.data
}

export const updateAlert = async (
  id: number,
  data: { isActive?: boolean; targetPrice?: number }
): Promise<Alert> => {
  const response = await api.put(`/alerts/${id}`, data)
  return response.data
}

export const deleteAlert = async (id: number): Promise<void> => {
  await api.delete(`/alerts/${id}`)
}

// Predictions
export const getPrediction = async (destinationId: number): Promise<Prediction> => {
  const response = await api.get(`/predictions/${destinationId}`)
  return response.data
}
