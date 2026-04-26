import React, { Suspense, lazy } from 'react'
import { Box, Card, CardContent, Typography, Button, Alert, CircularProgress } from '@mui/material'
import { LocationOn, DirectionsBus } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'
import { selectUser } from '../features/authSlice'
import { useAuth } from '../hooks/useAuth'
import GOOGLE_MAPS_CONFIG from '../utils/googleMapsConfig'
import ErrorBoundary from './ErrorBoundary'

// Lazy load Google Maps component to prevent errors when not needed
const GoogleMapComponent = lazy(() => 
  import('./GoogleMapComponent').catch(() => ({
    default: () => (
      <Box sx={{ 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a',
        borderRadius: 2,
      }}>
        <Typography sx={{ color: '#666' }}>
          Maps unavailable
        </Typography>
      </Box>
    )
  }))
)

const LiveMap = () => {
  const theme = useSelector(selectTheme)
  const { isAuthenticated } = useAuth()
  
  // Check if Google Maps should be disabled
  const shouldDisableMaps = GOOGLE_MAPS_CONFIG.shouldDisableMaps()

  // Show fallback when Google Maps is disabled
  if (shouldDisableMaps) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DirectionsBus sx={{ color: '#00B4B4' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Live Map
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Track your shuttle and nearby vehicles
            </Typography>
          </Box>

          <Box sx={{ 
            height: '400px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' 
              : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ textAlign: 'center', px: 3 }}>
              <LocationOn sx={{ fontSize: 64, color: '#666', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, color: '#fff' }}>
                Map Feature Disabled
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
                Google Maps is not available in this demo. You can still use all other features of the app.
              </Typography>
              <Alert severity="info" sx={{ mb: 2, textAlign: 'left', maxWidth: '500px' }}>
                <Typography variant="caption" component="pre" sx={{ fontSize: '0.7rem', whiteSpace: 'pre-wrap' }}>
                  {GOOGLE_MAPS_CONFIG.getErrorMessage()}
                </Typography>
              </Alert>
            </Box>
          </Box>

          <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<LocationOn />}
              disabled
              sx={{ borderColor: '#333', color: '#666' }}
            >
              My Location (Maps Disabled)
            </Button>
          </Box>
        </CardContent>
      </Card>
    )
  }

  // Show Google Maps when enabled with error boundary
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DirectionsBus sx={{ color: '#00B4B4' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Live Map
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Track your shuttle and nearby vehicles
          </Typography>
        </Box>

        <ErrorBoundary>
          <Suspense fallback={
            <Box sx={{ 
              height: '400px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
              borderRadius: 2,
            }}>
              <CircularProgress sx={{ color: '#00B4B4' }} />
            </Box>
          }>
            <GoogleMapComponent apiKey={GOOGLE_MAPS_CONFIG.getApiKey()} />
          </Suspense>
        </ErrorBoundary>

        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<LocationOn />}
            sx={{ borderColor: '#00B4B4', color: '#00B4B4' }}
          >
            My Location
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LiveMap