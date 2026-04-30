import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Switch,
  FormControlLabel,
  Divider,
  Avatar
} from '@mui/material'
import {
  CreditCard,
  Add,
  Delete,
  Edit,
  AccountBalance,
  Wallet,
  Smartphone,
  CheckCircle,
  Warning,
  Star,
  Security,
  Visibility,
  VisibilityOff,
  LocalOffer
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'card1',
      type: 'credit',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      holderName: 'John Doe',
      isDefault: true,
      isVerified: true
    },
    {
      id: 'card2',
      type: 'debit',
      brand: 'Mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2024',
      holderName: 'John Doe',
      isDefault: false,
      isVerified: true
    },
    {
      id: 'wallet1',
      type: 'wallet',
      provider: 'PayPal',
      email: 'john.doe@example.com',
      isDefault: false,
      isVerified: true
    },
    {
      id: 'bank1',
      type: 'bank',
      bankName: 'Chase Bank',
      accountType: 'Checking',
      last4: '6789',
      holderName: 'John Doe',
      isDefault: false,
      isVerified: false
    }
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit',
    brand: 'visa',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    bankName: '',
    accountType: 'checking',
    routingNumber: '',
    accountNumber: '',
    email: '',
    phone: ''
  })
  const [showCvv, setShowCvv] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const paymentTypes = [
    { value: 'credit', label: 'Credit Card', icon: <CreditCard /> },
    { value: 'debit', label: 'Debit Card', icon: <CreditCard /> },
    { value: 'bank', label: 'Bank Account', icon: <AccountBalance /> },
    { value: 'wallet', label: 'Digital Wallet', icon: <Wallet /> }
  ]

  const cardBrands = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' }
  ]

  const walletProviders = [
    { value: 'paypal', label: 'PayPal' },
    { value: 'apple', label: 'Apple Pay' },
    { value: 'google', label: 'Google Pay' },
    { value: 'cashapp', label: 'Cash App' }
  ]

  const handleAddPaymentMethod = () => {
    setNewPaymentMethod({
      type: 'credit',
      brand: 'visa',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
      bankName: '',
      accountType: 'checking',
      routingNumber: '',
      accountNumber: '',
      email: '',
      phone: ''
    })
    setErrors({})
    setShowAddDialog(true)
  }

  const handleEditPaymentMethod = (method) => {
    setSelectedMethod(method)
    setNewPaymentMethod({
      type: method.type,
      brand: method.brand || '',
      cardNumber: '',
      expiryMonth: method.expiryMonth || '',
      expiryYear: method.expiryYear || '',
      cvv: '',
      holderName: method.holderName || '',
      bankName: method.bankName || '',
      accountType: method.accountType || '',
      routingNumber: '',
      accountNumber: '',
      email: method.email || '',
      phone: ''
    })
    setShowAddDialog(true)
  }

  const handleDeletePaymentMethod = (method) => {
    setSelectedMethod(method)
    setShowDeleteDialog(true)
  }

  const handleSetDefault = (methodId) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    )
  }

  const validatePaymentMethod = () => {
    const newErrors = {}

    if (newPaymentMethod.type === 'credit' || newPaymentMethod.type === 'debit') {
      if (!newPaymentMethod.cardNumber) {
        newErrors.cardNumber = 'Card number is required'
      } else if (newPaymentMethod.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Invalid card number'
      }
      if (!newPaymentMethod.expiryMonth) newErrors.expiryMonth = 'Required'
      if (!newPaymentMethod.expiryYear) newErrors.expiryYear = 'Required'
      if (!newPaymentMethod.cvv) newErrors.cvv = 'Required'
      if (!newPaymentMethod.holderName) newErrors.holderName = 'Required'
    }

    if (newPaymentMethod.type === 'bank') {
      if (!newPaymentMethod.bankName) newErrors.bankName = 'Required'
      if (!newPaymentMethod.routingNumber) newErrors.routingNumber = 'Required'
      if (!newPaymentMethod.accountNumber) newErrors.accountNumber = 'Required'
      if (!newPaymentMethod.holderName) newErrors.holderName = 'Required'
    }

    if (newPaymentMethod.type === 'wallet') {
      if (!newPaymentMethod.email) newErrors.email = 'Required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSavePaymentMethod = async () => {
    if (!validatePaymentMethod()) return

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const methodData = {
        id: `method${Date.now()}`,
        type: newPaymentMethod.type,
        isDefault: paymentMethods.length === 0,
        isVerified: false
      }

      if (newPaymentMethod.type === 'credit' || newPaymentMethod.type === 'debit') {
        methodData.brand = newPaymentMethod.brand
        methodData.last4 = newPaymentMethod.cardNumber.slice(-4)
        methodData.expiryMonth = newPaymentMethod.expiryMonth
        methodData.expiryYear = newPaymentMethod.expiryYear
        methodData.holderName = newPaymentMethod.holderName
      }

      if (newPaymentMethod.type === 'bank') {
        methodData.bankName = newPaymentMethod.bankName
        methodData.accountType = newPaymentMethod.accountType
        methodData.last4 = newPaymentMethod.accountNumber.slice(-4)
        methodData.holderName = newPaymentMethod.holderName
      }

      if (newPaymentMethod.type === 'wallet') {
        methodData.provider = newPaymentMethod.brand
        methodData.email = newPaymentMethod.email
      }

      setPaymentMethods(prev => [...prev, methodData])
      setLoading(false)
      setShowAddDialog(false)
    }, 1500)
  }

  const confirmDeletePaymentMethod = () => {
    setPaymentMethods(prev => prev.filter(method => method.id !== selectedMethod.id))
    setShowDeleteDialog(false)
    setSelectedMethod(null)
  }

  const getPaymentIcon = (type, brand) => {
    switch (type) {
      case 'credit':
      case 'debit':
        return <CreditCard />
      case 'bank':
        return <AccountBalance />
      case 'wallet':
        return <Wallet />
      default:
        return <CreditCard />
    }
  }

  const formatCardNumber = (number) => {
    if (!number) return ''
    const cleaned = number.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  const getPaymentDisplay = (method) => {
    switch (method.type) {
      case 'credit':
      case 'debit':
        return `${method.brand} •••• ${method.last4}`
      case 'bank':
        return `${method.bankName} ${method.accountType} •••• ${method.last4}`
      case 'wallet':
        return `${method.provider} - ${method.email}`
      default:
        return 'Unknown payment method'
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Payment Methods
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Manage your payment methods for seamless ride bookings. All payment information is encrypted and secure.
            </Typography>
          </Alert>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Saved Payment Methods</Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddPaymentMethod}
                >
                  Add Payment Method
                </Button>
              </Box>

              {paymentMethods.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <CreditCard sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No payment methods saved
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add a payment method to start booking rides
                  </Typography>
                </Box>
              ) : (
                <List>
                  {paymentMethods.map((method) => (
                    <Card key={method.id} variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                              {getPaymentIcon(method.type)}
                            </Avatar>
                            <Box>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="h6">
                                  {getPaymentDisplay(method)}
                                </Typography>
                                {method.isDefault && (
                                  <Chip label="Default" color="primary" size="small" />
                                )}
                                {method.isVerified && (
                                  <Chip 
                                    label="Verified" 
                                    color="success" 
                                    size="small"
                                    icon={<CheckCircle />}
                                  />
                                )}
                              </Box>
                              {method.type === 'credit' || method.type === 'debit' ? (
                                <Typography variant="body2" color="text.secondary">
                                  Expires {method.expiryMonth}/{method.expiryYear}
                                </Typography>
                              ) : null}
                            </Box>
                          </Box>
                          
                          <Box display="flex" alignItems="center" gap={1}>
                            {!method.isDefault && (
                              <Button
                                variant="text"
                                size="small"
                                onClick={() => handleSetDefault(method.id)}
                              >
                                Set as Default
                              </Button>
                            )}
                            <IconButton size="small" onClick={() => handleEditPaymentMethod(method)}>
                              <Edit />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeletePaymentMethod(method)}
                              disabled={paymentMethods.length === 1}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Security Tips</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="End-to-end encryption"
                    secondary="All payment data is encrypted and securely stored"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="PCI DSS compliant"
                    secondary="We meet the highest security standards for payment processing"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Fraud detection"
                    secondary="Advanced fraud detection systems protect your account"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Add/Edit Payment Method Dialog */}
          <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>
              {selectedMethod ? 'Edit Payment Method' : 'Add Payment Method'}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Type</InputLabel>
                    <Select
                      value={newPaymentMethod.type}
                      label="Payment Type"
                      onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, type: e.target.value }))}
                      disabled={!!selectedMethod}
                    >
                      {paymentTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box display="flex" alignItems="center">
                            {type.icon}
                            <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {(newPaymentMethod.type === 'credit' || newPaymentMethod.type === 'debit') && (
                  <>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Card Brand</InputLabel>
                        <Select
                          value={newPaymentMethod.brand}
                          label="Card Brand"
                          onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, brand: e.target.value }))}
                        >
                          {cardBrands.map(brand => (
                            <MenuItem key={brand.value} value={brand.value}>
                              {brand.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Card Number"
                        value={formatCardNumber(newPaymentMethod.cardNumber)}
                        onChange={(e) => setNewPaymentMethod(prev => ({ 
                          ...prev, 
                          cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)
                        }))}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry Month"
                        value={newPaymentMethod.expiryMonth}
                        onChange={(e) => setNewPaymentMethod(prev => ({ 
                          ...prev, 
                          expiryMonth: e.target.value.replace(/\D/g, '').slice(0, 2)
                        }))}
                        error={!!errors.expiryMonth}
                        helperText={errors.expiryMonth}
                        placeholder="MM"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry Year"
                        value={newPaymentMethod.expiryYear}
                        onChange={(e) => setNewPaymentMethod(prev => ({ 
                          ...prev, 
                          expiryYear: e.target.value.replace(/\D/g, '').slice(0, 4)
                        }))}
                        error={!!errors.expiryYear}
                        helperText={errors.expiryYear}
                        placeholder="YYYY"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="CVV"
                        type={showCvv ? 'text' : 'password'}
                        value={newPaymentMethod.cvv}
                        onChange={(e) => setNewPaymentMethod(prev => ({ 
                          ...prev, 
                          cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                        }))}
                        error={!!errors.cvv}
                        helperText={errors.cvv}
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={() => setShowCvv(!showCvv)}>
                              {showCvv ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          )
                        }}
                      />
                    </Grid>
                  </>
                )}

                {newPaymentMethod.type === 'bank' && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bank Name"
                        value={newPaymentMethod.bankName}
                        onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, bankName: e.target.value }))}
                        error={!!errors.bankName}
                        helperText={errors.bankName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Account Type</InputLabel>
                        <Select
                          value={newPaymentMethod.accountType}
                          label="Account Type"
                          onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, accountType: e.target.value }))}
                        >
                          <MenuItem value="checking">Checking</MenuItem>
                          <MenuItem value="savings">Savings</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Routing Number"
                        value={newPaymentMethod.routingNumber}
                        onChange={(e) => setNewPaymentMethod(prev => ({ 
                          ...prev, 
                          routingNumber: e.target.value.replace(/\D/g, '')
                        }))}
                        error={!!errors.routingNumber}
                        helperText={errors.routingNumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Account Number"
                        value={newPaymentMethod.accountNumber}
                        onChange={(e) => setNewPaymentMethod(prev => ({ 
                          ...prev, 
                          accountNumber: e.target.value.replace(/\D/g, '')
                        }))}
                        error={!!errors.accountNumber}
                        helperText={errors.accountNumber}
                      />
                    </Grid>
                  </>
                )}

                {newPaymentMethod.type === 'wallet' && (
                  <>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Wallet Provider</InputLabel>
                        <Select
                          value={newPaymentMethod.brand}
                          label="Wallet Provider"
                          onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, brand: e.target.value }))}
                        >
                          {walletProviders.map(provider => (
                            <MenuItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        value={newPaymentMethod.email}
                        onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, email: e.target.value }))}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    value={newPaymentMethod.holderName}
                    onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, holderName: e.target.value }))}
                    error={!!errors.holderName}
                    helperText={errors.holderName}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
              <Button 
                onClick={handleSavePaymentMethod} 
                variant="contained"
                disabled={loading}
                startIcon={loading ? null : <CheckCircle />}
              >
                {loading ? 'Saving...' : 'Save Payment Method'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Delete Payment Method</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Are you sure you want to delete this payment method? This action cannot be undone.
              </Typography>
              {selectedMethod && (
                <Typography variant="body2" sx={{ mt: 2, fontWeight: 'medium' }}>
                  {getPaymentDisplay(selectedMethod)}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
              <Button onClick={confirmDeletePaymentMethod} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default PaymentMethods
