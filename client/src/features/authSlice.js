import { createSlice } from '@reduxjs/toolkit'
import { getItem, setItem, removeItem } from '../utils/storage'

const storedUser = getItem('kbd-havya-user')
const storedToken = getItem('kbd-havya-token')

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  role: storedUser?.role || null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      state.role = user.role
      state.error = null
      setItem('kbd-havya-user', user)
      setItem('kbd-havya-token', token)
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.role = action.payload.role
      setItem('kbd-havya-user', action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.role = null
      state.loading = false
      state.error = null
      removeItem('kbd-havya-user')
      removeItem('kbd-havya-token')
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setCredentials, setUser, setLoading, setError, logout, clearError } = authSlice.actions

export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectRole = (state) => state.auth.role
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer