import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import {
  Navigation,
  Person,
  Phone,
  Message,
  Share,
  Warning,
  LocationOn,
  AccessTime,
  Speed,
  DirectionsCar,
  MyLocation,
  Refresh,
  Cancel,
  CheckCircle,
  Info
} from '@mui/icons-material'

const RideTracking = () => {
  const [rideStatus, setRideStatus] = useState('active') // 'searching', 'confirmed', 'arriving', 'active', 'completed'
  const [driver, setDriver] = useState({
    name: 'John Smith',
    photo: '/drivers/john.jpg',
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    car: {
      make: 'Toyota',
      model: 'Camry',
      color: 'Silver',
      plate: 'ABC-1234'
    }
  })
  
  const [rideProgress, setRideProgress] = useState({
    estimatedArrival: '5 mins',
    distanceRemaining: '2.3 km',
    currentSpeed: '25 km/h',
    timeElapsed: '12 mins',
    totalDuration: '25 mins'
  })

  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 })
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [loading, setLoading] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (rideStatus === 'active') {
        // Simulate progress updates
        setRideProgress(prev => ({
          ...prev,
          distanceRemaining: Math.max(0.1, parseFloat(prev.distanceRemaining) - 0.1).toFixed(1) + ' km',
          estimatedArrival: Math.max(1, parseInt(prev.estimatedArrival) - 1) + ' mins',
          timeElapsed: Math.min(parseInt(prev.totalDuration), parseInt(prev.timeElapsed) + 1) + ' mins'
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [rideStatus])

  const handleCallDriver = () => {
    window.location.href = `tel:${driver.phone}`
  }

  const handleMessageDriver = () => {
    alert('Opening messaging app...')
  }

  const handleShareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Live Trip Sharing',
        text: 'Track my live trip with UrbanMove',
        url: window.location.href
      })
    }
  }

  const handleEmergency = () => {
    setShowEmergencyDialog(true)
  }

  const handleEmergencyCall = () => {
    // Call emergency services
    window.location.href = 'tel:911'
    setShowEmergencyDialog(false)
  }

  const handleCancelRide = () => {
    setShowCancelDialog(true)
  }

  const confirmCancelRide = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRideStatus('cancelled')
      setLoading(false)
      setShowCancelDialog(false)
    }, 1500)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'searching': return 'warning'
      case 'confirmed': return 'info'
      case 'arriving': return 'primary'
      case 'active': return 'success'
      case 'completed': return 'success'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case 'searching': return 'Finding nearby drivers...'
      case 'confirmed': return 'Driver has been assigned!'
      case 'arriving': return 'Driver is on the way to pickup'
      case 'active': return 'Trip in progress'
      case 'completed': return 'Trip completed'
      case 'cancelled': return 'Trip cancelled'
      default: return 'Unknown status'
    }
  }

  const getProgressPercentage = () => {
    const elapsed = parseInt(rideProgress.timeElapsed)
    const total = parseInt(rideProgress.totalDuration)
    return Math.min(100, (elapsed / total) * 100)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Ride Tracking
      </Typography>

      {/* Status Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <Chip
                label={getStatusMessage(rideStatus)}
                color={getStatusColor(rideStatus)}
                sx={{ mr: 2 }}
              />
              {rideStatus === 'active' && (
                <CircularProgress size={20} sx={{ mr: 1 }} />
              )}
            </Box>
            <IconButton onClick={() => window.location.reload()}>
              <Refresh />
            </IconButton>
          </Box>

          {rideStatus === 'active' && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Trip Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getProgressPercentage()}
                sx={{ mb: 2 }}
              />
              <Typography variant="caption" color="text.secondary">
                {rideProgress.timeElapsed} of {rideProgress.totalDuration}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Map Area */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 400, position: 'relative' }}>
            <CardContent sx={{ height: '100%', p: 0 }}>
              {/* Simulated Map */}
              <Box
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative'
                }}
              >
                <Box textAlign="center">
                  <Navigation sx={{ fontSize: 64, mb: 2 }} />
                  <Typography variant="h6">Live Map View</Typography>
                  <Typography variant="body2">
                    Driver location and route tracking
                  </Typography>
                </Box>
                
                {/* Simulated map controls */}
                <Box position="absolute" top={16} right={16}>
                  <IconButton sx={{ bgcolor: 'white', color: 'black', mr: 1 }}>
                    <MyLocation />
                  </IconButton>
                  <IconButton sx={{ bgcolor: 'white', color: 'black' }}>
                    <LocationOn />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Trip Progress */}
          {rideStatus === 'active' && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Trip Progress</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Estimated Arrival
                        </Typography>
                        <Typography variant="h6">{rideProgress.estimatedArrival}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <Speed sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Current Speed
                        </Typography>
                        <Typography variant="h6">{rideProgress.currentSpeed}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                      <Navigation sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Distance Remaining
                        </Typography>
                        <Typography variant="h6">{rideProgress.distanceRemaining}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Driver Info */}
          {(rideStatus === 'confirmed' || rideStatus === 'arriving' || rideStatus === 'active') && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Your Driver</Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                    <Person />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6">{driver.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {driver.rating} ⭐
                    </Typography>
                  </Box>
                </Box>

                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Vehicle
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <DirectionsCar sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {driver.car.year} {driver.car.make} {driver.car.model}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {driver.car.color} • {driver.car.plate}
                  </Typography>
                </Box>

                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Phone />}
                    onClick={handleCallDriver}
                    fullWidth
                  >
                    Call
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Message />}
                    onClick={handleMessageDriver}
                    fullWidth
                  >
                    Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Trip Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Trip Details</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Pickup"
                    secondary="123 Main St, Downtown"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dropoff"
                    secondary="456 Oak Ave, Uptown"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <AttachMoney />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Estimated Fare"
                    secondary="$25.50"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Actions</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShareTrip}
                  fullWidth
                >
                  Share Trip
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={handleCancelRide}
                  disabled={rideStatus === 'completed' || rideStatus === 'cancelled'}
                  fullWidth
                >
                  Cancel Ride
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Emergency />}
                  onClick={handleEmergency}
                  fullWidth
                >
                  Emergency
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Emergency Dialog */}
      <Dialog open={showEmergencyDialog} onClose={() => setShowEmergencyDialog(false)}>
        <DialogTitle>Emergency Help</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="body2">
              If you're in immediate danger, please call emergency services.
            </Typography>
          </Alert>
          <Typography variant="body2" paragraph>
            Emergency options:
          </Typography>
          <List>
            <ListItem button onClick={handleEmergencyCall}>
              <ListItemIcon>
                <Phone color="error" />
              </ListItemIcon>
              <ListItemText primary="Call 911 (Emergency Services)" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText primary="Report Safety Issue" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText primary="Contact Support" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEmergencyDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancel Ride</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Are you sure you want to cancel this ride? Cancellation fees may apply.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason for cancellation (optional)"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>Keep Ride</Button>
          <Button 
            onClick={confirmCancelRide} 
            color="error"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Cancelling...' : 'Cancel Ride'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default RideTracking
