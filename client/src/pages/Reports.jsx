import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  Assessment,
  Download,
  TrendingUp,
  People,
  DirectionsBus,
  AttachMoney,
  LocationOn,
  Refresh,
  Print,
  Share,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Reports = () => {
  const reportTypes = [
    { value: 'revenue', label: 'Revenue Report', icon: <AttachMoney /> },
    { value: 'rides', label: 'Ride Report', icon: <DirectionsBus /> },
    { value: 'users', label: 'User Report', icon: <People /> },
    { value: 'drivers', label: 'Driver Report', icon: <People /> },
    { value: 'locations', label: 'Location Report', icon: <LocationOn /> },
    { value: 'financial', label: 'Financial Report', icon: <Assessment /> }
  ]

  const recentReports = [
    {
      id: 'RPT001',
      type: 'Revenue Report',
      dateRange: 'Monthly',
      generatedDate: '2024-01-15',
      status: 'completed'
    },
    {
      id: 'RPT002',
      type: 'User Report',
      dateRange: 'Weekly',
      generatedDate: '2024-01-14',
      status: 'completed'
    },
    {
      id: 'RPT003',
      type: 'Ride Report',
      dateRange: 'Monthly',
      generatedDate: '2024-01-13',
      status: 'processing'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Reports | UrbanMove</title>
        <meta name="description" content="UrbanMove Reports and Analytics" />
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
              Reports & Analytics
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
              Comprehensive insights and performance metrics for your UrbanMove operations
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card sx={{ background: 'rgba(0, 180, 180, 0.1)', border: '1px solid rgba(0, 180, 180, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#00B4B4', mb: 1 }}>Total Revenue</Typography>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>$125,000</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ color: '#4CAF50', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>+15.3%</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ background: 'rgba(255, 182, 193, 0.1)', border: '1px solid rgba(255, 182, 193, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#FFB6C1', mb: 1 }}>Total Rides</Typography>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>2,847</Typography>
                  <Typography variant="body2" sx={{ color: '#a0a0a0', mt: 1 }}>This period</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ background: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1 }}>Active Users</Typography>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>6,789</Typography>
                  <Typography variant="body2" sx={{ color: '#4CAF50', mt: 1 }}>Currently active</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Success Rate</Typography>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>93.2%</Typography>
                  <Typography variant="body2" sx={{ color: '#a0a0a0', mt: 1 }}>Excellent</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mt: 6, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ color: '#00B4B4', mb: 4 }}>Recent Reports</Typography>
              <TableContainer component={Paper} sx={{ background: 'transparent' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#00B4B4', borderBottom: '1px solid rgba(0, 180, 180, 0.3)' }}>Report ID</TableCell>
                      <TableCell sx={{ color: '#00B4B4', borderBottom: '1px solid rgba(0, 180, 180, 0.3)' }}>Type</TableCell>
                      <TableCell sx={{ color: '#00B4B4', borderBottom: '1px solid rgba(0, 180, 180, 0.3)' }}>Date Range</TableCell>
                      <TableCell sx={{ color: '#00B4B4', borderBottom: '1px solid rgba(0, 180, 180, 0.3)' }}>Generated</TableCell>
                      <TableCell sx={{ color: '#00B4B4', borderBottom: '1px solid rgba(0, 180, 180, 0.3)' }}>Status</TableCell>
                      <TableCell sx={{ color: '#00B4B4', borderBottom: '1px solid rgba(0, 180, 180, 0.3)' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{report.id}</TableCell>
                        <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{report.type}</TableCell>
                        <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{report.dateRange}</TableCell>
                        <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{report.generatedDate}</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <Chip
                            label={report.status}
                            color={report.status === 'completed' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <Box display="flex" gap={1}>
                            <IconButton size="small" sx={{ color: '#00B4B4' }}>
                              <Download />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#00B4B4' }}>
                              <Share />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#00B4B4' }}>
                              <Print />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>

        <Footer />
      </Box>
    </>
  )
}

export default Reports
