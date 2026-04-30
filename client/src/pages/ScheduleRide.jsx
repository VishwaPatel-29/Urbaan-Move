import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Slider,
  IconButton
} from '@mui/material'
import {
  Schedule,
  LocationOn,
  AccessTime,
  CalendarToday,
  ArrowForward,
  ArrowBack,
  Person,
  DirectionsCar,
  AttachMoney,
  Loop,
  Notifications,
  CheckCircle,
  Error,
  Info,
  MyLocation,
  Add,
  Remove
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ScheduleRide = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [scheduleData, setScheduleData] = useState({
    pickup: '',
    dropoff: '',
    date: null,
    time: null,
    passengers: 1,
    rideType: 'standard',
    isRecurring: false,
    recurringPattern: 'weekly',
    recurringDays: [],
    specialInstructions: '',
    estimatedPrice: 0
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [scheduledRides, setScheduledRides] = useState([])

  const steps = [
    'Route Information',
    'Schedule Details',
    'Preferences',
    'Confirmation'
  ]

  const rideTypes = [
    { value: 'standard', label: 'Standard', multiplier: 1.0 },
    { value: 'comfort', label: 'Comfort', multiplier: 1.3 },
    { value: 'premium', label: 'Premium', multiplier: 1.6 }
  ]

  const recurringPatterns = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom' }
  ]

  const weekDays = [
    { value: 'monday', label: 'Mon' },
    { value: 'tuesday', label: 'Tue' },
    { value: 'wednesday', label: 'Wed' },
    { value: 'thursday', label: 'Thu' },
    { value: 'friday', label: 'Fri' },
    { value: 'saturday', label: 'Sat' },
    { value: 'sunday', label: 'Sun' }
  ]

  const handleInputChange = (field) => (event) => {
    setScheduleData(prev => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleDateChange = (date) => {
    setScheduleData(prev => ({ ...prev, date }))
  }

  const handleTimeChange = (time) => {
    setScheduleData(prev => ({ ...prev, time }))
  }

  const handleRecurringDayToggle = (day) => {
    setScheduleData(prev => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(day)
        ? prev.recurringDays.filter(d => d !== day)
        : [...prev.recurringDays, day]
    }))
  }

  const calculateEstimatedPrice = () => {
    // Simulate price calculation based on distance and ride type
    const basePrice = 15.00
    const rideType = rideTypes.find(rt => rt.value === scheduleData.rideType)
    const passengerMultiplier = Math.max(1, scheduleData.passengers * 0.8)
    const estimatedPrice = basePrice * rideType.multiplier * passengerMultiplier
    setScheduleData(prev => ({ ...prev, estimatedPrice }))
  }

  React.useEffect(() => {
    calculateEstimatedPrice()
  }, [scheduleData.rideType, scheduleData.passengers])

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0) {
      if (!scheduleData.pickup) {
        newErrors.pickup = 'Pickup location is required'
      }
      if (!scheduleData.dropoff) {
        newErrors.dropoff = 'Dropoff location is required'
      }
    }

    if (step === 1) {
      if (!scheduleData.date) {
        newErrors.date = 'Date is required'
      }
      if (!scheduleData.time) {
        newErrors.time = 'Time is required'
      }
      if (scheduleData.isRecurring && scheduleData.recurringDays.length === 0) {
        newErrors.recurringDays = 'Select at least one day for recurring rides'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleScheduleRide = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newRide = {
        ...scheduleData,
        id: `SCHEDULED${Date.now()}`,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      }
      setScheduledRides(prev => [...prev, newRide])
      setLoading(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const handleUseCurrentLocation = (field) => {
    const location = 'Current Location'
    setScheduleData(prev => ({ ...prev, [field]: location }))
  }

  const handlePassengerChange = (increment) => {
    const newValue = Math.max(1, Math.min(8, scheduleData.passengers + increment))
    setScheduleData(prev => ({ ...prev, passengers: newValue }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Schedule a Ride
          </Typography>

          <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Card>
            <CardContent sx={{ p: 4 }}>
              {currentStep === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Route Information</Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Pickup Location"
                        value={scheduleData.pickup}
                        onChange={handleInputChange('pickup')}
                        error={!!errors.pickup}
                        helperText={errors.pickup}
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={() => handleUseCurrentLocation('pickup')}>
                              <MyLocation />
                            </IconButton>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Dropoff Location"
                        value={scheduleData.dropoff}
                        onChange={handleInputChange('dropoff')}
                        error={!!errors.dropoff}
                        helperText={errors.dropoff}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Ride Type</InputLabel>
                        <Select
                          value={scheduleData.rideType}
                          label="Ride Type"
                          onChange={handleInputChange('rideType')}
                        >
                          {rideTypes.map(type => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label} ({type.multiplier}x price)
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" gutterBottom>Passengers</Typography>
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => handlePassengerChange(-1)}>
                          <Remove />
                        </IconButton>
                        <Typography variant="h6" sx={{ mx: 2 }}>
                          {scheduleData.passengers}
                        </Typography>
                        <IconButton onClick={() => handlePassengerChange(1)}>
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Special Instructions (Optional)"
                        value={scheduleData.specialInstructions}
                        onChange={handleInputChange('specialInstructions')}
                        placeholder="Any special requirements or preferences..."
                      />
                    </Grid>
                  </Grid>

                  <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Estimated Price</Typography>
                    <Typography variant="h5" color="primary.main">
                      ${scheduleData.estimatedPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Final price may vary based on traffic and demand
                    </Typography>
                  </Paper>
                </Box>
              )}

              {currentStep === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Schedule Details</Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        value={scheduleData.date}
                        onChange={(e) => handleDateChange(e.target.value)}
                        error={!!errors.date}
                        helperText={errors.date}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="time"
                        label="Time"
                        value={scheduleData.time}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        error={!!errors.time}
                        helperText={errors.time}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={scheduleData.isRecurring}
                            onChange={handleInputChange('isRecurring')}
                          />
                        }
                        label="Set as recurring ride"
                      />
                    </Grid>
                    
                    {scheduleData.isRecurring && (
                      <>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel>Recurring Pattern</InputLabel>
                            <Select
                              value={scheduleData.recurringPattern}
                              label="Recurring Pattern"
                              onChange={handleInputChange('recurringPattern')}
                            >
                              {recurringPatterns.map(pattern => (
                                <MenuItem key={pattern.value} value={pattern.value}>
                                  {pattern.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        
                        {scheduleData.recurringPattern === 'weekly' && (
                          <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>Select Days</Typography>
                            <Box display="flex" gap={1}>
                              {weekDays.map(day => (
                                <Chip
                                  key={day.value}
                                  label={day.label}
                                  clickable
                                  color={scheduleData.recurringDays.includes(day.value) ? 'primary' : 'default'}
                                  onClick={() => handleRecurringDayToggle(day.value)}
                                  size="small"
                                />
                              ))}
                            </Box>
                            {errors.recurringDays && (
                              <Typography variant="caption" color="error">
                                {errors.recurringDays}
                              </Typography>
                            )}
                          </Grid>
                        )}
                      </>
                    )}
                  </Grid>

                  <Alert severity="info" sx={{ mt: 3 }}>
                    <Typography variant="body2">
                      Your ride will be scheduled for {scheduleData.date || 'selected date'} at {scheduleData.time || 'selected time'}.
                      {scheduleData.isRecurring && ' This will repeat according to your recurring pattern.'}
                    </Typography>
                  </Alert>
                </Box>
              )}

              {currentStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Preferences</Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Notification Preferences</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Notifications />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Send me ride reminders"
                            secondary="Get notified 30 minutes before pickup"
                          />
                          <Switch defaultChecked />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Notifications />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Driver assignment notifications"
                            secondary="Notify when driver is assigned"
                          />
                          <Switch defaultChecked />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Notifications />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Price change alerts"
                            secondary="Alert if price changes significantly"
                          />
                          <Switch />
                        </ListItem>
                      </List>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Payment Method</Typography>
                      <FormControl fullWidth>
                        <Select defaultValue="card">
                          <MenuItem value="card">Credit Card</MenuItem>
                          <MenuItem value="wallet">Wallet</MenuItem>
                          <MenuItem value="cash">Cash</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>Additional Options</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Info />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Allow driver to contact me"
                            secondary="Driver can call or message for coordination"
                          />
                          <Switch defaultChecked />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Info />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Share trip status"
                            secondary="Share live trip status with contacts"
                          />
                          <Switch />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {currentStep === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Review & Confirm</Typography>
                  
                  <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Route Summary</Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOn sx={{ mr: 1, color: 'success.main' }} />
                      <Typography variant="body2">{scheduleData.pickup}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOn sx={{ mr: 1, color: 'error.main' }} />
                      <Typography variant="body2">{scheduleData.dropoff}</Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>Schedule Details</Typography>
                    <Typography variant="body2">
                      Date: {scheduleData.date || 'Not selected'}
                    </Typography>
                    <Typography variant="body2">
                      Time: {scheduleData.time || 'Not selected'}
                    </Typography>
                    <Typography variant="body2">
                      Ride Type: {rideTypes.find(rt => rt.value === scheduleData.rideType)?.label}
                    </Typography>
                    <Typography variant="body2">
                      Passengers: {scheduleData.passengers}
                    </Typography>
                    
                    {scheduleData.isRecurring && (
                      <>
                        <Typography variant="body2">
                          Recurring: {recurringPatterns.find(rp => rp.value === scheduleData.recurringPattern)?.label}
                        </Typography>
                        {scheduleData.recurringDays.length > 0 && (
                          <Typography variant="body2">
                            Days: {scheduleData.recurringDays.map(day => 
                              weekDays.find(wd => wd.value === day)?.label
                            ).join(', ')}
                          </Typography>
                        )}
                      </>
                    )}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>Estimated Cost</Typography>
                    <Typography variant="h5" color="primary.main">
                      ${scheduleData.estimatedPrice.toFixed(2)}
                    </Typography>
                  </Paper>

                  <Alert severity="success" sx={{ mt: 3 }}>
                    <Typography variant="body2">
                      Your ride will be scheduled and you'll receive confirmation shortly.
                    </Typography>
                  </Alert>
                </Box>
              )}

              <Box display="flex" justifyContent="space-between" mt={4}>
                {currentStep > 0 && (
                  <Button 
                    variant="outlined" 
                    onClick={handleBack}
                    disabled={loading}
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    startIcon={<ArrowForward />}
                    sx={{ ml: 'auto' }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleScheduleRide}
                    disabled={loading}
                    startIcon={loading ? null : <Schedule />}
                    sx={{ ml: 'auto' }}
                  >
                    {loading ? 'Scheduling...' : 'Schedule Ride'}
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Confirmation Dialog */}
          <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Ride Scheduled!</DialogTitle>
            <DialogContent>
              <Box textAlign="center" py={2}>
                <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Your ride has been scheduled successfully
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You'll receive a confirmation notification shortly.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowConfirmation(false)} variant="outlined">
                Schedule Another
              </Button>
              <Button onClick={() => window.location.href = '/dashboard'} variant="contained">
                Go to Dashboard
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default ScheduleRide
