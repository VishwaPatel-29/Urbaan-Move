import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

export const useFetch = (url, options = {}) => {
  const { skip = false, dependencies = [], ...axiosOptions } = options
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (!url || skip) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.get(url, axiosOptions)
      setData(response.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [url, skip, ...dependencies])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = () => {
    fetchData()
  }

  const updateData = (updater) => {
    setData(prev => {
      const updated = typeof updater === 'function' ? updater(prev) : updater
      return updated
    })
  }

  return {
    data,
    loading,
    error,
    refetch,
    updateData,
    setData,
    setError,
  }
}

export default useFetch