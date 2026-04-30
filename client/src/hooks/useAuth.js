import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  selectUser,
  selectIsAuthenticated,
  selectToken,
  selectRole,
  selectAuthLoading,
  selectAuthError,
  setUser,
  logout,
  clearError,
} from '../features/authSlice'
import { authService } from '../services/api'
import { setItem, removeItem } from '../utils/storage'

export const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const token = useSelector(selectToken)
  const role = useSelector(selectRole)
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)

  const login = useCallback(async (credentials) => {
    try {
      dispatch(clearError())
      const response = await authService.login(credentials)
      
      if (response.success) {
        const { user, token } = response.data
        dispatch(setUser({ user, token }))
        setItem('urbanmove-token', token)
        setItem('urbanmove-user', user)
        return { success: true, user }
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }, [dispatch])



  const googleLogin = useCallback(async (googleToken) => {
    try {
      dispatch(clearError())
      const response = await authService.googleLogin(googleToken)
      
      if (response.success) {
        const { user, token } = response.data
        dispatch(setUser({ user, token }))
        setItem('urbanmove-token', token)
        setItem('urbanmove-user', user)
        return { success: true, user }
      } else {
        throw new Error(response.message || 'Google login failed')
      }
    } catch (error) {
      console.error('Google login error:', error)
      throw error
    }
  }, [dispatch])



  const logoutUser = useCallback(async () => {
    try {
      if (token) {
        await authService.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(logout())
      removeItem('urbanmove-token')
      removeItem('urbanmove-user')
    }
  }, [dispatch, token])

  const clearAuthError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  const hasRole = useCallback((requiredRole) => {
    if (!role) return false
    if (requiredRole === 'admin') return role === 'admin'
    if (requiredRole === 'driver') return role === 'driver' || role === 'admin'
    if (requiredRole === 'user') return true
    return false
  }, [role])

  const isAdmin = useCallback(() => role === 'admin', [role])
  const isDriver = useCallback(() => role === 'driver' || role === 'admin', [role])
  const isUser = useCallback(() => role === 'user' || role === 'driver' || role === 'admin', [role])

  const refreshToken = useCallback(async () => {
    try {
      const response = await authService.refreshToken()
      if (response.success) {
        const { token: newToken } = response.data
        setItem('urbanmove-token', newToken)
        return newToken
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      logoutUser()
      throw error
    }
  }, [logoutUser])

  return {
    // State
    user,
    isAuthenticated,
    token,
    role,
    loading,
    error,
    
    // Actions
    login,
    googleLogin,
    logout: logoutUser,
    clearError: clearAuthError,
    refreshToken,
    
    // Helpers
    hasRole,
    isAdmin,
    isDriver,
    isUser,
  }
}

export default useAuth