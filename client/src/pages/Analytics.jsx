import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Avatar,
} from '@mui/material'
import {
  TrendingUp,
  People,
  DirectionsBus,
  AttachMoney,
  Star,
  LocationOn,
  Refresh,
  Download,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Analytics = () => {
  const overviewStats = {
    totalRides: 15420,
    activeUsers: 3280,
    totalRevenue: 45680.50,
    averageRating: 4.7,
    growthRate: 12.5
  }

  const performanceMetrics = [
    { label: 'Average Response Time', value: '2.3 min', trend: 'up', change: '+0.5 min' },
    { label: 'Customer Satisfaction', value: '94.2%', trend: 'up', change: '+2.1%' },
    { label: 'Driver Utilization', value: '87.5%', trend: 'down', change: '-1.2%' },
    { label: 'Route Efficiency', value: '91.8%', trend: 'up', change: '+3.4%' }
  ]

  const topCities = [
    { name: 'New York', rides: 4520, revenue: 13450.75, growth: 12.3 },
    { name: 'Los Angeles', rides: 3890, revenue: 11520.50, growth: 8.7 },
    { name: 'Chicago', rides: 2840, revenue: 8420.25, growth: 15.1 },
    { name: 'Houston', rides: 2150, revenue: 6380.00, growth: 10.2 },
    { name: 'Phoenix', rides: 1820, revenue: 5409.00, growth: 6.8 }
  ]

  return (
    <>
      <Helmet>
        <title>Analytics | UrbanMove</title>
        <meta name="description" content="UrbanMove Analytics Dashboard" />
      </Helmet>

      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />

        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Analytics Dashboard
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#a0a0a0',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Real-time insights and performance metrics for your UrbanMove operations
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'rgba(0, 180, 180, 0.1)', border: '1px solid rgba(0, 180, 180, 0.3)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: '#00B4B4', mr: 2 }}>
                      <DirectionsBus />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#00B4B4' }}>Total Rides</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                    {overviewStats.totalRides.toLocaleString()}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingUp sx={{ color: '#4CAF50', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +{overviewStats.growthRate}% growth
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'rgba(255, 182, 193, 0.1)', border: '1px solid rgba(255, 182, 193, 0.3)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: '#FFB6C1', mr: 2 }}>
                      <People />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#FFB6C1' }}>Active Users</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                    {overviewStats.activeUsers.toLocaleString()}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingUp sx={{ color: '#4CAF50', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +8.3% this week
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: '#4CAF50', mr: 2 }}>
                      <AttachMoney />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#4CAF50' }}>Total Revenue</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                    ${overviewStats.totalRevenue.toLocaleString()}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingUp sx={{ color: '#4CAF50', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +15.2% growth
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: '#FFC107', mr: 2 }}>
                      <Star />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#FFC107' }}>Avg Rating</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                    {overviewStats.averageRating}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Star sx={{ color: '#FFC107', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#FFC107' }}>
                      Excellent service
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mb: 6, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ color: '#00B4B4', mb: 4 }}>Performance Metrics</Typography>
              <Grid container spacing={3}>
                {performanceMetrics.map((metric, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <CardContent>
                        <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                          {metric.label}
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                          {metric.value}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          {metric.trend === 'up' ? (
                            <TrendingUp sx={{ color: '#4CAF50', mr: 1, fontSize: 16 }} />
                          ) : (
                            <TrendingUp sx={{ color: '#f44336', mr: 1, fontSize: 16, transform: 'rotate(180deg)' }} />
                          )}
                          <Typography 
                            variant="body2" 
                            sx={{ color: metric.trend === 'up' ? '#4CAF50' : '#f44336' }}
                          >
                            {metric.change}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" sx={{ color: '#00B4B4' }}>Top Performing Cities</Typography>
                <Box>
                  <IconButton sx={{ color: '#00B4B4', mr: 1 }}>
                    <Refresh />
                  </IconButton>
                  <IconButton sx={{ color: '#00B4B4' }}>
                    <Download />
                  </IconButton>
                </Box>
              </Box>
              <Grid container spacing={3}>
                {topCities.map((city, index) => (
                  <Grid item xs={12} sm={6} md={2.4} key={index}>
                    <Card sx={{ 
                      background: index === 0 ? 'rgba(0, 180, 180, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: index === 0 ? '1px solid rgba(0, 180, 180, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <LocationOn sx={{ color: index === 0 ? '#00B4B4' : '#FFB6C1', mr: 1 }} />
                          <Typography variant="h6" sx={{ color: index === 0 ? '#00B4B4' : '#FFB6C1' }}>
                            {city.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                          {city.rides.toLocaleString()} rides
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
                          ${city.revenue.toLocaleString()}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <TrendingUp sx={{ color: '#4CAF50', mr: 1, fontSize: 14 }} />
                          <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                            +{city.growth}%
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Container>

        <Footer />
      </Box>
    </>
  )
}

export default Analytics
