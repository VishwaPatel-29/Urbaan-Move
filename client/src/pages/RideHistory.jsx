import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
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
  CircularProgress,
  useTheme as useMuiTheme
} from '@mui/material'
import {
  History,
  Search,
  Download,
  Visibility,
  Star,
  LocationOn,
  Payment,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RideHistory = () => {
  const theme = useMuiTheme()
  const isDark = theme.palette.mode === 'dark'

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
    alert('Exporting ride history to CSV...')
  }

  const indexOfLastRide = currentPage * ridesPerPage
  const indexOfFirstRide = indexOfLastRide - ridesPerPage
  const currentRides = filteredRides.slice(indexOfFirstRide, indexOfLastRide)

  const cardStyle = {
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    boxShadow: 'none',
  }

  return (
    <>
      <Helmet>
        <title>Ride History | UrbanMove Enterprise</title>
      </Helmet>

      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#0a0a0a' : '#f4f6f8' }}>
        <Navbar />

        <Box sx={{ flexGrow: 1, pt: { xs: '80px', md: '100px' }, pb: 8 }}>
          <Container maxWidth="lg">
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1, letterSpacing: '-0.5px' }}>
                Ride History
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Review and export your past transportation logs and billing details.
              </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center">
                      <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(0, 180, 180, 0.1)', mr: 2 }}>
                        <History sx={{ color: '#00B4B4' }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>{stats.totalRides}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Total Rides</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center">
                      <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(76, 175, 80, 0.1)', mr: 2 }}>
                        <TrendingUp sx={{ color: 'success.main' }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>{stats.completedRides}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Completed</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center">
                      <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(244, 67, 54, 0.1)', mr: 2 }}>
                        <TrendingDown sx={{ color: 'error.main' }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>{stats.cancelledRides}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Cancelled</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center">
                      <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(255, 152, 0, 0.1)', mr: 2 }}>
                        <Payment sx={{ color: 'warning.main' }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>${stats.totalSpent.toFixed(2)}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Total Spent</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Filters */}
            <Card sx={{ ...cardStyle, mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Refine Search</Typography>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      placeholder="Search ID, driver, location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                      }}
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={statusFilter}
                        label="Status"
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ borderRadius: '8px' }}
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
                        sx={{ borderRadius: '8px' }}
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
                      sx={{ py: 1, borderRadius: '8px', textTransform: 'none', fontWeight: 600, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: theme.palette.text.primary }}
                    >
                      Export CSV
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Ride Table */}
            <Card sx={{ ...cardStyle, overflow: 'hidden' }}>
              <CardContent sx={{ p: 0 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={3} borderBottom={`1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Recent Rides ({filteredRides.length})
                  </Typography>
                  {loading && <CircularProgress size={20} sx={{ color: '#00B4B4' }} />}
                </Box>

                {filteredRides.length === 0 ? (
                  <Box p={4}>
                    <Alert severity="info" sx={{ borderRadius: '8px' }}>No rides found matching your search criteria.</Alert>
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Ride ID</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Pickup</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Dropoff</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Driver</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Fare</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                          <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentRides.map((ride) => (
                          <TableRow key={ride.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                {ride.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>{ride.date}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {ride.time}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <LocationOn sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
                                <Typography variant="body2" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {ride.pickup}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <LocationOn sx={{ fontSize: 16, mr: 1, color: 'action.active' }} />
                                <Typography variant="body2" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {ride.dropoff}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{ride.driver}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                ${ride.fare.toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={ride.status.toUpperCase()}
                                color={getStatusColor(ride.status)}
                                size="small"
                                sx={{ borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}
                              />
                            </TableCell>
                            <TableCell>
                              {ride.rating > 0 ? (
                                <Box display="flex">
                                  {renderStars(ride.rating)}
                                </Box>
                              ) : (
                                <Typography variant="caption" color="text.secondary">
                                  N/A
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="View Details">
                                <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                                  <Visibility fontSize="small" />
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
                  <Box display="flex" justifyContent="center" p={3} borderTop={`1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`}>
                    <Pagination
                      count={Math.ceil(filteredRides.length / ridesPerPage)}
                      page={currentPage}
                      onChange={(e, value) => setCurrentPage(value)}
                      sx={{ 
                        '& .MuiPaginationItem-root.Mui-selected': { 
                          bgcolor: '#00B4B4', 
                          color: '#fff',
                          '&:hover': { bgcolor: '#008080' }
                        }
                      }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default RideHistory
