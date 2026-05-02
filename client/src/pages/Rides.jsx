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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme as useMuiTheme,
  Container,
  Divider,
} from '@mui/material'
import {
  DirectionsBus,
  Cancel,
  RateReview,
  AccessTime,
  LocationOn,
  ExpandMore,
  DirectionsCar,
  FileDownload
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { formatDateTime, formatRideStatus } from '../utils/formatters'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SkeletonLoader from '../components/SkeletonLoader'
import EmptyState from '../components/EmptyState'
import BackButton from '../components/BackButton'

const Rides = () => {
  const theme = useMuiTheme()
  const isDark = theme.palette.mode === 'dark'
  
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [rides, setRides] = useState([])
  const [selectedRide, setSelectedRide] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated delay to show skeletons
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

  const handleReviewSubmit = () => {
    toast.success('Thank you for your feedback!')
    setReviewOpen(false)
    setReviewData({ rating: 5, comment: '' })
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'en-route':
      case 'arrived':
      case 'upcoming': return { bg: isDark ? 'rgba(0, 180, 180, 0.2)' : '#e0f2f1', text: '#00897b' }
      case 'completed': return { bg: isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9', text: '#2e7d32' }
      case 'cancelled': return { bg: isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee', text: '#c62828' }
      case 'pending': return { bg: isDark ? 'rgba(255, 182, 193, 0.2)' : '#fce4ec', text: '#d81b60' }
      default: return { bg: theme.palette.action.selected, text: theme.palette.text.secondary }
    }
  }

  const filteredRides = tab === 0 ? rides : tab === 1 ? rides.filter(r => r.status === 'completed') : rides.filter(r => r.status === 'cancelled')

  const sampleRides = [
    {
      _id: 'TR-8933',
      pickup: '123 Main Street',
      destination: 'Tech Park Campus',
      date: new Date().toISOString(),
      status: 'upcoming',
      driver: 'John Smith',
      vehicle: 'Shuttle 4B',
    },
    {
      _id: 'TR-8932',
      pickup: '456 Oak Avenue',
      destination: 'Innovation Hub',
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
      driver: 'Jane Doe',
      vehicle: 'Express Van',
    },
    {
      _id: 'TR-8931',
      pickup: '789 Pine Road',
      destination: 'Corporate Center',
      date: new Date(Date.now() - 172800000).toISOString(),
      status: 'cancelled',
      driver: null,
      vehicle: null,
    },
    {
      _id: 'TR-8930',
      pickup: '321 Elm Street',
      destination: 'Headquarters',
      date: new Date(Date.now() - 259200000).toISOString(),
      status: 'completed',
      driver: 'Mike Johnson',
      vehicle: 'Shuttle 2A',
    },
  ]

  // Enterprise Styling
  const cardStyle = {
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.04)',
    overflow: 'hidden'
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: isDark ? '#0a0a0a' : '#f4f6f8',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }}>
      <Helmet>
        <title>My Rides | UrbanMove</title>
      </Helmet>

      <Navbar />

      <Box sx={{ pt: { xs: '80px', md: '100px' }, pb: 8 }}>
        <Container maxWidth="xl">
          <BackButton />
          
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5 }}>
                Ride History
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                View and manage your past and upcoming commutes.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" startIcon={<FileDownload />} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: theme.palette.text.primary }}>
                Export Data
              </Button>
              <Button component={Link} to="/book" variant="contained" startIcon={<DirectionsCar />} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, backgroundColor: '#00B4B4', '&:hover': { backgroundColor: '#008080' }, boxShadow: 'none' }}>
                Book New Ride
              </Button>
            </Box>
          </Box>

          <Card sx={cardStyle} elevation={0}>
            <Box sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>
              <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                sx={{
                  px: 2,
                  '& .MuiTab-root': { 
                    minWidth: 100, 
                    fontWeight: 600, 
                    textTransform: 'none',
                    color: theme.palette.text.secondary,
                    '&.Mui-selected': { color: '#00B4B4' }
                  },
                  '& .MuiTabs-indicator': { backgroundColor: '#00B4B4' }
                }}
              >
                <Tab label={`All Rides (${rides.length})`} />
                <Tab label={`Completed (${rides.filter(r => r.status === 'completed').length})`} />
                <Tab label={`Cancelled (${rides.filter(r => r.status === 'cancelled').length})`} />
              </Tabs>
            </Box>

            <CardContent sx={{ p: 0 }}>
              {loading ? (
                <TableContainer>
                  <Table>
                    <TableBody>
                      <SkeletonLoader type="table" rows={5} columns={5} />
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : filteredRides.length === 0 ? (
                <EmptyState
                  icon={DirectionsCar}
                  title="No rides found"
                  description="You haven't taken any rides in this category yet. Ready for your first commute?"
                  actionText="Book Your First Ride"
                  actionLink="/book"
                />
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Ride ID / Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Route details</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Vehicle</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRides.map((ride) => {
                        const statusColor = getStatusColor(ride.status)
                        return (
                          <TableRow
                            key={ride._id}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                {ride._id}
                              </Typography>
                              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                {formatDateTime(ride.date)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#00B4B4', mr: 1 }} />
                                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>{ride.pickup}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ec4899', mr: 1 }} />
                                  <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>{ride.destination}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
                              <Chip
                                label={formatRideStatus(ride.status)}
                                size="small"
                                sx={{
                                  backgroundColor: statusColor.bg,
                                  color: statusColor.text,
                                  fontWeight: 600,
                                  borderRadius: '6px'
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
                              <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                {ride.vehicle || '-'}
                              </Typography>
                              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                {ride.driver || ''}
                              </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  setSelectedRide(ride)
                                  setDetailsOpen(true)
                                }}
                                sx={{ borderRadius: '6px', textTransform: 'none', borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: theme.palette.text.primary }}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Ride Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            backgroundImage: 'none',
            backgroundColor: theme.palette.background.paper,
          }
        }}
      >
        {selectedRide && (() => {
          const statusColor = getStatusColor(selectedRide.status)
          return (
            <>
              <DialogTitle sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Ticket Details</Typography>
                <Chip
                  label={formatRideStatus(selectedRide.status)}
                  size="small"
                  sx={{ backgroundColor: statusColor.bg, color: statusColor.text, fontWeight: 600, borderRadius: '6px' }}
                />
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '8px', backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
                    <AccessTime sx={{ color: '#00B4B4' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', fontWeight: 600 }}>Scheduled For</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{formatDateTime(selectedRide.date)}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ position: 'relative', ml: 2 }}>
                    <Box sx={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(0, 180, 180, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5, zIndex: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00B4B4' }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', fontWeight: 600 }}>Pickup Location</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>{selectedRide.pickup}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5, zIndex: 1 }}>
                        <LocationOn sx={{ color: '#ec4899', fontSize: 16 }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', fontWeight: 600 }}>Dropoff Location</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>{selectedRide.destination}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', fontWeight: 600 }}>Vehicle</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>{selectedRide.vehicle || 'Pending assignment'}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', fontWeight: 600 }}>Driver</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>{selectedRide.driver || 'Pending assignment'}</Typography>
                    </Box>
                  </Box>

                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 3, pt: 1, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>
                {(selectedRide.status === 'pending' || selectedRide.status === 'upcoming') && (
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={() => handleCancelRide(selectedRide._id)}
                    sx={{ color: '#d32f2f', borderColor: 'rgba(211, 47, 47, 0.5)', mr: 'auto', borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
                  >
                    Cancel Ride
                  </Button>
                )}
                {selectedRide.status === 'completed' && (
                  <Button
                    variant="outlined"
                    startIcon={<RateReview />}
                    onClick={() => setReviewOpen(true)}
                    sx={{ color: '#00B4B4', borderColor: 'rgba(0, 180, 180, 0.5)', mr: 'auto', borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
                  >
                    Leave Review
                  </Button>
                )}
                <Button onClick={() => setDetailsOpen(false)} sx={{ color: theme.palette.text.secondary, fontWeight: 600, textTransform: 'none' }}>Close</Button>
              </DialogActions>
            </>
          )
        })()}
      </Dialog>

      {/* Review Dialog */}
      <Dialog
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            backgroundColor: theme.palette.background.paper,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Rate your ride</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
              How was your experience with {selectedRide?.driver || 'your driver'} on {selectedRide?.vehicle || 'this vehicle'}?
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton 
                  key={star} 
                  onClick={() => setReviewData({ ...reviewData, rating: star })}
                  sx={{ color: star <= reviewData.rating ? '#FFD700' : theme.palette.action.disabled }}
                >
                  <RateReview />
                </IconButton>
              ))}
            </Box>

            <Box 
              component="textarea" 
              placeholder="Tell us more about your ride (optional)..."
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              sx={{ 
                width: '100%', 
                minHeight: '100px', 
                borderRadius: '8px', 
                p: 2, 
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fff',
                color: theme.palette.text.primary,
                fontFamily: 'inherit',
                outline: 'none',
                '&:focus': { borderColor: '#00B4B4' }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setReviewOpen(false)} sx={{ color: theme.palette.text.secondary }}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleReviewSubmit}
            sx={{ 
              borderRadius: '8px', 
              backgroundColor: '#00B4B4', 
              '&:hover': { backgroundColor: '#008080' },
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none'
            }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
      
      <Footer />
    </Box>
  )
}

export default Rides