import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './features/store.js'
import AppRoutes from './routes/AppRoutes.jsx'

import { useAnalytics } from './utils/analytics.js'
import { lightTheme, darkTheme } from './theme/themeConfig.js'
import { selectTheme } from './features/uiSlice.js'

function AppContent() {
  // Initialize Google Analytics with your tracking ID
  useAnalytics(import.meta.env.VITE_GA_TRACKING_ID || 'GA_MEASUREMENT_ID')

  const currentTheme = useSelector(selectTheme)
  const theme = currentTheme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App