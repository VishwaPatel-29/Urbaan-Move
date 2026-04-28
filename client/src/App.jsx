import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './features/store.js'
import AppRoutes from './routes/AppRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { useAnalytics } from './utils/analytics.js'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00B4B4',
    },
    secondary: {
      main: '#FFB6C1',
    },
    background: {
      default: '#000',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
})

function AppContent() {
  // Initialize Google Analytics with your tracking ID
  useAnalytics(import.meta.env.VITE_GA_TRACKING_ID || 'GA_MEASUREMENT_ID')

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

function App() {
  return <AppContent />
}

export default App