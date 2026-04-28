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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Pagination,
  Alert,
  CircularProgress
} from '@mui/material'
import {
  History,
  FilterList,
  Search,
  Download,
  Visibility,
  Star,
  AccessTime,
  LocationOn,
  Payment,
  CalendarToday,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material'

const RideHistory = () => {
  const [rides] = useState([
    {
      id: 'RIDE001',
      date: '2024-01-15',
      time: '09:30 AM',
      pickup: '123 Main St, Downtown',
      dropoff: '456 Oak Ave, Uptown',
      driver: 'John Smith',
      fare: 25.50,
      status: 'completed',
      rating: 5,
      duration: '25 min',
      distance: '8.5 km',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'RIDE002',
      date: '2024-01-14',
      time: '02:15 PM',
      pickup: '789 Elm St, Midtown',
      dropoff: '321 Pine Rd, Suburbs',
      driver: 'Sarah Johnson',
      fare: 18.75,
      status: 'completed',
      rating: 4,
      duration: '18 min',
      distance: '6.2 km',
      paymentMethod: 'Wallet'
    },
    {
      id: 'RIDE003',
      date: '2024-01-13',
      time: '06:45 PM',
      pickup: '555 Beach Blvd',
      dropoff: '777 Mountain View',
      driver: 'Mike Wilson',
      fare: 32.00,
      status: 'cancelled',
      rating: 0,
      duration: 'N/A',
      distance: 'N/A',
      paymentMethod: 'N/A'
    },
    {
      id: 'RIDE004',
      date: '2024-01-12',
      time: '11:20 AM',
      pickup: 'Airport Terminal 2',
      dropoff: 'Hotel Grand Plaza',
      driver: 'Emma Davis',
      fare: 45.00,
      status: 'completed',
      rating: 5,
      duration: '35 min',
      distance: '15.8 km',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'RIDE005',
      date: '2024-01-11',
      time: '08:00 PM',
      pickup: 'Central Station',
      dropoff: 'Home Street 42',
      driver: 'Robert Brown',
      fare: 15.25,
      status: 'completed',
      rating: 3,
      duration: '12 min',
      distance: '4.1 km',
      paymentMethod: 'Cash'
    }
  ])

  const [filteredRides, setFilteredRides] = useState(rides)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const ridesPerPage = 10

  const stats = {
    totalRides: rides.length,
    completedRides: rides.filter(r => r.status === 'completed').length,
    cancelledRides: rides.filter(r => r.status === 'cancelled').length,
    totalSpent: rides.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.fare, 0),
    avgRating: rides.filter(r => r.status === 'completed' && r.rating > 0)
      .reduce((sum, r) => sum + r.rating, 0) / rides.filter(r => r.status === 'completed' && r.rating > 0).length
  }

  const handleFilter = () => {
    setLoading(true)
    setTimeout(() => {
      let filtered = rides

      if (searchTerm) {
        filtered = filtered.filter(ride => 
          ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ride.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      if (statusFilter !== 'all') {
        filtered = filtered.filter(ride => ride.status === statusFilter)
      }

      if (dateFilter !== 'all') {
        const today = new Date()
        const filterDate = new Date()
        
        if (dateFilter === 'today') {
          filterDate.setHours(0, 0, 0, 0)
        } else if (dateFilter === 'week') {
          filterDate.setDate(today.getDate() - 7)
        } else if (dateFilter === 'month') {
          filterDate.setMonth(today.getMonth() - 1)
        }

        filtered = filtered.filter(ride => {
          const rideDate = new Date(ride.date)
          return rideDate >= filterDate
        })
      }

      setFilteredRides(filtered)
      setLoading(false)
    }, 500)
  }

  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, statusFilter, dateFilter])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'cancelled': return 'error'
      case 'ongoing': return 'warning'
      default: return 'default'
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} sx={{ 
        fontSize: 16, 
        color: i < rating ? 'warning.main' : 'action.disabled' 
      }} />
    ))
  }

  const handleExport = () => {
    // Simulate export functionality
    alert('Exporting ride history to CSV...')
  }

  const indexOfLastRide = currentPage * ridesPerPage
  const indexOfFirstRide = indexOfLastRide - ridesPerPage
  const currentRides = filteredRides.slice(indexOfFirstRide, indexOfLastRide)

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Ride History
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <History sx={{ mr: 2, color: 'primary.main' }} />
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
                <TrendingUp sx={{ mr: 2, color: 'success.main' }} />
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
                <TrendingDown sx={{ mr: 2, color: 'error.main' }} />
                <Box>
                  <Typography variant="h4">{stats.cancelledRides}</Typography>
                  <Typography variant="body2" color="text.secondary">Cancelled</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Payment sx={{ mr: 2, color: 'warning.main' }} />
                <Box>
                  <Typography variant="h4">${stats.totalSpent.toFixed(2)}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Spent</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
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
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
                fullWidth
              >
                Export CSV
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Ride Table */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Recent Rides ({filteredRides.length})
            </Typography>
            {loading && <CircularProgress size={20} />}
          </Box>

          {filteredRides.length === 0 ? (
            <Alert severity="info">No rides found matching your criteria.</Alert>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ride ID</TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Pickup</TableCell>
                    <TableCell>Dropoff</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Fare</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRides.map((ride) => (
                    <TableRow key={ride.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {ride.id}
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
                        <Box display="flex" alignItems="center">
                          <LocationOn sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
                          <Typography variant="body2" sx={{ maxWidth: 150 }}>
                            {ride.pickup}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <LocationOn sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
                          <Typography variant="body2" sx={{ maxWidth: 150 }}>
                            {ride.dropoff}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{ride.driver}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          ${ride.fare.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ride.status}
                          color={getStatusColor(ride.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {ride.rating > 0 ? (
                          <Box display="flex">
                            {renderStars(ride.rating)}
                          </Box>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            Not rated
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Pagination */}
          {filteredRides.length > ridesPerPage && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(filteredRides.length / ridesPerPage)}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default RideHistory
