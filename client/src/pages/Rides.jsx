import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material'
import {
  DirectionsBus,
  Cancel,
  RateReview,
  AccessTime,
  LocationOn,
  ExpandMore,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { selectTheme } from '../features/uiSlice'
import { formatDateTime, formatDuration, formatRideStatus } from '../utils/formatters'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import LottieLoader from '../components/LottieLoader'

const Rides = () => {
  const theme = useSelector(selectTheme)
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [rides, setRides] = useState([])
  const [selectedRide, setSelectedRide] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setRides(sampleRides)
      } catch (error) {
        toast.error('Failed to load rides')
      } finally {
        setLoading(false)
      }
    }
    fetchRides()
  }, [])

  const handleCancelRide = (rideId) => {
    toast.success('Ride cancelled successfully')
    setRides(rides.map(r => r._id === rideId ? { ...r, status: 'cancelled' } : r))
    setDetailsOpen(false)
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFB6C1',
      accepted: '#00B4B4',
      'en-route': '#2196f3',
      arrived: '#4caf50',
      completed: '#9e9e9e',
      cancelled: '#ff5252',
    }
    return colors[status] || '#666'
  }

  const filteredRides = tab === 0 ? rides : tab === 1 ? rides.filter(r => r.status === 'completed') : rides.filter(r => r.status === 'cancelled')

  const sampleRides = [
    {
      _id: '1',
      pickup: '123 Main Street',
      destination: 'Tech Park Campus',
      date: new Date().toISOString(),
      status: 'en-route',
      eta: 5,
      driver: 'John Smith',
      vehicle: 'Van 001',
    },
    {
      _id: '2',
      pickup: '456 Oak Avenue',
      destination: 'Innovation Hub',
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
      eta: 0,
      driver: 'Jane Doe',
      vehicle: 'Van 002',
    },
    {
      _id: '3',
      pickup: '789 Pine Road',
      destination: 'Corporate Center',
      date: new Date(Date.now() - 172800000).toISOString(),
      status: 'cancelled',
      eta: 0,
      driver: null,
      vehicle: null,
    },
    {
      _id: '4',
      pickup: '321 Elm Street',
      destination: 'Headquarters',
      date: new Date(Date.now() - 259200000).toISOString(),
      status: 'completed',
      eta: 0,
      driver: 'Mike Johnson',
      vehicle: 'Van 003',
    },
  ]

  return (
    <>
      <Helmet>
        <title>My Rides | KBD-Havya</title>
        <meta name="description" content="View your ride history with KBD-Havya." />
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#000' : '#f5f5f5' }}>
        <Navbar />

        <Box sx={{ display: 'flex', pt: 8 }}>
          <Sidebar open={true} />

          <Box
            component={motion.main}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            sx={{ flex: 1, p: { xs: 2, md: 4 }, ml: 280 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                My Rides
              </Typography>
              <Button
                component={Link}
                to="/book"
                variant="contained"
                startIcon={<DirectionsBus />}
                sx={{
                  background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                }}
              >
                Book New Ride
              </Button>
            </Box>

            <Card>
              <CardContent sx={{ p: 0 }}>
                <Tabs
                  value={tab}
                  onChange={(e, newValue) => setTab(newValue)}
                  sx={{
                    borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
                    '& .MuiTab-root': { minWidth: 100 },
                  }}
                >
                  <Tab label={`All (${rides.length})`} />
                  <Tab label={`Completed (${rides.filter(r => r.status === 'completed').length})`} />
                  <Tab label={`Cancelled (${rides.filter(r => r.status === 'cancelled').length})`} />
                </Tabs>

                {loading ? (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <LottieLoader height={100} width={100} />
                  </Box>
                ) : filteredRides.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <DirectionsBus sx={{ fontSize: 64, color: '#333', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#666' }}>
                      No rides found
                    </Typography>
                    <Button
                      component={Link}
                      to="/book"
                      variant="outlined"
                      sx={{ mt: 2, borderColor: '#00B4B4', color: '#00B4B4' }}
                    >
                      Book Your First Ride
                    </Button>
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Pickup</TableCell>
                          <TableCell>Destination</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Driver</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredRides.map((ride) => (
                          <TableRow
                            key={ride._id}
                            sx={{ '&:hover': { background: 'rgba(0, 180, 180, 0.05)' } }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTime sx={{ color: '#00B4B4', fontSize: 20 }} />
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {formatDateTime(ride.date).split(' at ')[0]}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#666' }}>
                                    {formatDateTime(ride.date).split(' at ')[1]}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{ride.pickup}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{ride.destination}</Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={formatRideStatus(ride.status)}
                                size="small"
                                sx={{
                                  background: `${getStatusColor(ride.status)}20`,
                                  color: getStatusColor(ride.status),
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {ride.driver || '-'}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSelectedRide(ride)
                                  setDetailsOpen(true)
                                }}
                              >
                                <ExpandMore />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          {selectedRide && (
            <>
              <DialogTitle>Ride Details</DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationOn sx={{ color: '#00B4B4' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666' }}>Pickup</Typography>
                      <Typography variant="body1">{selectedRide.pickup}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationOn sx={{ color: '#FFB6C1' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666' }}>Destination</Typography>
                      <Typography variant="body1">{selectedRide.destination}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccessTime sx={{ color: '#00B4B4' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666' }}>Date & Time</Typography>
                      <Typography variant="body1">{formatDateTime(selectedRide.date)}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DirectionsBus sx={{ color: '#00B4B4' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666' }}>Vehicle</Typography>
                      <Typography variant="body1">{selectedRide.vehicle || 'Not assigned'}</Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={formatRideStatus(selectedRide.status)}
                    sx={{
                      background: `${getStatusColor(selectedRide.status)}20`,
                      color: getStatusColor(selectedRide.status),
                      fontWeight: 600,
                      alignSelf: 'flex-start',
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                {selectedRide.status === 'pending' && (
                  <Button
                    startIcon={<Cancel />}
                    onClick={() => handleCancelRide(selectedRide._id)}
                    sx={{ color: '#ff5252', mr: 'auto' }}
                  >
                    Cancel Ride
                  </Button>
                )}
                {selectedRide.status === 'completed' && (
                  <Button
                    startIcon={<RateReview />}
                    sx={{ color: '#00B4B4', mr: 'auto' }}
                  >
                    Rate Ride
                  </Button>
                )}
                <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </>
  )
}

export default Rides