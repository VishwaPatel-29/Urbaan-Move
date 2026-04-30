import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  CircularProgress,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import {
  DirectionsCar,
  CheckCircle,
  Cancel,
  Navigation,
  Person,
  LocationOn,
  AccessTime,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { selectTheme } from '../features/uiSlice'
import Navbar from '../components/Navbar'
import LottieLoader from '../components/LottieLoader'

const DriverDashboard = () => {
  const theme = useSelector(selectTheme)
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [activeRide, setActiveRide] = useState(null)
  const [status, setStatus] = useState('available')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setRequests(sampleRequests)
      } catch (error) {
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const sampleRequests = [
    { _id: '1', passenger: 'Sarah Johnson', pickup: '123 Main St', destination: 'Tech Park', eta: 5, passengers: 2 },
    { _id: '2', passenger: 'Mike Chen', pickup: '456 Oak Ave', destination: 'Innovation Hub', eta: 8, passengers: 1 },
    { _id: '3', passenger: 'Emily Davis', pickup: '789 Pine Rd', destination: 'Corporate Center', eta: 3, passengers: 3 },
  ]

  const handleAccept = (request) => {
    setRequests(requests.filter(r => r._id !== request._id))
    setActiveRide(request)
    setStatus('en-route')
    toast.success('Ride accepted!')
    setDetailsOpen(false)
  }

  const handleReject = (requestId) => {
    setRequests(requests.filter(r => r._id !== requestId))
    toast.success('Request rejected')
  }

  const handleStartRide = () => {
    setStatus('arrived')
    toast.success('Passenger picked up!')
  }

  const handleCompleteRide = () => {
    setActiveRide(null)
    setStatus('available')
    toast.success('Ride completed! Great work!')
  }

  const getStatusColor = (status) => {
    const colors = {
      available: '#4caf50',
      'en-route': '#2196f3',
      arrived: '#ff9800',
      busy: '#9e9e9e',
    }
    return colors[status] || '#666'
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LottieLoader height={100} width={100} />
      </Box>
    )
  }

  return (
    <>
      <Helmet>
        <title>Driver Dashboard | KBD-Havya</title>
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#000' : '#f5f5f5' }}>
        <Navbar />

        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 10 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Driver Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Current Status
                    </Typography>
                    <Chip
                      label={status.replace('-', ' ').toUpperCase()}
                      sx={{
                        background: `${getStatusColor(status)}20`,
                        color: getStatusColor(status),
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  {activeRide ? (
                    <Box>
                      <Box sx={{ p: 3, borderRadius: 2, background: 'rgba(0, 180, 180, 0.1)', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                          {activeRide.passenger}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <LocationOn sx={{ color: '#00B4B4' }} />
                          <Typography variant="body1">{activeRide.pickup}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                          to {activeRide.destination}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Person sx={{ color: '#666' }} />
                          <Typography variant="body2">{activeRide.passengers} passengers</Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        {status === 'en-route' && (
                          <Button
                            variant="contained"
                            startIcon={<Navigation />}
                            onClick={handleStartRide}
                            sx={{ background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' }}
                          >
                            Mark Arrived
                          </Button>
                        )}
                        {status === 'arrived' && (
                          <Button
                            variant="contained"
                            startIcon={<CheckCircle />}
                            onClick={handleCompleteRide}
                            sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)' }}
                          >
                            Complete Ride
                          </Button>
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <DirectionsCar sx={{ fontSize: 48, color: '#333', mb: 2 }} />
                      <Typography variant="body1" sx={{ color: '#666' }}>
                        No active ride. Accept a request below.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Pending Requests ({requests.length})
                  </Typography>

                  {requests.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <AccessTime sx={{ fontSize: 48, color: '#333', mb: 2 }} />
                      <Typography variant="body1" sx={{ color: '#666' }}>
                        No pending requests
                      </Typography>
                    </Box>
                  ) : (
                    <List>
                      {requests.map((request, index) => (
                        <React.Fragment key={request._id}>
                          <ListItem
                            sx={{
                              cursor: 'pointer',
                              '&:hover': { background: 'rgba(0, 180, 180, 0.05)' },
                            }}
                            onClick={() => {
                              setSelectedRequest(request)
                              setDetailsOpen(true)
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: '#00B4B4' }}>
                                {request.passenger.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={request.passenger}
                              secondary={`${request.pickup} → ${request.destination}`}
                            />
                            <Chip
                              label={`${request.eta} min`}
                              size="small"
                              sx={{ background: '#00B4B420', color: '#00B4B4' }}
                            />
                          </ListItem>
                          {index < requests.length - 1 && <Box sx={{ borderBottom: '1px solid #333' }} />}
                        </React.Fragment>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Quick Stats
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      { label: 'Today\'s Rides', value: 5 },
                      { label: 'Total Earnings', value: '$125' },
                      { label: 'Rating', value: '4.8' },
                    ].map((stat) => (
                      <Grid item xs={6} key={stat.label}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(0, 180, 180, 0.1)',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#00B4B4' }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
          {selectedRequest && (
            <>
              <DialogTitle>Ride Request Details</DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: '#00B4B4' }}>
                      {selectedRequest.passenger.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{selectedRequest.passenger}</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {selectedRequest.passengers} passengers
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#666' }}>Pickup</Typography>
                    <Typography variant="body1">{selectedRequest.pickup}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#666' }}>Destination</Typography>
                    <Typography variant="body1">{selectedRequest.destination}</Typography>
                  </Box>
                  <Chip
                    label={`ETA: ${selectedRequest.eta} minutes`}
                    sx={{ background: '#00B4B420', color: '#00B4B4' }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button startIcon={<Cancel />} onClick={() => { handleReject(selectedRequest._id); setDetailsOpen(false) }}>
                  Reject
                </Button>
                <Button variant="contained" startIcon={<CheckCircle />} onClick={() => handleAccept(selectedRequest)}>
                  Accept
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </>
  )
}

export default DriverDashboard