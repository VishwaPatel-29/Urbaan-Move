import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Paper,
  Divider,
  Avatar,
  Rating,
  TextField,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  LocationOn,
  AccessTime,
  Person,
  Phone,
  Email,
  Star,
  Payment,
  Receipt,
  Directions,
  Speed,
  LocalGasStation,
  Navigation,
  Share,
  Download,
  ReportProblem,
  ThumbUp,
  Message,
  CalendarToday,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Info,
  Warning
} from '@mui/icons-material'

const RideDetails = () => {
  const [ride] = useState({
    id: 'RIDE001',
    status: 'completed',
    date: '2024-01-15',
    time: '09:30 AM',
    driver: {
      name: 'Sarah Johnson',
      photo: '/drivers/sarah.jpg',
      rating: 4.9,
      trips: 1250,
      car: 'Toyota Camry - Silver',
      plate: 'ABC-1234'
    },
    pickup: {
      address: '123 Main St, Downtown',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    dropoff: {
      address: '456 Oak Ave, Uptown',
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    trip: {
      distance: '8.5 km',
      duration: '25 min',
      avgSpeed: '20.4 km/h',
      route: 'via Broadway, 5th Avenue'
    },
    payment: {
      method: 'Credit Card',
      amount: 25.50,
      fareBreakdown: {
        base: 15.00,
        distance: 8.50,
        time: 2.00,
        total: 25.50
      }
    },
    rating: 5
  })

  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [rating, setRating] = useState(0)
  const [reportReason, setReportReason] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRatingSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowRatingDialog(false)
      alert('Thank you for your rating!')
    }, 2000)
  }

  const handleReportSubmit = () => {
    if (!reportReason.trim()) {
      alert('Please provide a reason for your report')
      return
    }
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowReportDialog(false)
      setReportReason('')
      alert('Your report has been submitted. We will investigate this issue.')
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'cancelled': return 'error'
      case 'active': return 'primary'
      default: return 'default'
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Ride Details
      </Typography>

      {/* Ride Status Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Ride #{ride.id}
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip
                  label={ride.status}
                  color={getStatusColor(ride.status)}
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {ride.date} at {ride.time}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Download />}
            >
              Download Receipt
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>Pickup</Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">{ride.pickup.address}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>Dropoff</Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOn sx={{ mr: 1, color: 'error.main' }} />
                <Typography variant="body2">{ride.dropoff.address}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Driver Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Driver Information</Typography>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ mr: 3, width: 60, height: 60 }}>
              {ride.driver.name.charAt(0)}
            </Avatar>
            <Box flex={1}>
              <Typography variant="subtitle1">{ride.driver.name}</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Rating value={ride.driver.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {ride.driver.rating} • {ride.driver.trips} trips
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {ride.driver.car} • {ride.driver.plate}
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <IconButton color="primary">
                <Phone />
              </IconButton>
              <IconButton color="primary">
                <Message />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Trip Details */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Trip Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Directions sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{ride.trip.distance}</Typography>
                <Typography variant="caption" color="text.secondary">Distance</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <AccessTime sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
                <Typography variant="h6">{ride.trip.duration}</Typography>
                <Typography variant="caption" color="text.secondary">Duration</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Speed sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{ride.trip.avgSpeed}</Typography>
                <Typography variant="caption" color="text.secondary">Avg Speed</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Directions sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                <Typography variant="body2">{ride.trip.route}</Typography>
                <Typography variant="caption" color="text.secondary">Route</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Payment Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Base Fare</Typography>
                <Typography variant="body2">${ride.payment.fareBreakdown.base.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Distance Charge</Typography>
                <Typography variant="body2">${ride.payment.fareBreakdown.distance.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Time Charge</Typography>
                <Typography variant="body2">${ride.payment.fareBreakdown.time.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${ride.payment.amount.toFixed(2)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Payment Method</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Payment sx={{ color: 'primary.main' }} />
                <Typography variant="body2">{ride.payment.method}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Actions</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                startIcon={<Star />}
                onClick={() => setShowRatingDialog(true)}
                fullWidth
                disabled={ride.status !== 'completed'}
              >
                Rate Driver
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                startIcon={<ReportProblem />}
                onClick={() => setShowReportDialog(true)}
                fullWidth
              >
                Report Issue
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onClose={() => setShowRatingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Rate Your Driver</DialogTitle>
        <DialogContent>
          <Box textAlign="center" py={2}>
            <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2 }}>
              {ride.driver.name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{ride.driver.name}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {ride.driver.car} • {ride.driver.plate}
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              How was your ride with {ride.driver.name}?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRatingDialog(false)}>Cancel</Button>
          <Button
            onClick={handleRatingSubmit}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <ThumbUp />}
          >
            {loading ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onClose={() => setShowReportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Report an Issue</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Please describe the issue you experienced during this ride.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Issue Description"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Please provide details about the issue..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReportDialog(false)}>Cancel</Button>
          <Button
            onClick={handleReportSubmit}
            variant="contained"
            color="error"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <ReportProblem />}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default RideDetails
