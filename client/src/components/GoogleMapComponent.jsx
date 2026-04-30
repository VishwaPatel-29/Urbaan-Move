import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, TrafficLayer } from '@react-google-maps/api'
import { Box, CircularProgress } from '@mui/material'
import { LocationOn } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'
import { useAuth } from '../hooks/useAuth'

const containerStyle = {
  width: '100%',
  borderRadius: '12px',
}

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
}

const darkMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#22655c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38415e' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
]

const lightMapStyles = [
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9d8e8' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
]

const GoogleMapComponent = ({ 
  apiKey, 
  height = '400px',
  mapType = 'standard',
  zoom = 14,
  onZoomChange,
  showTraffic = false,
  centerLocation,
}) => {
  const theme = useSelector(selectTheme)
  const { isAuthenticated } = useAuth()
  
  const [map, setMap] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(defaultCenter)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [loading, setLoading] = useState(true)

  // Return early if no API key is provided
  if (!apiKey) {
    return (
      <Box sx={{ 
        height: height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
        borderRadius: 2,
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <LocationOn sx={{ fontSize: 48, color: '#666', mb: 2 }} />
          <Box sx={{ color: theme === 'dark' ? '#fff' : '#000' }}>
            Google Maps not available
          </Box>
          <Box sx={{ color: '#666', fontSize: '14px', mt: 1 }}>
            API key not configured
          </Box>
        </Box>
      </Box>
    )
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places', 'geometry'],
  })

  useEffect(() => {
    if (navigator.geolocation && isAuthenticated) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLoading(false)
        },
        (err) => {
          console.error('Geolocation error:', err)
          setLoading(false)
        }
      )
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const onLoad = useCallback((map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (loadError) {
    return (
      <Box sx={{ 
        height: height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
        borderRadius: 2,
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <LocationOn sx={{ fontSize: 48, color: '#666', mb: 2 }} />
          <Box sx={{ color: theme === 'dark' ? '#fff' : '#000' }}>
            Map failed to load
          </Box>
        </Box>
      </Box>
    )
  }

  if (!isLoaded) {
    return (
      <Box sx={{ 
        height: height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
        borderRadius: 2,
      }}>
        <CircularProgress sx={{ color: '#00B4B4' }} />
      </Box>
    )
  }

  return (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', height: height }}>
      <GoogleMap
        mapContainerStyle={{ ...containerStyle, height }}
        center={centerLocation || currentLocation}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onZoomChanged={() => {
          if (map && onZoomChange) onZoomChange(map.getZoom())
        }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: theme === 'dark' ? darkMapStyles : lightMapStyles,
          mapTypeId: mapType === 'standard' ? 'roadmap' : mapType
        }}
      >
        {showTraffic && <TrafficLayer />}
        <Marker
          position={currentLocation}
          icon={{
            path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
            fillColor: '#00B4B4',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
            scale: 2,
            anchor: { x: 12, y: 24 },
          }}
          title="Your Location"
        />

        {selectedVehicle && (
          <InfoWindow
            position={selectedVehicle.position}
            onCloseClick={() => setSelectedVehicle(null)}
          >
            <Box sx={{ p: 1 }}>
              <Box sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {selectedVehicle.name}
              </Box>
              <Box sx={{ fontSize: '0.8rem' }}>
                {selectedVehicle.driver}
              </Box>
              <Box sx={{ fontSize: '0.7rem' }}>
                ETA: {selectedVehicle.eta} mins
              </Box>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          <CircularProgress sx={{ color: '#00B4B4' }} />
        </Box>
      )}
    </Box>
  )
}

export default GoogleMapComponent
