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
  Grid
} from '@mui/material'
import {
  Person,
  Edit,
  Delete,
  Block,
  CheckCircle,
  Warning,
  Search,
  FilterList,
  Add,
  Visibility,
  Download,
  Refresh,
  CalendarToday,
  Security,
  AdminPanelSettings,
  DirectionsCar,
  Star,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 'USR001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      role: 'passenger',
      status: 'active',
      verification: 'verified',
      joinDate: '2024-01-15',
      totalRides: 45,
      rating: 4.8
    },
    {
      id: 'USR002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
      role: 'driver',
      status: 'active',
      verification: 'verified',
      joinDate: '2024-01-10',
      totalRides: 234,
      rating: 4.9
    },
    {
      id: 'USR003',
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+1 (555) 345-6789',
      role: 'passenger',
      status: 'suspended',
      verification: 'pending',
      joinDate: '2024-01-20',
      totalRides: 12,
      rating: 4.2
    },
    {
      id: 'USR004',
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '+1 (555) 456-7890',
      role: 'driver',
      status: 'active',
      verification: 'verified',
      joinDate: '2024-01-08',
      totalRides: 189,
      rating: 4.7
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRole, setFilterRole] = useState('all')
  const [filterVerification, setFilterVerification] = useState('all')
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalDrivers: users.filter(u => u.role === 'driver').length,
    suspendedUsers: users.filter(u => u.status === 'suspended').length
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesVerification = filterVerification === 'all' || user.verification === filterVerification
    
    return matchesSearch && matchesStatus && matchesRole && matchesVerification
  })

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditDialog(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId))
    }
  }

  const handleSuspendUser = (userId) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u
    ))
  }

  const handleSaveUser = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowEditDialog(false)
      alert('User information updated successfully!')
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'suspended': return 'error'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  const getVerificationColor = (verification) => {
    switch (verification) {
      case 'verified': return 'success'
      case 'pending': return 'warning'
      case 'unverified': return 'error'
      default: return 'default'
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'driver': return <DirectionsCar />
      case 'admin': return <AdminPanelSettings />
      default: return <Person />
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            User Management
          </Typography>

          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Person sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h4">{stats.totalUsers}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Users</Typography>
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
                      <Typography variant="h4">{stats.activeUsers}</Typography>
                      <Typography variant="body2" color="text.secondary">Active Users</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <DirectionsCar sx={{ mr: 2, color: 'info.main' }} />
                    <Box>
                      <Typography variant="h4">{stats.totalDrivers}</Typography>
                      <Typography variant="body2" color="text.secondary">Drivers</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Warning sx={{ mr: 2, color: 'error.main' }} />
                    <Box>
                      <Typography variant="h4">{stats.suspendedUsers}</Typography>
                      <Typography variant="body2" color="text.secondary">Suspended</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters and Search */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filterStatus}
                      label="Status"
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={filterRole}
                      label="Role"
                      onChange={(e) => setFilterRole(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="passenger">Passenger</MenuItem>
                      <MenuItem value="driver">Driver</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <FormControl fullWidth>
                    <InputLabel>Verification</InputLabel>
                    <Select
                      value={filterVerification}
                      label="Verification"
                      onChange={(e) => setFilterVerification(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="verified">Verified</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="unverified">Unverified</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setShowAddDialog(true)}
                    fullWidth
                  >
                    Add User
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                  Users ({filteredUsers.length})
                </Typography>
                <Box display="flex" gap={1}>
                  <IconButton>
                    <Download />
                  </IconButton>
                  <IconButton>
                    <Refresh />
                  </IconButton>
                </Box>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Verification</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Rides</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {user.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {user.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {user.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{user.email}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.phone}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            {getRoleIcon(user.role)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {user.role}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            color={getStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.verification}
                            color={getVerificationColor(user.verification)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{user.joinDate}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{user.totalRides}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                            <Typography variant="body2">{user.rating}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleSuspendUser(user.id)}
                              color={user.status === 'suspended' ? 'success' : 'warning'}
                            >
                              <Block />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteUser(user.id)}
                              color="error"
                            >
                              <Delete />
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

          {/* Edit User Dialog */}
          <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              {selectedUser && (
                <Box sx={{ pt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        defaultValue={selectedUser.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        defaultValue={selectedUser.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        defaultValue={selectedUser.phone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                          defaultValue={selectedUser.role}
                          label="Role"
                        >
                          <MenuItem value="passenger">Passenger</MenuItem>
                          <MenuItem value="driver">Driver</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          defaultValue={selectedUser.status}
                          label="Status"
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="suspended">Suspended</MenuItem>
                          <MenuItem value="pending">Pending</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button
                onClick={handleSaveUser}
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default UserManagement
