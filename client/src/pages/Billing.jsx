import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  Avatar
} from '@mui/material'
import {
  Receipt,
  Download,
  Payment,
  AccountBalance,
  CreditCard,
  Description,
  CalendarToday,
  AttachMoney,
  Assessment,
  TrendingUp,
  TrendingDown,
  LocalOffer,
  CheckCircle,
  Warning,
  Info,
  Mail,
  Phone,
  Business,
  Person
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Billing = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV001',
      date: '2024-01-15',
      dueDate: '2024-02-15',
      amount: 125.50,
      status: 'paid',
      description: 'Monthly Ride Services',
      items: [
        { description: 'Ride charges', quantity: 5, unitPrice: 25.10, total: 125.50 }
      ],
      paymentMethod: 'Credit Card',
      paymentDate: '2024-01-14',
      transactionId: 'TXN123456789'
    },
    {
      id: 'INV002',
      date: '2024-01-01',
      dueDate: '2024-01-31',
      amount: 89.25,
      status: 'paid',
      description: 'Monthly Ride Services',
      items: [
        { description: 'Ride charges', quantity: 3, unitPrice: 29.75, total: 89.25 }
      ],
      paymentMethod: 'PayPal',
      paymentDate: '2024-01-30',
      transactionId: 'TXN123456788'
    },
    {
      id: 'INV003',
      date: '2024-02-15',
      dueDate: '2024-03-15',
      amount: 156.75,
      status: 'pending',
      description: 'Monthly Ride Services',
      items: [
        { description: 'Ride charges', quantity: 7, unitPrice: 22.39, total: 156.73 },
        { description: 'Service fee', quantity: 1, unitPrice: 0.02, total: 0.02 }
      ],
      paymentMethod: null,
      paymentDate: null,
      transactionId: null
    }
  ])

  const [billingInfo, setBillingInfo] = useState({
    companyName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    taxId: '',
    isBusiness: false
  })

  const [paymentMethods] = useState([
    { id: 'card1', type: 'Credit Card', details: 'Visa •••• 4242', isDefault: true },
    { id: 'wallet1', type: 'PayPal', details: 'john.doe@example.com', isDefault: false }
  ])

  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showBillingInfoDialog, setShowBillingInfoDialog] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [loading, setLoading] = useState(false)

  const stats = {
    totalBilled: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    totalPaid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    totalPending: invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    averageMonthly: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0) / invoices.filter(inv => inv.status === 'paid').length
  }

  const handlePayInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setShowPaymentDialog(true)
    setSelectedPaymentMethod(paymentMethods.find(pm => pm.isDefault)?.id || '')
  }

  const confirmPayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => 
        inv.id === selectedInvoice.id 
          ? { 
              ...inv, 
              status: 'paid', 
              paymentMethod: paymentMethods.find(pm => pm.id === selectedPaymentMethod)?.type,
              paymentDate: new Date().toISOString().split('T')[0],
              transactionId: `TXN${Date.now()}`
            }
          : inv
      ))
      
      setLoading(false)
      setShowPaymentDialog(false)
      setSelectedInvoice(null)
      setSelectedPaymentMethod('')
      
      alert('Payment processed successfully!')
    }, 2000)
  }

  const handleDownloadInvoice = (invoice) => {
    // Simulate download
    alert(`Downloading invoice ${invoice.id}...`)
  }

  const handleUpdateBillingInfo = () => {
    setShowBillingInfoDialog(true)
  }

  const saveBillingInfo = () => {
    // Simulate save
    setShowBillingInfoDialog(false)
    alert('Billing information updated successfully!')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success'
      case 'pending': return 'warning'
      case 'overdue': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle color="success" />
      case 'pending': return <Warning color="warning" />
      case 'overdue': return <Warning color="error" />
      default: return <Info />
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Billing & Invoices
          </Typography>

          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Assessment sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.totalBilled.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Billed</Typography>
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
                      <Typography variant="h4">${stats.totalPaid.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Paid</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <TrendingUp sx={{ mr: 2, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.totalPending.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Pending</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <AttachMoney sx={{ mr: 2, color: 'info.main' }} />
                    <Box>
                      <Typography variant="h4">${stats.averageMonthly.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Avg. Monthly</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Billing Information */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Billing Information</Typography>
                <Button variant="outlined" onClick={handleUpdateBillingInfo}>
                  Update Info
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Account Name</Typography>
                      <Typography variant="body1">{billingInfo.companyName}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Mail sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{billingInfo.email}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Phone sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">{billingInfo.phone}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Business sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Address</Typography>
                      <Typography variant="body1">
                        {billingInfo.address}, {billingInfo.city}, {billingInfo.state} {billingInfo.zipCode}
                      </Typography>
                      <Typography variant="body1">{billingInfo.country}</Typography>
                    </Box>
                  </Box>
                  {billingInfo.taxId && (
                    <Box display="flex" alignItems="center">
                      <Description sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Tax ID</Typography>
                        <Typography variant="body1">{billingInfo.taxId}</Typography>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Invoices</Typography>
                <Button variant="outlined" startIcon={<Download />}>
                  Export All
                </Button>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Payment Method</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Receipt sx={{ mr: 1, fontSize: 20 }} />
                            <Typography variant="body2" fontWeight="medium">
                              {invoice.id}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            ${invoice.amount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={invoice.status}
                            color={getStatusColor(invoice.status)}
                            size="small"
                            icon={getStatusIcon(invoice.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {invoice.paymentMethod || 'Not paid'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <Button
                              size="small"
                              variant="text"
                              onClick={() => handleDownloadInvoice(invoice)}
                            >
                              Download
                            </Button>
                            {invoice.status === 'pending' && (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handlePayInvoice(invoice)}
                              >
                                Pay Now
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Payment Dialog */}
          <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Pay Invoice</DialogTitle>
            <DialogContent>
              {selectedInvoice && (
                <Box>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      Paying invoice {selectedInvoice.id} for ${selectedInvoice.amount.toFixed(2)}
                    </Typography>
                  </Alert>
                  
                  <Typography variant="h6" gutterBottom>Select Payment Method</Typography>
                  <List>
                    {paymentMethods.map((method) => (
                      <ListItem 
                        key={method.id}
                        button
                        selected={selectedPaymentMethod === method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {method.type === 'Credit Card' ? <CreditCard /> : <AccountBalance />}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText 
                          primary={method.type}
                          secondary={method.details}
                        />
                        {method.isDefault && (
                          <Chip label="Default" size="small" color="primary" />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
              <Button 
                onClick={confirmPayment}
                variant="contained"
                disabled={loading || !selectedPaymentMethod}
                startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Billing Info Dialog */}
          <Dialog open={showBillingInfoDialog} onClose={() => setShowBillingInfoDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle>Update Billing Information</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Account Name"
                    value={billingInfo.companyName}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={billingInfo.phone}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, city: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State"
                    value={billingInfo.state}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, state: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    value={billingInfo.zipCode}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={billingInfo.country}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, country: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tax ID (Optional)"
                    value={billingInfo.taxId}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, taxId: e.target.value }))}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowBillingInfoDialog(false)}>Cancel</Button>
              <Button onClick={saveBillingInfo} variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Billing
