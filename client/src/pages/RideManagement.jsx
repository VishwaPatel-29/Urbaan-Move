import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  Alert,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Grid,
  LinearProgress
} from '@mui/material'
import {
  DirectionsCar,
  Edit,
  Delete,
  Search,
  FilterList,
  Add,
  CheckCircle,
  Warning,
  Error,
  Person,
  LocationOn,
  AccessTime,
  AttachMoney,
  Phone,
  Email,
  Star,
  Visibility,
  Download,
  Refresh,
  Map,
  Schedule,
  Assessment
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RideManagement = () => {
  const [rides, setRides] = useState([
    {
      id: 'RIDE001',
      passenger: 'John Smith',
      passengerId: 'USR001',
      driver: 'Sarah Johnson',
      driverId: 'USR002',
      pickup: '123 Main St, Downtown',
      dropoff: '456 Oak Ave, Uptown',
      status: 'completed',
      fare: 25.50,
      paymentStatus: 'paid',
      date: '2024-01-15',
      time: '09:30 AM',
      duration: '25 min',
      distance: '8.5 km',
      rating: 5,
      vehicle: 'Toyota Camry - Silver (ABC-1234)',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'RIDE002',
      passenger: 'Mike Wilson',
      passengerId: 'USR003',
      driver: 'John Smith',
      driverId: 'USR001',
      pickup: '789 Elm St, Midtown',
      dropoff: '321 Pine Rd, Suburbs',
      status: 'cancelled',
      fare: 18.75,
      paymentStatus: 'refunded',
      date: '2024-01-14',
      time: '02:15 PM',
      duration: 'N/A',
      distance: 'N/A',
      rating: 0,
      vehicle: 'Honda Accord - Blue (XYZ-5678)',
      paymentMethod: 'Wallet'
    },
    {
      id: 'RIDE003',
      passenger: 'Emma Davis',
      passengerId: 'USR004',
      driver: 'Sarah Johnson',
      driverId: 'USR002',
      pickup: '555 Beach Blvd',
      dropoff: '777 Mountain View',
      status: 'active',
      fare: 32.00,
      paymentStatus: 'pending',
      date: '2024-01-20',
      time: '06:45 PM',
      duration: '15 min (ongoing)',
      distance: '5.2 km (ongoing)',
      rating: 0,
      vehicle: 'Toyota Camry - Silver (ABC-1234)',
      paymentMethod: 'Credit Card'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [showRideDialog, setShowRideDialog] = useState(false)
  const [selectedRide, setSelectedRide] = useState(null)
  const [loading, setLoading] = useState(false)

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'scheduled', label: 'Scheduled' }
  ]

  const paymentStatuses = [
    { value: 'all', label: 'All Payment' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'failed', label: 'Failed' }
  ]

  const stats = {
    totalRides: rides.length,
    activeRides: rides.filter(r => r.status === 'active').length,
    completedRides: rides.filter(r => r.status === 'completed').length,
    cancelledRides: rides.filter(r => r.status === 'cancelled').length,
    totalRevenue: rides.filter(r => r.paymentStatus === 'paid').reduce((sum, r) => sum + r.fare, 0),
    averageRating: rides.filter(r => r.rating > 0).reduce((sum, r) => sum + r.rating, 0) / rides.filter(r => r.rating > 0).length
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleStatusChange = (rideId, newStatus) => {
    setRides(prev => prev.map(ride => 
      ride.id === rideId ? { ...ride, status: newStatus } : ride
    ))
  }

  const handleViewRide = (ride) => {
    setSelectedRide(ride)
    setShowRideDialog(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'primary'
      case 'completed': return 'success'
      case 'cancelled': return 'error'
      case 'scheduled': return 'warning'
      default: return 'default'
    }
  }

  const getPaymentColor = (status) => {
    switch (status) {
      case 'paid': return 'success'
      case 'pending': return 'warning'
      case 'refunded': return 'info'
      case 'failed': return 'error'
      default: return 'default'
    }
  }

  const filteredRides = rides.filter(ride => {
    const matchesSearch = ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ride.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || ride.paymentStatus === paymentFilter
    
    return matchesSearch && matchesStatus && matchesPayment
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Ride Management
          </Typography>

          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <DirectionsCar sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h4">{stats.totalRides}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Rides</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Schedule sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h4">{stats.activeRides}</Typography>
                      <Typography variant="body2" color="text.secondary">Active Rides</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <CheckCircle sx={{ mr: 2, color: 'success.main' }} />
                    <Box>
                      <Typography variant="h4">{stats.completedRides}</Typography>
                      <Typography variant="body2" color="text.secondary">Completed</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <AttachMoney sx={{ mr: 2, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.totalRevenue.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters and Actions */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Ride List</Typography>
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                  >
                    Schedule Ride
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                  >
                    Export
                  </Button>
                  <IconButton>
                    <Refresh />
                  </IconButton>
                </Box>
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search rides..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      {statuses.map(status => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Payment Status</InputLabel>
                    <Select
                      value={paymentFilter}
                      label="Payment Status"
                      onChange={(e) => setPaymentFilter(e.target.value)}
                    >
                      {paymentStatuses.map(status => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Date Range</InputLabel>
                    <Select
                      value={dateFilter}
                      label="Date Range"
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Time</MenuItem>
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="week">Last 7 Days</MenuItem>
                      <MenuItem value="month">Last 30 Days</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Rides Table */}
          <Card>
            <CardContent>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ride ID</TableCell>
                      <TableCell>Passenger</TableCell>
                      <TableCell>Driver</TableCell>
                      <TableCell>Route</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Fare</TableCell>
                      <TableCell>Date/Time</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRides.map((ride) => (
                      <TableRow key={ride.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {ride.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                              {ride.passenger.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2">{ride.passenger}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {ride.passengerId}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                              {ride.driver.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2">{ride.driver}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {ride.driverId}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <LocationOn sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                              <Typography variant="caption" sx={{ maxWidth: 120 }}>
                                {ride.pickup}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                              <LocationOn sx={{ fontSize: 16, mr: 1, color: 'error.main' }} />
                              <Typography variant="caption" sx={{ maxWidth: 120 }}>
                                {ride.dropoff}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={ride.status}
                            color={getStatusColor(ride.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={ride.paymentStatus}
                            color={getPaymentColor(ride.paymentStatus)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            ${ride.fare.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{ride.date}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {ride.time}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <IconButton size="small" onClick={() => handleViewRide(ride)}>
                              <Visibility />
                            </IconButton>
                            <IconButton size="small">
                              <Map />
                            </IconButton>
                            {ride.status === 'active' && (
                              <IconButton size="small">
                                <Phone />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Ride Details Dialog */}
          <Dialog open={showRideDialog} onClose={() => setShowRideDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle>Ride Details</DialogTitle>
            <DialogContent>
              {selectedRide && (
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Ride Information</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Ride ID" secondary={selectedRide.id} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Status" secondary={selectedRide.status} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Date" secondary={selectedRide.date} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Time" secondary={selectedRide.time} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Duration" secondary={selectedRide.duration} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Distance" secondary={selectedRide.distance} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Route</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Pickup" secondary={selectedRide.pickup} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Dropoff" secondary={selectedRide.dropoff} />
                        </ListItem>
                      </List>
                      
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Payment</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Fare" secondary={`$${selectedRide.fare.toFixed(2)}`} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Payment Status" secondary={selectedRide.paymentStatus} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Payment Method" secondary={selectedRide.paymentMethod} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>Participants</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" gutterBottom>Passenger</Typography>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2 }}>
                              {selectedRide.passenger.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2">{selectedRide.passenger}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {selectedRide.passengerId}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" gutterBottom>Driver</Typography>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2 }}>
                              {selectedRide.driver.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2">{selectedRide.driver}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {selectedRide.driverId}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            {selectedRide.vehicle}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {selectedRide.rating > 0 && (
                    <Box mt={2}>
                      <Typography variant="h6" gutterBottom>Rating</Typography>
                      <Box display="flex" alignItems="center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} sx={{ 
                            fontSize: 20, 
                            color: i < selectedRide.rating ? 'warning.main' : 'action.disabled' 
                          }} />
                        ))}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {selectedRide.rating}/5
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowRideDialog(false)}>Close</Button>
              {selectedRide?.status === 'active' && (
                <Button variant="contained" color="error">
                  Cancel Ride
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default RideManagement
