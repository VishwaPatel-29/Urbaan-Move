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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Rating,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material'
import {
  LocationOn,
  AccessTime,
  Person,
  Phone,
  Star,
  Navigation,
  FilterList,
  Search,
  DirectionsCar,
  AttachMoney,
  CalendarToday,
  LocalOffer,
  Speed,
  Map,
  Directions,
  MyLocation,
  Refresh,
  Schedule,
  TrendingUp
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FindRide = () => {
  const [searchData, setSearchData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    passengers: 1,
    rideType: 'standard'
  })

  const [availableRides, setAvailableRides] = useState([
    {
      id: 'RIDE001',
      driver: 'Sarah Johnson',
      rating: 4.9,
      car: 'Toyota Camry - Silver',
      plate: 'ABC-1234',
      estimatedTime: '5 min',
      estimatedPrice: 18.50,
      distance: '2.3 km',
      seats: 3,
      photo: '/drivers/sarah.jpg'
    },
    {
      id: 'RIDE002',
      driver: 'Mike Wilson',
      rating: 4.7,
      car: 'Honda Accord - Blue',
      plate: 'XYZ-5678',
      estimatedTime: '8 min',
      estimatedPrice: 22.00,
      distance: '3.1 km',
      seats: 2,
      photo: '/drivers/mike.jpg'
    },
    {
      id: 'RIDE003',
      driver: 'John Smith',
      rating: 4.8,
      car: 'Nissan Altima - Black',
      plate: 'DEF-9012',
      estimatedTime: '12 min',
      estimatedPrice: 25.75,
      distance: '4.5 km',
      seats: 4,
      photo: '/drivers/john.jpg'
    }
  ])

  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    minRating: 0,
    maxDistance: 10
  })

  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [selectedRide, setSelectedRide] = useState(null)
  const [loading, setLoading] = useState(false)

  const rideTypes = [
    { value: 'standard', label: 'Standard', price: 1.0, icon: <DirectionsCar /> },
    { value: 'comfort', label: 'Comfort', price: 1.3, icon: <DirectionsCar /> },
    { value: 'premium', label: 'Premium', price: 1.5, icon: <DirectionsCar /> },
    { value: 'xl', label: 'XL', price: 2.0, icon: <DirectionsCar /> }
  ]

  const handleSearch = () => {
    if (!searchData.pickup || !searchData.dropoff) {
      alert('Please enter both pickup and dropoff locations')
      return
    }
    // Simulate search
    console.log('Searching for rides...', searchData)
  }

  const handleBookRide = (ride) => {
    setSelectedRide(ride)
    setShowBookingDialog(true)
  }

  const confirmBooking = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowBookingDialog(false)
      alert(`Ride booked successfully with ${selectedRide.driver}!`)
    }, 2000)
  }

  const filteredRides = availableRides.filter(ride => {
    return (
      ride.price <= filters.priceRange[1] &&
      ride.price >= filters.priceRange[0] &&
      ride.rating >= filters.minRating &&
      parseFloat(ride.distance) <= filters.maxDistance
    )
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Find a Ride
          </Typography>

          {/* Search Form */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Where to?</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pickup Location"
                    value={searchData.pickup}
                    onChange={(e) => setSearchData(prev => ({ ...prev, pickup: e.target.value }))}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Dropoff Location"
                    value={searchData.dropoff}
                    onChange={(e) => setSearchData(prev => ({ ...prev, dropoff: e.target.value }))}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    value={searchData.date}
                    onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Time"
                    value={searchData.time}
                    onChange={(e) => setSearchData(prev => ({ ...prev, time: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Passengers</InputLabel>
                    <Select
                      value={searchData.passengers}
                      label="Passengers"
                      onChange={(e) => setSearchData(prev => ({ ...prev, passengers: e.target.value }))}
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <MenuItem key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Ride Type</InputLabel>
                    <Select
                      value={searchData.rideType}
                      label="Ride Type"
                      onChange={(e) => setSearchData(prev => ({ ...prev, rideType: e.target.value }))}
                    >
                      {rideTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box display="flex" alignItems="center">
                            {type.icon}
                            <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSearch}
                    startIcon={<Search />}
                    fullWidth
                  >
                    Search Rides
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>Price Range</Typography>
                  <Slider
                    value={filters.priceRange}
                    onChange={(e, value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                    valueLabelDisplay="on"
                    min={0}
                    max={100}
                    marks={[
                      { value: 0, label: '$0' },
                      { value: 50, label: '$50' },
                      { value: 100, label: '$100' }
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>Minimum Rating</Typography>
                  <Slider
                    value={filters.minRating}
                    onChange={(e, value) => setFilters(prev => ({ ...prev, minRating: value }))}
                    valueLabelDisplay="on"
                    min={0}
                    max={5}
                    step={0.5}
                    marks={[
                      { value: 0, label: 'Any' },
                      { value: 3, label: '3+' },
                      { value: 4, label: '4+' },
                      { value: 5, label: '5' }
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>Max Distance (km)</Typography>
                  <Slider
                    value={filters.maxDistance}
                    onChange={(e, value) => setFilters(prev => ({ ...prev, maxDistance: value }))}
                    valueLabelDisplay="on"
                    min={1}
                    max={20}
                    marks={[
                      { value: 1, label: '1km' },
                      { value: 10, label: '10km' },
                      { value: 20, label: '20km' }
                    ]}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Available Rides */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Available Rides</Typography>
                <Typography variant="body2" color="text.secondary">
                  {filteredRides.length} rides found
                </Typography>
              </Box>

              {filteredRides.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <DirectionsCar sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No rides found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your search criteria or filters
                  </Typography>
                </Box>
              ) : (
                <List>
                  {filteredRides.map((ride) => (
                    <ListItem key={ride.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {ride.driver.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box>
                            <Typography variant="subtitle1">{ride.driver}</Typography>
                            <Box display="flex" alignItems="center" gap={2} mt={1}>
                              <Rating value={ride.rating} precision={0.1} readOnly size="small" />
                              <Typography variant="caption" color="text.secondary">
                                {ride.car} • {ride.plate}
                              </Typography>
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                              <Box display="flex" alignItems="center" gap={2}>
                                <AccessTime sx={{ fontSize: 16 }} />
                                <Typography variant="body2">{ride.estimatedTime}</Typography>
                                <Directions sx={{ fontSize: 16 }} />
                                <Typography variant="body2">{ride.distance}</Typography>
                                <AttachMoney sx={{ fontSize: 16 }} />
                                <Typography variant="body2" fontWeight="medium">
                                  ${ride.estimatedPrice.toFixed(2)}
                                </Typography>
                              </Box>
                              <Chip
                                label={`${ride.seats} seats`}
                                size="small"
                                color={ride.seats >= 3 ? 'success' : 'default'}
                              />
                            </Box>
                          </Box>
                        }
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleBookRide(ride)}
                        sx={{ ml: 2 }}
                      >
                        Book
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Booking Dialog */}
          <Dialog open={showBookingDialog} onClose={() => setShowBookingDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogContent>
              {selectedRide && (
                <Box>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {selectedRide.driver.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{selectedRide.driver}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedRide.car} • {selectedRide.plate}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Route:</strong> {searchData.pickup} → {searchData.dropoff}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Estimated Time:</strong> {selectedRide.estimatedTime}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Distance:</strong> {selectedRide.distance}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Price:</strong> ${selectedRide.estimatedPrice.toFixed(2)}
                  </Typography>
                  
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Your booking will be confirmed once the driver accepts the request.
                    </Typography>
                  </Alert>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowBookingDialog(false)}>Cancel</Button>
              <Button
                onClick={confirmBooking}
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default FindRide
