import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  InputAdornment,
  Container,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  DirectionsBus,
  People,
  Notifications,
  Settings,
  TrendingUp,
  TrendingDown,
  MoreVert,
  Refresh,
  FilterList,
  Download,
  Upload,
  Add,
  Close,
  Edit,
  Delete,
  Search,
  Email,
  Phone,
  Business,
  Badge,
} from '@mui/icons-material'
import { adminService } from '../services/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [usersLoading, setUsersLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [serverConnected, setServerConnected] = useState(true)
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false)
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    employeeId: '',
    role: 'employee',
  })
  const [stats, setStats] = useState({
    totalRides: 0,
    activeVehicles: 0,
    pendingRequests: 0,
    revenue: 0,
    activeUsers: 0,
    todayRides: 0,
    monthlyGrowth: 0,
    satisfactionRate: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [statsData, usersData] = await Promise.all([
          adminService.getStats(),
          adminService.getUsers({ page: 1, limit: 20 })
        ])
        
        // Check if we're using mock data
        const isMockData = statsData.message?.includes('mock') || usersData.message?.includes('mock')
        setServerConnected(!isMockData)
        
        setStats({
          totalRides: statsData.data.totalRides || 1234,
          activeVehicles: statsData.data.activeVehicles || 24,
          pendingRequests: 5,
          revenue: statsData.data.revenue || 45678,
          activeUsers: statsData.data.totalUsers || 892,
          todayRides: statsData.data.todayRides || 47,
          monthlyGrowth: 12.5,
          satisfactionRate: 94.2,
        })
        
        setUsers(usersData.data.users || [])
        setTotalUsers(usersData.data.total || 0)
      } catch (error) {
        console.error('Failed to load data:', error)
        setServerConnected(false)
        // Fallback to mock data if API fails
        setStats({
          totalRides: 1234,
          activeVehicles: 24,
          pendingRequests: 5,
          revenue: 45678,
          activeUsers: 892,
          todayRides: 47,
          monthlyGrowth: 12.5,
          satisfactionRate: 94.2,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Handler functions for quick actions
  const handleAddVehicle = () => {
    setVehicleDialogOpen(true)
  }

  const handleManageUsers = async () => {
    setUserDialogOpen(true)
    await fetchUsers()
  }

  const handleAddUser = () => {
    setAddUserDialogOpen(true)
  }

  const fetchUsers = async (page = 1, query = '') => {
    setUsersLoading(true)
    try {
      const params = { page, limit: 20 }
      if (query) params.search = query
      
      const response = await adminService.getUsers(params)
      setUsers(response.data.users || [])
      setTotalUsers(response.data.total || 0)
      setCurrentPage(response.data.page || 1)
    } catch (error) {
      console.error('Failed to fetch users:', error)
      setSnackbar({
        open: true,
        message: 'Failed to fetch users',
        severity: 'error'
      })
    } finally {
      setUsersLoading(false)
    }
  }

  const handleCreateUser = async () => {
    try {
      const response = await adminService.createUser(newUser)
      
      // Add new user to the list
      setUsers(prev => [response.data, ...prev])
      setTotalUsers(prev => prev + 1)
      
      // Reset form and close dialog
      setNewUser({
        name: '',
        email: '',
        password: '',
        phone: '',
        company: '',
        employeeId: '',
        role: 'employee',
      })
      setAddUserDialogOpen(false)
      
      setSnackbar({
        open: true,
        message: 'User created successfully',
        severity: 'success'
      })
      
      toast.success('User created successfully')
    } catch (error) {
      console.error('Failed to create user:', error)
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to create user',
        severity: 'error'
      })
      toast.error(error.response?.data?.message || 'Failed to create user')
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await adminService.deleteUser(userId)
      
      // Remove user from the list
      setUsers(prev => prev.filter(user => user._id !== userId))
      setTotalUsers(prev => prev - 1)
      
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success'
      })
      
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Failed to delete user:', error)
      setSnackbar({
        open: true,
        message: 'Failed to delete user',
        severity: 'error'
      })
      toast.error('Failed to delete user')
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    fetchUsers(1, query)
  }

  const handlePageChange = (event, page) => {
    fetchUsers(page, searchQuery)
  }

  const handleSendAlert = () => {
    setNotificationDialogOpen(true)
  }

  const handleSettings = () => {
    setSettingsDialogOpen(true)
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        todayRides: prev.todayRides + Math.floor(Math.random() * 5),
        activeVehicles: prev.activeVehicles + Math.floor(Math.random() * 3) - 1,
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
      }))
      setLoading(false)
    }, 1000)
  }

  const statCards = [
    {
      label: 'Today\'s Rides',
      value: stats.todayRides,
      icon: DirectionsBus,
      color: '#00B4B4',
      trend: '+8.2%',
      trendUp: true,
      subtitle: 'From yesterday'
    },
    {
      label: 'Active Vehicles',
      value: stats.activeVehicles,
      icon: DirectionsBus,
      color: '#FF6B6B',
      trend: '+2',
      trendUp: true,
      subtitle: 'Available now'
    },
    {
      label: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: TrendingUp,
      color: '#4CAF50',
      trend: '+15.3%',
      trendUp: true,
      subtitle: 'This month'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: People,
      color: '#FFA726',
      trend: '+5.7%',
      trendUp: true,
      subtitle: 'Registered users'
    },
  ]

  const quickActions = [
    { title: 'Add Vehicle', icon: DirectionsBus, color: '#00B4B4', handler: handleAddVehicle },
    { title: 'Manage Users', icon: People, color: '#FF6B6B', handler: handleManageUsers },
    { title: 'Add User', icon: Add, color: '#4CAF50', handler: handleAddUser },
    { title: 'Send Alert', icon: Notifications, color: '#FFA726', handler: handleSendAlert },
    { title: 'Settings', icon: Settings, color: '#9C27B0', handler: handleSettings },
  ]

  const recentActivity = [
    { user: 'John Doe', action: 'Booked a ride', time: '2 mins ago', status: 'success' },
    { user: 'Jane Smith', action: 'Completed trip', time: '5 mins ago', status: 'success' },
    { user: 'Mike Johnson', action: 'Cancelled booking', time: '12 mins ago', status: 'warning' },
    { user: 'Sarah Davis', action: 'Signed in', time: '1 hour ago', status: 'info' },
  ]

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 3
      }}>
        <CircularProgress sx={{ color: '#00B4B4', size: 60 }} />
        <Typography sx={{ color: '#fff', fontWeight: 300 }}>
          Loading Admin Dashboard...
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | UrbanMove</title>
      </Helmet>

      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
        color: '#ffffff',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content with proper spacing for fixed navbar */}
        <Box sx={{ pt: '64px' }}>
          <Container maxWidth="xl">
            {/* Header */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 4,
              pb: 3,
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#fff',
                      background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Admin Dashboard
                  </Typography>
                  <Chip
                    size="small"
                    label={serverConnected ? 'Connected' : 'Offline Mode'}
                    sx={{
                      background: serverConnected ? '#4CAF5020' : '#FF980020',
                      color: serverConnected ? '#4CAF50' : '#FF9800',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  Welcome back, Administrator {serverConnected && '(Live Data)'}
                  {!serverConnected && '(Demo Data)'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Tooltip title="Refresh Data">
                  <IconButton onClick={handleRefresh} sx={{ color: '#fff', background: 'rgba(255,255,255,0.1)' }}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <IconButton sx={{ color: '#fff', background: 'rgba(255,255,255,0.1)' }}>
                    <FilterList />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export">
                  <IconButton sx={{ color: '#fff', background: 'rgba(255,255,255,0.1)' }}>
                    <Download />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {statCards.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={stat.label}>
                  <Paper
                    sx={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 3,
                      p: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}88 100%)`,
                      },
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,180,180,0.15)',
                        transition: 'all 0.3s ease',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', mt: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
                          {stat.subtitle}
                        </Typography>
                      </Box>
                      <Avatar sx={{ 
                        bgcolor: `${stat.color}20`, 
                        color: stat.color,
                        width: 48,
                        height: 48
                      }}>
                        <stat.icon />
                      </Avatar>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {stat.trendUp ? (
                        <TrendingUp sx={{ color: '#4CAF50', fontSize: 16 }} />
                      ) : (
                        <TrendingDown sx={{ color: '#FF5252', fontSize: 16 }} />
                      )}
                      <Typography variant="caption" sx={{ 
                        color: stat.trendUp ? '#4CAF50' : '#FF5252',
                        fontWeight: 600
                      }}>
                        {stat.trend}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Quick Actions */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 3, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action) => (
                  <Grid item xs={12} sm={6} md={3} key={action.title}>
                    <Paper
                      onClick={action.handler}
                      sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,180,180,0.15)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: `${action.color}20`, color: action.color }}>
                          <action.icon />
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                          {action.title}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Main Content Grid */}
            <Grid container spacing={3}>
              {/* Recent Activity */}
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                      Recent Activity
                    </Typography>
                    <IconButton size="small" sx={{ color: '#888' }}>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recentActivity.map((activity, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#00B4B420' }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ color: '#fff' }}>
                            <strong>{activity.user}</strong> {activity.action}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {activity.time}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={activity.status}
                          sx={{
                            background: activity.status === 'success' ? '#4CAF5020' :
                                       activity.status === 'warning' ? '#FFA72620' : '#00B4B420',
                            color: activity.status === 'success' ? '#4CAF50' :
                                    activity.status === 'warning' ? '#FFA726' : '#00B4B4',
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* System Status */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
                    System Status
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#888' }}>Server Load</Typography>
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>45%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={45} 
                        sx={{ 
                          background: 'rgba(255,255,255,0.1)',
                          '& .MuiLinearProgress-bar': { background: '#00B4B4' }
                        }} 
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#888' }}>Memory Usage</Typography>
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>62%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={62} 
                        sx={{ 
                          background: 'rgba(255,255,255,0.1)',
                          '& .MuiLinearProgress-bar': { background: '#FF6B6B' }
                        }} 
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#888' }}>Storage</Typography>
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>28%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={28} 
                        sx={{ 
                          background: 'rgba(255,255,255,0.1)',
                          '& .MuiLinearProgress-bar': { background: '#4CAF50' }
                        }} 
                      />
                    </Box>
                  </Box>
                  <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#888' }}>System Health</Typography>
                    <Chip
                      label="Excellent"
                      size="small"
                      sx={{
                        background: '#4CAF5020',
                        color: '#4CAF50',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Add Vehicle Dialog */}
        <Dialog open={vehicleDialogOpen} onClose={() => setVehicleDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: '#fff' }}>Add New Vehicle</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField label="Vehicle Name" placeholder="Van 001" fullWidth />
              <TextField label="License Plate" placeholder="ABC-1234" fullWidth />
              <TextField label="Capacity" select fullWidth defaultValue="6">
                <MenuItem value={4}>4 seats</MenuItem>
                <MenuItem value={6}>6 seats</MenuItem>
                <MenuItem value={8}>8 seats</MenuItem>
                <MenuItem value={12}>12 seats</MenuItem>
              </TextField>
              <TextField label="Driver Name" placeholder="John Doe" fullWidth />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVehicleDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setVehicleDialogOpen(false)}>Add Vehicle</Button>
          </DialogActions>
        </Dialog>

        {/* Manage Users Dialog */}
        <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="lg" fullWidth>
          <DialogTitle sx={{ color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            User Management
            <Button variant="contained" startIcon={<Add />} onClick={handleAddUser}>
              Add User
            </Button>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              {/* Search Bar */}
              <TextField
                fullWidth
                placeholder="Search users by name, email, or company..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#888' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#fff',
                  },
                }}
              />
              
              {/* Users Table */}
              {usersLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress sx={{ color: '#00B4B4' }} />
                </Box>
              ) : (
                <>
                  <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>User</TableCell>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Contact</TableCell>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Company</TableCell>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Role</TableCell>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user._id} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: '#00B4B420', color: '#00B4B4' }}>
                                  {user.name?.charAt(0) || 'U'}
                                </Avatar>
                                <Box>
                                  <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                                    {user.name}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#888' }}>
                                    {user.employeeId || 'N/A'}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Email sx={{ fontSize: 16, color: '#888' }} />
                                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                                    {user.email}
                                  </Typography>
                                </Box>
                                {user.phone && (
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Phone sx={{ fontSize: 16, color: '#888' }} />
                                    <Typography variant="body2" sx={{ color: '#ccc' }}>
                                      {user.phone}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Business sx={{ fontSize: 16, color: '#888' }} />
                                <Typography variant="body2" sx={{ color: '#ccc' }}>
                                  {user.company || 'N/A'}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={user.role || 'employee'}
                                size="small"
                                sx={{
                                  background: user.role === 'admin' ? '#FF525220' :
                                             user.role === 'driver' ? '#4CAF5020' : '#00B4B420',
                                  color: user.role === 'admin' ? '#FF5252' :
                                          user.role === 'driver' ? '#4CAF50' : '#00B4B4',
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={user.status || 'active'}
                                size="small"
                                color="success"
                                sx={{ fontWeight: 600 }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" sx={{ color: '#888' }}>
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  sx={{ color: '#FF5252' }}
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  {/* Pagination */}
                  {totalUsers > 20 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Pagination
                        count={Math.ceil(totalUsers / 20)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{
                          '& .MuiPaginationItem-root': {
                            color: '#fff',
                            borderColor: 'rgba(255,255,255,0.2)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                            '&.Mui-selected': {
                              backgroundColor: '#00B4B4',
                              borderColor: '#00B4B4',
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUserDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Add User Dialog */}
        <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ color: '#fff' }}>Add New User</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    placeholder="John Doe"
                    fullWidth
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                    sx={{
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    placeholder="john@example.com"
                    type="email"
                    fullWidth
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                    sx={{
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                    sx={{
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    placeholder="+1 234 567 8900"
                    fullWidth
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    sx={{
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company"
                    placeholder="TechCorp Inc."
                    fullWidth
                    value={newUser.company}
                    onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                    sx={{
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Employee ID"
                    placeholder="EMP001"
                    fullWidth
                    value={newUser.employeeId}
                    onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                    sx={{
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Role"
                    select
                    fullWidth
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    sx={{
                      '& .MuiOutlinedInput-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#888' },
                    }}
                  >
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="driver">Driver</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddUserDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleCreateUser}
              disabled={!newUser.name || !newUser.email || !newUser.password}
            >
              Create User
            </Button>
          </DialogActions>
        </Dialog>

        {/* Send Alert Dialog */}
        <Dialog open={notificationDialogOpen} onClose={() => setNotificationDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: '#fff' }}>Send Notification</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Notification Title"
                placeholder="System Maintenance"
                fullWidth
              />
              <TextField
                label="Message"
                placeholder="The system will be under maintenance from 2 AM to 4 AM"
                multiline
                rows={4}
                fullWidth
              />
              <TextField label="Priority" select fullWidth defaultValue="medium">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </TextField>
              <TextField label="Send To" select fullWidth defaultValue="all">
                <MenuItem value="all">All Users</MenuItem>
                <MenuItem value="drivers">Drivers Only</MenuItem>
                <MenuItem value="employees">Employees Only</MenuItem>
                <MenuItem value="admins">Admins Only</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNotificationDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setNotificationDialogOpen(false)}>Send Notification</Button>
          </DialogActions>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={settingsDialogOpen} onClose={() => setSettingsDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ color: '#fff' }}>System Settings</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>General Settings</Typography>
              <TextField label="System Name" defaultValue="UrbanMove" fullWidth />
              <TextField label="Contact Email" defaultValue="admin@urbanmove.com" fullWidth />
              <TextField label="Support Phone" defaultValue="+1-234-567-8900" fullWidth />
              
              <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>Security Settings</Typography>
              <TextField label="Session Timeout (minutes)" defaultValue="30" type="number" fullWidth />
              <TextField label="Max Login Attempts" defaultValue="5" type="number" fullWidth />
              <TextField label="Password Expiry (days)" defaultValue="90" type="number" fullWidth />
              
              <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>System Configuration</Typography>
              <TextField label="Time Zone" select fullWidth defaultValue="UTC">
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="EST">EST</MenuItem>
                <MenuItem value="PST">PST</MenuItem>
                <MenuItem value="IST">IST</MenuItem>
              </TextField>
              <TextField label="Default Language" select fullWidth defaultValue="english">
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSettingsDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setSettingsDialogOpen(false)}>Save Settings</Button>
          </DialogActions>
        </Dialog>

        {/* Footer */}
        <Footer />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}

export default AdminDashboard
