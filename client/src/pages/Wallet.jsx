import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  CircularProgress,
  Avatar
} from '@mui/material'
import {
  AccountBalanceWallet,
  Add,
  Remove,
  History,
  CreditCard,
  AccountBalance,
  Smartphone,
  TrendingUp,
  TrendingDown,
  Receipt,
  LocalOffer,
  Security,
  CheckCircle,
  Info,
  ArrowUpward,
  ArrowDownward,
  SwapHoriz,
  Refresh
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(125.50)
  const [showTopUpDialog, setShowTopUpDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferEmail, setTransferEmail] = useState('')
  const [selectedTopUpMethod, setSelectedTopUpMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const [transactions] = useState([
    {
      id: 'TXN001',
      date: '2024-01-15',
      time: '09:56 AM',
      type: 'payment',
      description: 'Ride from Downtown to Uptown',
      amount: -25.50,
      balance: 125.50,
      status: 'completed'
    },
    {
      id: 'TXN002',
      date: '2024-01-13',
      time: '06:48 PM',
      type: 'topup',
      description: 'Wallet Top-up',
      amount: 50.00,
      balance: 151.00,
      status: 'completed'
    },
    {
      id: 'TXN003',
      date: '2024-01-12',
      time: '11:23 AM',
      type: 'payment',
      description: 'Ride from Airport to Hotel',
      amount: -45.00,
      balance: 101.00,
      status: 'completed'
    },
    {
      id: 'TXN004',
      date: '2024-01-10',
      time: '03:30 PM',
      type: 'refund',
      description: 'Refund for cancelled ride',
      amount: 22.00,
      balance: 146.00,
      status: 'completed'
    }
  ])

  const topUpMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard />, fee: 0 },
    { id: 'bank', name: 'Bank Transfer', icon: <AccountBalance />, fee: 0 },
    { id: 'wallet', name: 'Digital Wallet', icon: <Smartphone />, fee: 2.5 }
  ]

  const quickTopUpAmounts = [10, 25, 50, 100, 200]

  const stats = {
    totalAdded: transactions.filter(t => t.type === 'topup').reduce((sum, t) => sum + t.amount, 0),
    totalSpent: Math.abs(transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0)),
    totalRefunds: transactions.filter(t => t.type === 'refund').reduce((sum, t) => sum + t.amount, 0),
    thisMonthSpent: 45.50 // Mock calculation
  }

  const handleTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const amount = parseFloat(topUpAmount)
      const fee = topUpMethods.find(m => m.id === selectedTopUpMethod).fee
      const totalAmount = amount + (amount * fee / 100)
      
      setWalletBalance(prev => prev + amount)
      setLoading(false)
      setShowTopUpDialog(false)
      setTopUpAmount('')
      setCurrentStep(0)
      
      alert(`Successfully added $${amount.toFixed(2)} to your wallet!`)
    }, 2000)
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    if (parseFloat(withdrawAmount) > walletBalance) {
      alert('Insufficient balance')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const amount = parseFloat(withdrawAmount)
      setWalletBalance(prev => prev - amount)
      setLoading(false)
      setShowWithdrawDialog(false)
      setWithdrawAmount('')
      
      alert(`Successfully withdrew $${amount.toFixed(2)} from your wallet!`)
    }, 2000)
  }

  const handleTransfer = async () => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    if (!transferEmail || !transferEmail.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    if (parseFloat(transferAmount) > walletBalance) {
      alert('Insufficient balance')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const amount = parseFloat(transferAmount)
      setWalletBalance(prev => prev - amount)
      setLoading(false)
      setShowTransferDialog(false)
      setTransferAmount('')
      setTransferEmail('')
      
      alert(`Successfully transferred $${amount.toFixed(2)} to ${transferEmail}!`)
    }, 2000)
  }

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'topup': return <ArrowDownward color="success" />
      case 'payment': return <ArrowUpward color="error" />
      case 'refund': return <SwapHoriz color="warning" />
      default: return <Receipt />
    }
  }

  const getTransactionColor = (type) => {
    switch (type) {
      case 'topup': return 'success'
      case 'payment': return 'error'
      case 'refund': return 'warning'
      default: return 'default'
    }
  }

  const topUpSteps = ['Select Amount', 'Choose Method', 'Confirm Payment']

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            My Wallet
          </Typography>

          {/* Wallet Balance Card */}
          <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AccountBalanceWallet sx={{ fontSize: 48, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" color="rgba(255,255,255,0.8)">
                        Current Balance
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        ${walletBalance.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    Available for rides and transfers
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setShowTopUpDialog(true)}
                      sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                    >
                      Top Up
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Remove />}
                      onClick={() => setShowWithdrawDialog(true)}
                      sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    >
                      Withdraw
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <TrendingDown sx={{ mr: 2, color: 'success.main' }} />
                    <Box>
                      <Typography variant="h6">${stats.totalAdded.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Total Added</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <TrendingUp sx={{ mr: 2, color: 'error.main' }} />
                    <Box>
                      <Typography variant="h6">${stats.totalSpent.toFixed(2)}</Typography>
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
                    <SwapHoriz sx={{ mr: 2, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="h6">${stats.totalRefunds.toFixed(2)}</Typography>
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
                    <Receipt sx={{ mr: 2, color: 'info.main' }} />
                    <Box>
                      <Typography variant="h6">${stats.thisMonthSpent.toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">This Month</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => setShowTopUpDialog(true)}
                    fullWidth
                  >
                    Add Money
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    startIcon={<SwapHoriz />}
                    onClick={() => setShowTransferDialog(true)}
                    fullWidth
                  >
                    Send Money
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    startIcon={<History />}
                    fullWidth
                  >
                    View History
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Recent Transactions</Typography>
                <IconButton>
                  <Refresh />
                </IconButton>
              </Box>

              <List>
                {transactions.map((transaction) => (
                  <ListItem key={transaction.id} divider>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: `${getTransactionColor(transaction.type)}.main` }}>
                        {getTransactionIcon(transaction.type)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={transaction.description}
                      secondary={`${transaction.date} at ${transaction.time} - Balance: $${transaction.balance.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Box textAlign="center" mt={2}>
                <Button variant="text">View All Transactions</Button>
              </Box>
            </CardContent>
          </Card>

          {/* Top Up Dialog */}
          <Dialog open={showTopUpDialog} onClose={() => setShowTopUpDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Top Up Wallet</DialogTitle>
            <DialogContent>
              <Stepper activeStep={currentStep} sx={{ mb: 3 }}>
                {topUpSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {currentStep === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Select Amount</Typography>
                  <Grid container spacing={2} mb={3}>
                    {quickTopUpAmounts.map((amount) => (
                      <Grid item xs={4} key={amount}>
                        <Button
                          variant={topUpAmount === amount.toString() ? 'contained' : 'outlined'}
                          onClick={() => setTopUpAmount(amount.toString())}
                          fullWidth
                        >
                          ${amount}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                  <TextField
                    fullWidth
                    label="Custom Amount"
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    InputProps={{ startAdornment: '$' }}
                  />
                </Box>
              )}

              {currentStep === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Choose Payment Method</Typography>
                  <List>
                    {topUpMethods.map((method) => (
                      <ListItem 
                        key={method.id}
                        button
                        selected={selectedTopUpMethod === method.id}
                        onClick={() => setSelectedTopUpMethod(method.id)}
                      >
                        <ListItemIcon>
                          {method.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={method.name}
                          secondary={method.fee > 0 ? `${method.fee}% fee` : 'No fee'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {currentStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Confirm Top Up</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Amount: ${topUpAmount}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Method: {topUpMethods.find(m => m.id === selectedTopUpMethod)?.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Fee: ${((parseFloat(topUpAmount) || 0) * (topUpMethods.find(m => m.id === selectedTopUpMethod)?.fee || 0) / 100).toFixed(2)}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6">
                      Total: ${(parseFloat(topUpAmount) || 0) + ((parseFloat(topUpAmount) || 0) * (topUpMethods.find(m => m.id === selectedTopUpMethod)?.fee || 0) / 100).toFixed(2)}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowTopUpDialog(false)}>Cancel</Button>
              {currentStep > 0 && (
                <Button onClick={() => setCurrentStep(prev => prev - 1)}>Back</Button>
              )}
              <Button 
                onClick={() => {
                  if (currentStep < topUpSteps.length - 1) {
                    setCurrentStep(prev => prev + 1)
                  } else {
                    handleTopUp()
                  }
                }}
                variant="contained"
                disabled={loading || (currentStep === 0 && !topUpAmount)}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Processing...' : currentStep === topUpSteps.length - 1 ? 'Confirm Top Up' : 'Next'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Withdraw Dialog */}
          <Dialog open={showWithdrawDialog} onClose={() => setShowWithdrawDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogContent>
              <Alert severity="info" sx={{ mb: 3 }}>
                Withdrawals will be processed to your linked bank account within 3-5 business days.
              </Alert>
              
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                InputProps={{ startAdornment: '$' }}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                Available Balance: ${walletBalance.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowWithdrawDialog(false)}>Cancel</Button>
              <Button 
                onClick={handleWithdraw}
                variant="contained"
                disabled={loading || !withdrawAmount || parseFloat(withdrawAmount) > walletBalance}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Processing...' : 'Withdraw'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Transfer Dialog */}
          <Dialog open={showTransferDialog} onClose={() => setShowTransferDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Send Money</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Recipient Email"
                type="email"
                value={transferEmail}
                onChange={(e) => setTransferEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                InputProps={{ startAdornment: '$' }}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                Available Balance: ${walletBalance.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowTransferDialog(false)}>Cancel</Button>
              <Button 
                onClick={handleTransfer}
                variant="contained"
                disabled={loading || !transferAmount || !transferEmail || parseFloat(transferAmount) > walletBalance}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Processing...' : 'Send Money'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Wallet
