import { createSlice } from '@reduxjs/toolkit'
import { getItem, setItem } from '../utils/storage'

const storedTheme = getItem('urbanmove-theme') || 'dark'

const initialState = {
  theme: storedTheme,
  sidebarOpen: false,
  globalLoader: false,
  toastQueue: [],
  mobileMenuOpen: false,
  searchQuery: '',
  selectedFilters: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
      setItem('urbanmove-theme', action.payload)
      document.documentElement.classList.toggle('dark', action.payload === 'dark')
      document.body.classList.toggle('light', action.payload === 'light')
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      state.theme = newTheme
      setItem('urbanmove-theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      document.body.classList.toggle('light', newTheme === 'light')
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setGlobalLoader: (state, action) => {
      state.globalLoader = action.payload
    },
    addToast: (state, action) => {
      state.toastQueue.push(action.payload)
    },
    removeToast: (state, action) => {
      state.toastQueue = state.toastQueue.filter(t => t.id !== action.payload)
    },
    clearToastQueue: (state) => {
      state.toastQueue = []
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload
    },
    clearFilters: (state) => {
      state.selectedFilters = []
      state.searchQuery = ''
    },
  },
})

export const {
  setTheme,
  toggleTheme,
  setSidebarOpen,
  toggleSidebar,
  setGlobalLoader,
  addToast,
  removeToast,
  clearToastQueue,
  setMobileMenuOpen,
  toggleMobileMenu,
  setSearchQuery,
  setSelectedFilters,
  clearFilters,
} = uiSlice.actions

export const selectTheme = (state) => state.ui.theme
export const selectSidebarOpen = (state) => state.ui.sidebarOpen
export const selectGlobalLoader = (state) => state.ui.globalLoader
export const selectToastQueue = (state) => state.ui.toastQueue
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen
export const selectSearchQuery = (state) => state.ui.searchQuery
export const selectSelectedFilters = (state) => state.ui.selectedFilters

export default uiSlice.reducer