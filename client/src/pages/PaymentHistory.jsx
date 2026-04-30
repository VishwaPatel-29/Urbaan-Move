import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Pagination,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import {
  Receipt,
  Download,
  Search,
  FilterList,
  Visibility,
  CreditCard,
  AccountBalance,
  Wallet,
  CalendarToday,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Assessment,
  LocalOffer,
  Info
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PaymentHistory = () => {
  const [payments] = useState([
    {
      id: 'PAY001',
      date: '2024-01-15',
      time: '09:56 AM',
      description: 'Ride from Downtown to Uptown',
      amount: 25.50,
      status: 'completed',
      method: 'credit',
      methodDetails: 'Visa •••• 4242',
      transactionId: 'TXN123456789',
      category: 'ride',
      rideId: 'RIDE001'
    },
    {
      id: 'PAY002',
      date: '2024-01-14',
      time: '02:18 PM',
      description: 'Ride from Midtown to Suburbs',
      amount: 18.75,
      status: 'completed',
      method: 'wallet',
      methodDetails: 'PayPal',
      transactionId: 'TXN123456790',
      category: 'ride',
      rideId: 'RIDE002'
    },
    {
      id: 'PAY003',
      date: '2024-01-13',
      time: '06:48 PM',
      description: 'Wallet Top-up',
      amount: 50.00,
      status: 'completed',
      method: 'bank',
      methodDetails: 'Chase Bank •••• 6789',
      transactionId: 'TXN123456791',
      category: 'topup',
      rideId: null
    },
    {
      id: 'PAY004',
      date: '2024-01-12',
      time: '11:23 AM',
      description: 'Ride from Airport to Hotel',
      amount: 45.00,
      status: 'completed',
      method: 'credit',
      methodDetails: 'Mastercard •••• 5555',
      transactionId: 'TXN123456792',
      category: 'ride',
      rideId: 'RIDE004'
    },
    {
      id: 'PAY005',
      date: '2024-01-11',
      time: '08:05 PM',
      description: 'Ride from Central Station to Home',
      amount: 15.25,
      status: 'completed',
      method: 'cash',
      methodDetails: 'Cash Payment',
      transactionId: 'TXN123456793',
      category: 'ride',
      rideId: 'RIDE005'
    },
    {
      id: 'PAY006',
      date: '2024-01-10',
      time: '03:30 PM',
      description: 'Refund for cancelled ride',
      amount: -22.00,
      status: 'completed',
      method: 'credit',
      methodDetails: 'Visa •••• 4242',
      transactionId: 'TXN123456794',
      category: 'refund',
      rideId: 'RIDE003'
    }
  ])

  const [filteredPayments, setFilteredPayments] = useState(payments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const paymentsPerPage = 10

  const stats = {
    totalSpent: payments.filter(p => p.amount > 0 && p.category === 'ride').reduce((sum, p) => sum + p.amount, 0),
    totalRefunds: payments.filter(p => p.amount < 0).reduce((sum, p) => sum + Math.abs(p.amount), 0),
    totalTopups: payments.filter(p => p.category === 'topup').reduce((sum, p) => sum + p.amount, 0),
    netSpending: payments.filter(p => p.category === 'ride').reduce((sum, p) => sum + p.amount, 0) + 
                  payments.filter(p => p.amount < 0).reduce((sum, p) => sum + p.amount, 0)
  }

  const paymentMethods = [
    { value: 'all', label: 'All Methods' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'wallet', label: 'Digital Wallet' },
    { value: 'cash', label: 'Cash' }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'ride', label: 'Rides' },
    { value: 'topup', label: 'Wallet Top-ups' },
    { value: 'refund', label: 'Refunds' },
    { value: 'penalty', label: 'Penalties' }
  ]

  const handleFilter = () => {
    setLoading(true)
    setTimeout(() => {
      let filtered = payments

      if (searchTerm) {
        filtered = filtered.filter(payment => 
          payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      if (statusFilter !== 'all') {
        filtered = filtered.filter(payment => payment.status === statusFilter)
      }

      if (methodFilter !== 'all') {
        filtered = filtered.filter(payment => payment.method === methodFilter)
      }

      if (categoryFilter !== 'all') {
        filtered = filtered.filter(payment => payment.category === categoryFilter)
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

        filtered = filtered.filter(payment => {
          const paymentDate = new Date(payment.date)
          return paymentDate >= filterDate
        })
      }

      setFilteredPayments(filtered)
      setLoading(false)
    }, 500)
  }

  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, statusFilter, methodFilter, categoryFilter, dateFilter])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'pending': return 'warning'
      case 'failed': return 'error'
      default: return 'default'
    }
  }

  const getMethodIcon = (method) => {
    switch (method) {
      case 'credit':
      case 'debit':
        return <CreditCard />
      case 'bank':
        return <AccountBalance />
      case 'wallet':
        return <Wallet />
      default:
        return <AttachMoney />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ride': return 'primary'
      case 'topup': return 'success'
      case 'refund': return 'warning'
      case 'penalty': return 'error'
      default: return 'default'
    }
  }

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment)
    setShowDetailsDialog(true)
  }

  const handleDownloadReceipt = (payment) => {
    // Simulate download
    alert(`Downloading receipt for ${payment.id}...`)
  }

  const handleExport = () => {
    // Simulate export functionality
    alert('Exporting payment history to CSV...')
  }

  const indexOfLastPayment = currentPage * paymentsPerPage
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Payment History
          </Typography>

          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <TrendingUp sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.totalSpent.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Spent</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <TrendingDown sx={{ mr: 2, color: 'success.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.totalRefunds.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Refunds</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Wallet sx={{ mr: 2, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.totalTopups.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Wallet Top-ups</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Assessment sx={{ mr: 2, color: 'info.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.netSpending.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Net Spending</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Filters</Typography>
                <IconButton onClick={() => setShowFilters(!showFilters)}>
                  <FilterList />
                </IconButton>
              </Box>

              {showFilters && (
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                      }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={statusFilter}
                        label="Status"
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Method</InputLabel>
                      <Select
                        value={methodFilter}
                        label="Method"
                        onChange={(e) => setMethodFilter(e.target.value)}
                      >
                        {paymentMethods.map(method => (
                          <MenuItem key={method.value} value={method.value}>
                            {method.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={categoryFilter}
                        label="Category"
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        {categories.map(category => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
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
                  <Grid item xs={12} sm={6} md={1}>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={handleExport}
                      fullWidth
                    >
                      Export
                    </Button>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* Payment Table */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Payment History ({filteredPayments.length})
                </Typography>
                {loading && <CircularProgress size={20} />}
              </Box>

              {filteredPayments.length === 0 ? (
                <Alert severity="info">No payments found matching your criteria.</Alert>
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPayments.map((payment) => (
                        <TableRow key={payment.id} hover>
                          <TableCell>
                            <Box>
                              <Typography variant="body2">{payment.date}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {payment.time}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ maxWidth: 200 }}>
                              {payment.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              fontWeight="medium"
                              color={payment.amount < 0 ? 'success.main' : 'inherit'}
                            >
                              {payment.amount < 0 ? '-' : '+'}${Math.abs(payment.amount).toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              {getMethodIcon(payment.method)}
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {payment.methodDetails}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={payment.status}
                              color={getStatusColor(payment.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={payment.category}
                              color={getCategoryColor(payment.category)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {payment.transactionId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              <Tooltip title="View Details">
                                <IconButton size="small" onClick={() => handleViewDetails(payment)}>
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Download Receipt">
                                <IconButton size="small" onClick={() => handleDownloadReceipt(payment)}>
                                  <Download />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Pagination */}
              {filteredPayments.length > paymentsPerPage && (
                <Box display="flex" justifyContent="center" mt={3}>
                  <Pagination
                    count={Math.ceil(filteredPayments.length / paymentsPerPage)}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Payment Details Dialog */}
          <Dialog open={showDetailsDialog} onClose={() => setShowDetailsDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogContent>
              {selectedPayment && (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Payment ID</Typography>
                      <Typography variant="body1">{selectedPayment.id}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Date</Typography>
                      <Typography variant="body1">{selectedPayment.date}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Time</Typography>
                      <Typography variant="body1">{selectedPayment.time}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Amount</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {selectedPayment.amount < 0 ? '-' : '+'}${Math.abs(selectedPayment.amount).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Description</Typography>
                      <Typography variant="body1">{selectedPayment.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                      <Typography variant="body1">{selectedPayment.methodDetails}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Transaction ID</Typography>
                      <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                        {selectedPayment.transactionId}
                      </Typography>
                    </Grid>
                    {selectedPayment.rideId && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">Related Ride</Typography>
                        <Typography variant="body1">{selectedPayment.rideId}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
              <Button 
                variant="contained" 
                startIcon={<Download />}
                onClick={() => selectedPayment && handleDownloadReceipt(selectedPayment)}
              >
                Download Receipt
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default PaymentHistory
