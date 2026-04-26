import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material'
import { LocationOn, Schedule, CheckCircle, ArrowBack, ArrowForward } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { selectTheme } from '../features/uiSlice'
import { selectBookingStep, selectBookingData, setBookingStep, setBookingData, resetBooking } from '../features/rideSlice'
import { setSessionItem, getSessionItem, removeSessionItem } from '../utils/storage'
import Navbar from '../components/Navbar'
import LottieLoader from '../components/LottieLoader'
import LottieSuccess from '../components/LottieSuccess'

const steps = ['Pickup Location', 'Destination', 'Schedule', 'Confirm']

const campuses = [
  { id: 'tech-park', name: 'Tech Park Campus', address: '123 Business Park Drive' },
  { id: 'innovation-hub', name: 'Innovation Hub', address: '456 Tech Avenue' },
  { id: 'corporate-center', name: 'Corporate Center', address: '789 Enterprise Blvd' },
  { id: 'research-campus', name: 'Research Campus', address: '321 Innovation Way' },
  { id: 'headquarters', name: 'Headquarters', address: '555 Corporate Plaza' },
]

const Booking = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useSelector(selectTheme)
  const currentStep = useSelector(selectBookingStep)
  const bookingData = useSelector(selectBookingData)
  
  const [loading, setLoading] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  
  const savedStep = getSessionItem('kbd-havya-booking-step')
  const [activeStep, setActiveStep] = useState(savedStep || 0)

  useEffect(() => {
    if (savedStep) {
      dispatch(setBookingStep(savedStep))
    }
    return () => {
      removeSessionItem('kbd-havya-booking-step')
    }
  }, [])

  const handleNext = () => {
    setSessionItem('kbd-havya-booking-step', activeStep + 1)
    dispatch(setBookingStep(activeStep + 1))
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setSessionItem('kbd-havya-booking-step', activeStep - 1)
    dispatch(setBookingStep(activeStep - 1))
    setActiveStep((prev) => prev - 1)
  }

  const handleBookingDataChange = (field, value) => {
    dispatch(setBookingData({ [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setBookingComplete(true)
      dispatch(resetBooking())
      toast.success('Ride booked successfully!')
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (error) {
      toast.error('Failed to book ride. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (bookingComplete) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LottieSuccess />
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" sx={{ color: '#00B4B4', fontWeight: 700 }}>
            Ride Booked Successfully!
          </Typography>
          <Typography variant="body1" sx={{ color: '#a0a0a0', mt: 2 }}>
            Your shuttle will arrive shortly.
          </Typography>
        </Box>
      </Box>
    )
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <LocationOn sx={{ fontSize: 40, color: '#00B4B4' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Select Pickup Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Where should we pick you up?
                  </Typography>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Current Location"
                placeholder="Enter your pickup address"
                value={bookingData.pickupLocation || ''}
                onChange={(e) => handleBookingDataChange('pickupLocation', e.target.value)}
                sx={{ mb: 3 }}
              />
              
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleBookingDataChange('pickupLocation', '123 Main Street, Apt 4B')
                  toast.success('Location set to current GPS position')
                }}
                sx={{ borderColor: '#00B4B4', color: '#00B4B4' }}
              >
                Use Current Location
              </Button>
            </CardContent>
          </Card>
        )

      case 1:
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <LocationOn sx={{ fontSize: 40, color: '#FFB6C1' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Select Destination
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Where are you heading today?
                  </Typography>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                select
                label="Campus"
                value={bookingData.destination || ''}
                onChange={(e) => handleBookingDataChange('destination', e.target.value)}
              >
                {campuses.map((campus) => (
                  <MenuItem key={campus.id} value={campus.id}>
                    <Box>
                      <Typography variant="body1">{campus.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {campus.address}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Schedule sx={{ fontSize: 40, color: '#C2185B' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    When do you need a ride?
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Choose on-demand or schedule for later
                  </Typography>
                </Box>
              </Box>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant={bookingData.scheduled ? 'outlined' : 'contained'}
                    onClick={() => handleBookingDataChange('scheduled', false)}
                    sx={{
                      py: 2,
                      background: !bookingData.scheduled ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' : 'transparent',
                      borderColor: '#00B4B4',
                    }}
                  >
                    On-Demand
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant={bookingData.scheduled ? 'contained' : 'outlined'}
                    onClick={() => handleBookingDataChange('scheduled', true)}
                    sx={{
                      py: 2,
                      background: bookingData.scheduled ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' : 'transparent',
                      borderColor: '#00B4B4',
                    }}
                  >
                    Schedule
                  </Button>
                </Grid>
              </Grid>
              
              {bookingData.scheduled && (
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Pickup Time"
                  value={bookingData.pickupTime || ''}
                  onChange={(e) => handleBookingDataChange('pickupTime', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              )}
              
              {bookingData.scheduled && (
                <TextField
                  fullWidth
                  type="number"
                  label="Number of Passengers"
                  value={bookingData.passengers || 1}
                  onChange={(e) => handleBookingDataChange('passengers', parseInt(e.target.value))}
                  inputProps={{ min: 1, max: 6 }}
                  sx={{ mt: 2 }}
                />
              )}
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <CheckCircle sx={{ fontSize: 40, color: '#00B4B4' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Confirm Your Ride
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Review your booking details
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 1 }}>
                  Pickup Location
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 3 }}>
                  {bookingData.pickupLocation || 'Not selected'}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 1 }}>
                  Destination
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 3 }}>
                  {campuses.find(c => c.id === bookingData.destination)?.name || 'Not selected'}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 1 }}>
                  {bookingData.scheduled ? 'Scheduled Time' : 'Type'}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 3 }}>
                  {bookingData.scheduled ? bookingData.pickupTime : 'On-Demand (ASAP)'}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 1 }}>
                  Passengers
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {bookingData.passengers || 1} {bookingData.passengers === 1 ? 'person' : 'people'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Helmet>
        <title>Book a Ride | KBD-Havya</title>
        <meta name="description" content="Book an on-demand corporate shuttle with KBD-Havya." />
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#000' : '#f5f5f5' }}>
        <Navbar />

        <Box sx={{ maxWidth: 800, mx: 'auto', px: 2, py: 10 }}>
          <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
            Book a{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ride
            </Box>
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent(activeStep)}
            </motion.div>
          </AnimatePresence>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ borderColor: '#333', color: '#fff', '&:hover': { borderColor: '#00B4B4' } }}
            >
              Back
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNext}
                sx={{
                  background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' },
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Booking'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Booking