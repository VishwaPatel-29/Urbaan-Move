import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  TextField,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material'
import {
  Email,
  CheckCircle,
  Error,
  AccessTime,
  Refresh,
  MarkEmailRead,
  Security
} from '@mui/icons-material'

const EmailVerification = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [resendTimer, setResendTimer] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const [attempts, setAttempts] = useState(3)

  const steps = ['Enter Email', 'Verify Code', 'Confirmation']

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleEmailSubmit = async () => {
    if (!email) {
      setErrors({ email: 'Email is required' })
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Invalid email format' })
      return
    }

    setLoading(true)
    // Simulate API call to send verification email
    setTimeout(() => {
      setLoading(false)
      setCurrentStep(1)
      startResendTimer()
    }, 1500)
  }

  const startResendTimer = () => {
    setResendTimer(60)
  }

  const handleCodeVerification = async () => {
    if (!verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' })
      return
    }

    if (verificationCode.length !== 6) {
      setErrors({ verificationCode: 'Code must be 6 digits' })
      return
    }

    setLoading(true)
    // Simulate API call - demo accepts "123456"
    setTimeout(() => {
      setLoading(false)
      if (verificationCode === '123456') {
        setIsVerified(true)
        setCurrentStep(2)
      } else {
        setAttempts(prev => prev - 1)
        if (attempts <= 1) {
          setErrors({ 
            verificationCode: 'Too many failed attempts. Please request a new code.' 
          })
        } else {
          setErrors({ 
            verificationCode: `Invalid code. ${attempts - 1} attempts remaining.` 
          })
        }
      }
    }, 1000)
  }

  const handleResendCode = () => {
    if (resendTimer > 0) return
    
    setLoading(true)
    setAttempts(3)
    setVerificationCode('')
    setErrors({})
    
    setTimeout(() => {
      setLoading(false)
      startResendTimer()
    }, 1500)
  }

  const verificationTips = [
    'Check your spam/junk folder',
    'Make sure the email address is correct',
    'Wait up to 5 minutes for delivery',
    'Add us to your contacts to ensure delivery'
  ]

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Email Verification
      </Typography>

      <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card>
        <CardContent sx={{ p: 4 }}>
          {currentStep === 0 && (
            <Box>
              <Box display="flex" alignItems="center" mb={3}>
                <Email sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h6">Verify Your Email Address</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" paragraph>
                Enter your email address to receive a verification code. This helps us ensure your account security.
              </Typography>

              <TextField
                fullWidth
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email || 'Enter the email you used to register'}
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleEmailSubmit}
                disabled={loading || !email}
                startIcon={loading ? <CircularProgress size={20} /> : <MarkEmailRead />}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </Button>

              <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Why verify your email?
                </Typography>
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Security fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Account security and protection" />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Email fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Receive important notifications" />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Enable all account features" />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          )}

          {currentStep === 1 && (
            <Box>
              <Box display="flex" alignItems="center" mb={3}>
                <Email sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h6">Enter Verification Code</Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                We've sent a 6-digit verification code to <strong>{email}</strong>
              </Alert>

              <TextField
                fullWidth
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                error={!!errors.verificationCode}
                helperText={errors.verificationCode || 'Demo: Enter 123456'}
                placeholder="000000"
                inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.5rem' } }}
                sx={{ mb: 3 }}
              />

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="body2" color="text.secondary">
                  Didn't receive the code?
                </Typography>
                <Button
                  variant="text"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleResendCode}
                  startIcon={<Refresh />}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                </Button>
              </Box>

              {attempts < 3 && (
                <Box mb={3}>
                  <Chip 
                    label={`${attempts} attempts remaining`}
                    color={attempts > 1 ? 'warning' : 'error'}
                    size="small"
                  />
                </Box>
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={handleCodeVerification}
                disabled={loading || verificationCode.length !== 6}
                startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tips for receiving your code:
                </Typography>
                <List dense>
                  {verificationTips.map((tip, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AccessTime fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          )}

          {currentStep === 2 && (
            <Box textAlign="center">
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom color="success.main">
                Email Verified Successfully!
              </Typography>
              
              <Typography variant="body1" paragraph>
                Your email address <strong>{email}</strong> has been verified.
              </Typography>

              <Paper variant="outlined" sx={{ p: 2, textAlign: 'left', mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  What's next?
                </Typography>
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Full access to all features" />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Email fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Receive booking confirmations" />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Security fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Enhanced account security" />
                  </ListItem>
                </List>
              </Paper>

              <Box display="flex" gap={2}>
                <Button variant="outlined" fullWidth onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                </Button>
                <Button variant="contained" fullWidth onClick={() => window.location.href = '/profile'}>
                  Update Profile
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default EmailVerification
