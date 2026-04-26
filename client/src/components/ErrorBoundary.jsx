import React from 'react'
import { Box, Typography, Button, Alert } from '@mui/material'
import { Refresh } from '@mui/icons-material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            borderRadius: 2,
            border: '1px solid #333',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
            Something went wrong
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, color: '#666', maxWidth: '400px' }}>
            This component encountered an error. You can continue using the app or try reloading this section.
          </Typography>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={this.handleRetry}
            sx={{ mb: 2, borderColor: '#00B4B4', color: '#00B4B4' }}
          >
            Try Again
          </Button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Alert severity="info" sx={{ textAlign: 'left', maxWidth: '600px' }}>
              <Typography variant="caption" component="pre" sx={{ fontSize: '0.7rem', whiteSpace: 'pre-wrap' }}>
                Error: {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </Typography>
            </Alert>
          )}
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
