import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  useTheme as useMuiTheme,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper
} from '@mui/material'
import {
  DirectionsBus,
  Schedule,
  TrendingUp,
  TrendingDown,
  Route,
  AccessTime,
  Nature,
  MoreVert,
  ArrowForwardIos
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/authSlice'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LiveMap from '../components/LiveMap'
import BackButton from '../components/BackButton'

const Dashboard = () => {
  const navigate = useNavigate()
  const theme = useMuiTheme()
  const isDark = theme.palette.mode === 'dark'
  
  const user = useSelector(selectUser)
  const { isAuthenticated } = useAuth()
  
  const [greeting, setGreeting] = useState('Good day')
  const [stats, setStats] = useState({ totalRides: 0, thisMonth: 0, saved: 0, co2Saved: 0 })
  const [recentRides, setRecentRides] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }

    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
    
    setStats({
      totalRides: 128,
      thisMonth: 24,
      saved: 42,
      co2Saved: 85
    })

    setRecentRides([
      { id: 'TR-8932', date: 'Oct 24, 2023', route: 'Maple St → Business Park A', vehicle: 'Shuttle 4B', status: 'Upcoming' },
      { id: 'TR-8931', date: 'Oct 23, 2023', route: 'Business Park A → Maple St', vehicle: 'Express Van', status: 'Completed' },
      { id: 'TR-8930', date: 'Oct 23, 2023', route: 'Maple St → Business Park A', vehicle: 'Express Van', status: 'Completed' },
      { id: 'TR-8929', date: 'Oct 22, 2023', route: 'Downtown → Tech Hub', vehicle: 'Shuttle 2A', status: 'Cancelled' },
      { id: 'TR-8928', date: 'Oct 21, 2023', route: 'Tech Hub → Downtown', vehicle: 'Shuttle 2A', status: 'Completed' },
      { id: 'TR-8927', date: 'Oct 20, 2023', route: 'Maple St → Business Park A', vehicle: 'Shuttle 4B', status: 'Completed' },
      { id: 'TR-8926', date: 'Oct 19, 2023', route: 'Westside → Central Station', vehicle: 'Express Van', status: 'Completed' },
      { id: 'TR-8925', date: 'Oct 18, 2023', route: 'Central Station → Westside', vehicle: 'Express Van', status: 'Completed' },
    ])

  }, [isAuthenticated, navigate])

  const metricCards = [
    { title: 'Total Rides', value: stats.totalRides, icon: DirectionsBus, trend: '+12%', isPositive: true },
    { title: 'Rides this Month', value: stats.thisMonth, icon: Route, trend: '+4%', isPositive: true },
    { title: 'Hours Saved', value: `${stats.saved}h`, icon: AccessTime, trend: '-2%', isPositive: false },
    { title: 'CO2 Reduced', value: `${stats.co2Saved}kg`, icon: Nature, trend: '+18%', isPositive: true },
  ]

  // Enterprise Styling
  const cardStyle = {
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.04)',
    overflow: 'hidden'
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming': return { bg: isDark ? 'rgba(0, 180, 180, 0.2)' : '#e0f2f1', text: '#00897b' }
      case 'Completed': return { bg: isDark ? 'rgba(76, 175, 80, 0.2)' : '#e8f5e9', text: '#2e7d32' }
      case 'Cancelled': return { bg: isDark ? 'rgba(244, 67, 54, 0.2)' : '#ffebee', text: '#c62828' }
      default: return { bg: theme.palette.action.selected, text: theme.palette.text.secondary }
    }
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: isDark ? '#0a0a0a' : '#f4f6f8',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }}>
      <Helmet>
        <title>Dashboard | UrbanMove</title>
      </Helmet>

      <Navbar />
      
      <Box sx={{ pt: { xs: '80px', md: '100px' }, pb: 8 }}>
        <Container maxWidth="xl">
          <BackButton />
          {/* Header Section */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5 }}>
                Dashboard Overview
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {greeting}, {user?.name || 'User'}. Here is your commute data.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: theme.palette.text.primary }}>
                Download Report
              </Button>
              <Button variant="contained" onClick={() => navigate('/book')} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, backgroundColor: '#00B4B4', '&:hover': { backgroundColor: '#008080' }, boxShadow: 'none' }}>
                Book New Ride
              </Button>
            </Box>
          </Box>

          {/* Metrics Row */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {metricCards.map((metric, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card sx={cardStyle} elevation={0}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {metric.title}
                      </Typography>
                      <Box sx={{ color: theme.palette.text.secondary }}>
                        <metric.icon fontSize="small" />
                      </Box>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
                      {metric.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {metric.isPositive ? 
                        <TrendingUp sx={{ color: '#2e7d32', fontSize: 16, mr: 0.5 }} /> : 
                        <TrendingDown sx={{ color: '#c62828', fontSize: 16, mr: 0.5 }} />
                      }
                      <Typography variant="body2" sx={{ color: metric.isPositive ? '#2e7d32' : '#c62828', fontWeight: 600, mr: 1 }}>
                        {metric.trend}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        vs last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Main Content Grid */}
          <Grid container spacing={4}>
            
            {/* Left Column: Data Table */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ ...cardStyle, height: '100%', display: 'flex', flexDirection: 'column' }} elevation={0}>
                <Box sx={{ p: 2.5, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Recent Rides
                  </Typography>
                  <Button 
                    onClick={() => navigate('/rides')}
                    endIcon={<ArrowForwardIos sx={{ fontSize: '12px !important' }} />} 
                    sx={{ textTransform: 'none', color: '#00B4B4', fontWeight: 600 }}
                  >
                    View All
                  </Button>
                </Box>
                <TableContainer sx={{ flexGrow: 1 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Ride ID</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Route</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Vehicle</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentRides.map((ride) => {
                        const statusColor = getStatusColor(ride.status)
                        return (
                          <TableRow key={ride.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ fontWeight: 500, color: theme.palette.text.primary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>{ride.id}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>{ride.date}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.primary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>{ride.route}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>{ride.vehicle}</TableCell>
                            <TableCell sx={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
                              <Chip 
                                label={ride.status} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: statusColor.bg, 
                                  color: statusColor.text, 
                                  fontWeight: 600,
                                  borderRadius: '6px'
                                }} 
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>

            {/* Right Column: Active Ride & Map */}
            <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              
              {/* Active Ride Widget */}
              <Card sx={cardStyle} elevation={0}>
                <Box sx={{ p: 2.5, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Next Scheduled Ride
                  </Typography>
                  <Schedule sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ 
                      width: 48, height: 48, borderRadius: '8px', 
                      backgroundColor: isDark ? 'rgba(0, 180, 180, 0.2)' : '#e0f2f1', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 
                    }}>
                      <DirectionsBus sx={{ color: '#00897b' }} />
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        08:30 AM
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Today • Shuttle 4B
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', fontWeight: 600 }}>From</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary, mb: 1.5 }}>Maple Street</Typography>
                    
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: 'uppercase', fontWeight: 600 }}>To</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>Business Park A</Typography>
                  </Box>

                  <Button 
                    fullWidth 
                    variant="outlined" 
                    onClick={() => navigate('/rides')}
                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, borderColor: '#00B4B4', color: '#00B4B4', '&:hover': { backgroundColor: 'rgba(0, 180, 180, 0.05)' } }}
                  >
                    Manage Ticket
                  </Button>
                </CardContent>
              </Card>

              {/* Mini Map Widget */}
              <Card sx={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column' }} elevation={0}>
                <Box sx={{ p: 2.5, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Live Tracker
                  </Typography>
                  <Chip label="Live" size="small" sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600, borderRadius: '4px' }} />
                </Box>
                <CardContent sx={{ p: 0, flex: 1, minHeight: '250px', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <LiveMap />
                  </Box>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
          
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default Dashboard