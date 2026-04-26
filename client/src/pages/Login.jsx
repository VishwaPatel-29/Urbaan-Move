import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
  Grid,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  DirectionsBus,
  AdminPanelSettings,
  Security,
  HowToReg,
  Person,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { setCredentials, setError, setLoading, selectAuthLoading, selectAuthError } from '../features/authSlice'
import { authService } from '../services/api'
import googleAuthService from '../services/googleAuth'
import Navbar from '../components/Navbar'
import LottieSuccess from '../components/LottieSuccess'

const loginSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().oneOf(['employee', 'driver', 'admin'], 'Invalid role').required('Role is required'),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(setLoading(true))
      const response = await authService.login(values)
      const { user, token } = response.data
      
      dispatch(setCredentials({ user, token }))
      setLoginSuccess(true)
      
      setTimeout(() => {
        toast.success(`Welcome back, ${user.name}!`)
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin-dashboard')
        } else if (user.role === 'driver') {
          navigate('/driver-dashboard')
        } else {
          navigate('/dashboard')
        }
      }, 1500)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      dispatch(setError(message))
      toast.error(message)
    } finally {
      setSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      toast.loading('Connecting to Google...', { id: 'google-auth' })
      
      // For demo purposes, use mock auth
      // In production, replace with: const userData = await googleAuthService.signIn()
      const userData = await googleAuthService.mockSignIn()
      
      // Send Google user data to backend
      const response = await authService.googleLogin({
        email: userData.email,
        name: userData.name,
        googleId: userData.googleId,
        profilePicture: userData.profilePicture,
      })
      
      const { user, token } = response.data
      dispatch(setCredentials({ user, token }))
      setLoginSuccess(true)
      
      toast.success('Welcome back!', { id: 'google-auth' })
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('Google login error:', error)
      toast.error('Google login failed. Please try again.', { id: 'google-auth' })
    } finally {
      setGoogleLoading(false)
    }
  }

  if (loginSuccess) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
        <LottieSuccess />
      </Box>
    )
  }

  return (
    <>
      <Helmet>
        <title>Login | KBD-Havya</title>
        <meta name="description" content="Login to your KBD-Havya account to book rides and manage your commute." />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Navbar />

        {/* Welcome Back Header - Centered Above Both Columns */}
        <Box
          sx={{
            py: { xs: 3, md: 4 },
            px: { xs: 2, sm: 4 },
            textAlign: 'center',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {/* Modern Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 1,
              mb: 3,
              background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(0, 180, 180, 0.05) 100%)',
              border: '1px solid rgba(0, 180, 180, 0.3)',
              borderRadius: '50px',
              fontSize: '0.8rem',
              color: '#00B4B4',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            <Security sx={{ fontSize: 16, mr: 1 }} />
            Secure Authentication
            <Security sx={{ fontSize: 16, ml: 1 }} />
          </Box>

          {/* Modern Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #00B4B4 50%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0, 180, 180, 0.3)',
              lineHeight: 1.1,
            }}
          >
            Welcome Back
          </Typography>

          {/* Subtitle with Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                color: '#888',
                fontWeight: 400,
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <HowToReg sx={{ fontSize: 24, color: '#00B4B4' }} />
              Sign in to access your KBD-Havya dashboard
              <HowToReg sx={{ fontSize: 24, color: '#00B4B4' }} />
            </Typography>
          </Box>

          {/* Modern Divider */}
          <Box
            sx={{
              width: '100px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #00B4B4, transparent)',
              margin: '0 auto',
              borderRadius: '2px',
            }}
          />
        </Box>

        {/* Main Two-Column Layout */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            position: 'relative',
            zIndex: 2,
            height: 'calc(100vh - 200px)', // Fixed height for both columns
          }}
        >
          {/* LEFT COLUMN - Login Form */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-start', // Start from top with fixed height
              justifyContent: 'center',
              height: '100%', // Fixed height of parent
              px: { xs: 2, sm: 4 },
              py: { xs: 4, md: 8 },
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
              borderRight: { md: '1px solid rgba(0, 180, 180, 0.2)' },
              position: 'relative',
              overflow: 'hidden',
              pt: { xs: 2, md: 4 },
              pb: { xs: 2, md: 4 },
            }}
          >
            {/* Background Effects for Left Side */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0, 180, 180, 0.03) 35px, rgba(0, 180, 180, 0.03) 70px),
                  repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(0, 180, 180, 0.02) 35px, rgba(0, 180, 180, 0.02) 70px)
                `,
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '-20%',
                left: '-20%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(0, 180, 180, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite',
                zIndex: 0,
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ position: 'relative', zIndex: 3, height: '100%' }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '90%', md: '85%', lg: '80%' },
                  minWidth: { xs: '100%', sm: '400px', md: '450px', lg: '500px' },
                  p: { xs: 3, sm: 4, md: 5, lg: 6 },
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(15, 15, 15, 0.98) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(0, 180, 180, 0.2)',
                  boxShadow: `
                    0 0 0 1px rgba(0, 180, 180, 0.1),
                    0 20px 40px rgba(0, 0, 0, 0.8),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glass Effect Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 50%, rgba(255, 255, 255, 0.01) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />

                {/* Top Accent Line */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00B4B4, transparent)',
                    animation: 'slide 3s ease-in-out infinite',
                    zIndex: 2,
                  }}
                />
                <style>
                  {`
                    @keyframes float {
                      0%, 100% { transform: translate(0, 0) scale(1); }
                      25% { transform: translate(30px, -30px) scale(1.05); }
                      50% { transform: translate(-20px, 20px) scale(0.95); }
                      75% { transform: translate(20px, 30px) scale(1.02); }
                    }
                    @keyframes slide {
                      0%, 100% { transform: translateX(-100%); }
                      50% { transform: translateX(100%); }
                    }
                  `}
                </style>
                <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 3 }}>
                  {/* Platform Features */}
                  <Box sx={{ 
                    mt: 2, 
                    mb: 4,
                    p: 2, 
                    background: 'rgba(0, 180, 180, 0.05)', 
                    borderRadius: 2, 
                    border: '1px solid rgba(0, 180, 180, 0.2)',
                    textAlign: 'left'
                  }}>
                    <Typography variant="h6" sx={{ color: '#00B4B4', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                      🌟 Platform Features
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • 🚌 Smart ride booking system
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • 📍 Real-time GPS tracking
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • 💳 Automated payment processing
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • 📊 Advanced analytics dashboard
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • 🔐 Secure authentication system
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', display: 'block' }}>
                      • 📱 Mobile-responsive design
                    </Typography>
                  </Box>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Formik
                  initialValues={{ name: '', email: '', password: '', role: 'employee' }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                    <Form>
                      {/* Modern Role Selection Section */}
                      <Box sx={{ mb: 6, position: 'relative', zIndex: 3 }}>
                        {/* Section Header */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#ffffff',
                              fontWeight: 700,
                              mb: 2,
                              fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.4rem' },
                            }}
                          >
                            Select Your Access Level
                          </Typography>
                        </Box>

                        {/* Compact Role Cards */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            mb: 4,
                          }}
                        >
                          {/* Employee Card */}
                          <Box
                            onClick={() => setFieldValue('role', 'employee')}
                            sx={{
                              flex: 1,
                              p: 2,
                              background: values.role === 'employee'
                                ? 'linear-gradient(135deg, rgba(0, 180, 180, 0.2) 0%, rgba(0, 180, 180, 0.1) 100%)'
                                : 'rgba(255, 255, 255, 0.02)',
                              border: values.role === 'employee'
                                ? '2px solid #00B4B4'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 2,
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden',
                              '&:hover': {
                                background: 'rgba(0, 180, 180, 0.08)',
                                borderColor: '#00B4B4',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(0, 180, 180, 0.3)',
                              },
                            }}
                          >
                            <Person sx={{ fontSize: 24, color: '#00B4B4', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                              Employee
                            </Typography>
                            {values.role === 'employee' && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  width: 8,
                                  height: 8,
                                  background: '#00B4B4',
                                  borderRadius: '50%',
                                }}
                              />
                            )}
                          </Box>

                          {/* Driver Card */}
                          <Box
                            onClick={() => setFieldValue('role', 'driver')}
                            sx={{
                              flex: 1,
                              p: 2,
                              background: values.role === 'driver'
                                ? 'linear-gradient(135deg, rgba(0, 180, 180, 0.15) 0%, rgba(0, 180, 180, 0.08) 100%)'
                                : 'rgba(255, 255, 255, 0.02)',
                              border: values.role === 'driver'
                                ? '2px solid #00B4B4'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 2,
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden',
                              '&:hover': {
                                background: 'rgba(0, 180, 180, 0.06)',
                                borderColor: '#00B4B4',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(0, 180, 180, 0.25)',
                              },
                            }}
                          >
                            <DirectionsBus sx={{ fontSize: 24, color: '#00B4B4', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                              Driver
                            </Typography>
                            {values.role === 'driver' && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  width: 8,
                                  height: 8,
                                  background: '#00B4B4',
                                  borderRadius: '50%',
                                }}
                              />
                            )}
                          </Box>

                          {/* Admin Card */}
                          <Box
                            onClick={() => setFieldValue('role', 'admin')}
                            sx={{
                              flex: 1,
                              p: 2,
                              background: values.role === 'admin'
                                ? 'linear-gradient(135deg, rgba(0, 180, 180, 0.12) 0%, rgba(0, 180, 180, 0.06) 100%)'
                                : 'rgba(255, 255, 255, 0.02)',
                              border: values.role === 'admin'
                                ? '2px solid #00B4B4'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 2,
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden',
                              '&:hover': {
                                background: 'rgba(0, 180, 180, 0.05)',
                                borderColor: '#00B4B4',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(0, 180, 180, 0.2)',
                              },
                            }}
                          >
                            <AdminPanelSettings sx={{ fontSize: 24, color: '#00B4B4', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                              Admin
                            </Typography>
                            {values.role === 'admin' && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  width: 8,
                                  height: 8,
                                  background: '#00B4B4',
                                  borderRadius: '50%',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                        
                        {errors.role && touched.role && (
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" color="error" sx={{ fontSize: '0.8rem' }}>
                              ⚠️ {errors.role}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Modern Form Fields */}
                      <Box sx={{ mb: 4, position: 'relative', zIndex: 3 }}>
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            fullWidth
                            name="name"
                            label="Your Name"
                            type="text"
                            variant="outlined"
                            size="medium"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person sx={{ color: '#00B4B4', fontSize: '1.2rem' }} />
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              sx: { 
                                color: '#888',
                                '&.Mui-focused': { color: '#00B4B4' } 
                              }
                            }}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                background: 'rgba(255, 255, 255, 0.02)',
                                color: '#fff',
                                fontSize: '1rem',
                                '& fieldset': {
                                  borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#00B4B4',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#00B4B4',
                                },
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            size="medium"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email sx={{ color: '#00B4B4', fontSize: '1.2rem' }} />
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              sx: { 
                                color: '#a0a0a0', 
                                fontSize: '0.9rem',
                                '&.Mui-focused': { color: '#00B4B4' } 
                              }
                            }}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                background: 'rgba(255, 255, 255, 0.02)',
                                color: '#fff',
                                fontSize: '1rem',
                                borderRadius: 2,
                                '& fieldset': { 
                                  borderColor: 'rgba(255, 255, 255, 0.1)',
                                  borderWidth: '1px'
                                },
                                '&:hover fieldset': { borderColor: 'rgba(0, 180, 180, 0.3)' },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#00B4B4',
                                  borderWidth: '1px'
                                },
                              },
                              '& .MuiFormHelperText-root': {
                                color: '#FF6B6B',
                                marginLeft: 0,
                                fontSize: '0.8rem',
                              },
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                          <TextField
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            size="medium"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock sx={{ color: '#00B4B4', fontSize: '1.2rem' }} />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={{ 
                                      color: '#a0a0a0',
                                      '&:hover': { color: '#00B4B4' }
                                    }}
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            InputLabelProps={{
                              sx: { 
                                color: '#a0a0a0', 
                                fontSize: '0.9rem',
                                '&.Mui-focused': { color: '#00B4B4' } 
                              }
                            }}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                background: 'rgba(255, 255, 255, 0.02)',
                                color: '#fff',
                                fontSize: '1rem',
                                borderRadius: 2,
                                '& fieldset': { 
                                  borderColor: 'rgba(255, 255, 255, 0.1)',
                                  borderWidth: '1px'
                                },
                                '&:hover fieldset': { borderColor: 'rgba(0, 180, 180, 0.3)' },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#00B4B4',
                                  borderWidth: '1px'
                                },
                              },
                              '& .MuiFormHelperText-root': {
                                color: '#FF6B6B',
                                marginLeft: 0,
                                fontSize: '0.8rem',
                              },
                            }}
                          />
                        </Box>

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          disabled={isSubmitting || loading}
                          sx={{
                            py: 2,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #00B4B4 0%, #008080 50%, #006666 100%)',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '1rem',
                            textTransform: 'none',
                            boxShadow: '0 4px 20px rgba(0, 180, 180, 0.3)',
                            border: '1px solid rgba(0, 180, 180, 0.3)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                              transition: 'left 0.5s',
                            },
                            '&:hover': {
                              background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 50%, #880E4F 100%)',
                              boxShadow: '0 6px 25px rgba(255, 107, 107, 0.4)',
                              transform: 'translateY(-2px)',
                              '&::before': {
                                left: '100%',
                              },
                            },
                            '&:active': {
                              transform: 'translateY(0)',
                            },
                            '&.Mui-disabled': {
                              background: 'rgba(255, 255, 255, 0.1)',
                              color: 'rgba(255, 255, 255, 0.3)',
                            },
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    OR
                  </Typography>
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={googleLoading ? <CircularProgress size={20} color="inherit" /> : <Google />}
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  sx={{
                    py: 1.5,
                    borderColor: '#333',
                    color: '#fff',
                    '&:hover': {
                      borderColor: '#00B4B4',
                      background: 'rgba(0, 180, 180, 0.1)',
                    },
                    '&:disabled': {
                      borderColor: '#555',
                      color: '#777',
                    },
                  }}
                >
                  {googleLoading ? <CircularProgress size={20} color="inherit" /> : 'Continue with Google'}
                </Button>

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      color: '#a0a0a0',
                    }}
                  >
                    Don&apos;t have an account?{' '}
                    <Link
                      to="/register"
                      style={{
                        color: '#00B4B4',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>

                {/* Additional Content to Balance Left Column */}
                <Box sx={{ mt: 4, position: 'relative', zIndex: 3 }}>
                  {/* Benefits */}
                  <Box sx={{ 
                    p: 3, 
                    background: 'rgba(0, 180, 180, 0.03)', 
                    borderRadius: 2, 
                    border: '1px solid rgba(0, 180, 180, 0.15)',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h6" sx={{ color: '#00B4B4', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                      ⭐ Why Choose KBD-Havya?
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • 24/7 customer support
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • Real-time tracking
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', mb: 0.5, display: 'block' }}>
                      • Affordable pricing
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#a0a0a0', display: 'block' }}>
                      • Eco-friendly transport
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>

          {/* RIGHT COLUMN - Demo Access and Features */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-start', // Start from top with fixed height
              justifyContent: 'center',
              height: '100%', // Fixed height of parent
              px: { xs: 2, sm: 4 },
              py: { xs: 4, md: 8 },
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)',
              position: 'relative',
              overflow: 'hidden',
              pt: { xs: 2, md: 4 },
              pb: { xs: 2, md: 4 },
            }}
          >
            {/* Background Effects for Right Side */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0, 180, 180, 0.02) 35px, rgba(0, 180, 180, 0.02) 70px),
                  repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(0, 180, 180, 0.01) 35px, rgba(0, 180, 180, 0.01) 70px)
                `,
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '-20%',
                right: '-20%',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(0, 180, 180, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite reverse',
                zIndex: 0,
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              style={{ position: 'relative', zIndex: 3, height: '100%' }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '90%', md: '85%', lg: '80%' },
                  minWidth: { xs: '100%', sm: '400px', md: '450px', lg: '500px' },
                  p: { xs: 3, sm: 4, md: 5, lg: 6 },
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(15, 15, 15, 0.98) 100%)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(0, 180, 180, 0.2)',
                  boxShadow: `
                    0 0 0 1px rgba(0, 180, 180, 0.1),
                    0 20px 40px rgba(0, 0, 0, 0.8),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glass Effect Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 50%, rgba(255, 255, 255, 0.01) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />

                {/* Top Accent Line */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00B4B4, transparent)',
                    animation: 'slide 3s ease-in-out infinite',
                    zIndex: 2,
                  }}
                />

                <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 3 }}>
                  {/* Modern Badge */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 3,
                      py: 1,
                      mb: 4,
                      background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(0, 180, 180, 0.05) 100%)',
                      border: '1px solid rgba(0, 180, 180, 0.3)',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      color: '#00B4B4',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    <HowToReg sx={{ fontSize: 16, mr: 1 }} />
                    Demo Access
                    <HowToReg sx={{ fontSize: 16, ml: 1 }} />
                  </Box>

                  {/* Subtitle */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#888',
                      fontWeight: 400,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      mb: 3,
                    }}
                  >
                    Experience our platform with demo accounts
                  </Typography>

                  {/* Modern Divider */}
                  <Box
                    sx={{
                      width: '100px',
                      height: '3px',
                      background: 'linear-gradient(90deg, transparent, #00B4B4, transparent)',
                      margin: '0 auto 4px auto',
                      borderRadius: '2px',
                    }}
                  />
                </Box>

                {/* Demo Account Cards */}
                <Box sx={{ mb: 6, position: 'relative', zIndex: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box sx={{
                        p: 3,
                        background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.12) 0%, rgba(0, 180, 180, 0.06) 100%)',
                        borderRadius: 3,
                        border: '1px solid rgba(0, 180, 180, 0.3)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          background: 'rgba(0, 180, 180, 0.2)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 180, 180, 0.3)'
                        }
                      }}>
                        <Person sx={{ fontSize: 48, color: '#00B4B4', mb: 2 }} />
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
                          👤 Employee
                        </Typography>
                        <Box sx={{ 
                          background: 'rgba(0, 0, 0, 0.3)', 
                          p: 2, 
                          borderRadius: 2, 
                          mb: 2,
                          fontFamily: 'monospace'
                        }}>
                          <Typography variant="caption" sx={{ color: '#00B4B4', display: 'block' }}>
                            demo@kbd-havya.com
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#00B4B4', display: 'block' }}>
                            Demo1234
                          </Typography>
                        </Box>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const nameInput = document.querySelector('input[name="name"]')
                            const emailInput = document.querySelector('input[name="email"]')
                            const passwordInput = document.querySelector('input[name="password"]')
                            if (nameInput) nameInput.value = 'John Employee'
                            if (emailInput) emailInput.value = 'demo@kbd-havya.com'
                            if (passwordInput) passwordInput.value = 'Demo1234'
                            setFieldValue('role', 'employee')
                          }}
                          sx={{ 
                            color: '#00B4B4', 
                            borderColor: '#00B4B4',
                            fontWeight: 600,
                            '&:hover': { 
                              background: 'rgba(0, 180, 180, 0.15)',
                              borderColor: '#00B4B4'
                            }
                          }}
                        >
                          🚀 Quick Login
                        </Button>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{
                        p: 3,
                        background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.08) 0%, rgba(0, 180, 180, 0.04) 100%)',
                        borderRadius: 3,
                        border: '1px solid rgba(0, 180, 180, 0.25)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          background: 'rgba(0, 180, 180, 0.15)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 180, 180, 0.25)'
                        }
                      }}>
                        <DirectionsBus sx={{ fontSize: 48, color: '#00B4B4', mb: 2 }} />
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
                          🚗 Driver
                        </Typography>
                        <Box sx={{ 
                          background: 'rgba(0, 0, 0, 0.3)', 
                          p: 2, 
                          borderRadius: 2, 
                          mb: 2,
                          fontFamily: 'monospace'
                        }}>
                          <Typography variant="caption" sx={{ color: '#00B4B4', display: 'block' }}>
                            driver@kbd-havya.com
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#00B4B4', display: 'block' }}>
                            Driver1234
                          </Typography>
                        </Box>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const nameInput = document.querySelector('input[name="name"]')
                            const emailInput = document.querySelector('input[name="email"]')
                            const passwordInput = document.querySelector('input[name="password"]')
                            if (nameInput) nameInput.value = 'Mike Driver'
                            if (emailInput) emailInput.value = 'driver@kbd-havya.com'
                            if (passwordInput) passwordInput.value = 'Driver1234'
                            setFieldValue('role', 'driver')
                          }}
                          sx={{ 
                            color: '#00B4B4', 
                            borderColor: '#00B4B4',
                            fontWeight: 600,
                            '&:hover': { 
                              background: 'rgba(0, 180, 180, 0.12)',
                              borderColor: '#00B4B4'
                            }
                          }}
                        >
                          🚀 Quick Login
                        </Button>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{
                        p: 3,
                        background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.06) 0%, rgba(0, 180, 180, 0.03) 100%)',
                        borderRadius: 3,
                        border: '1px solid rgba(0, 180, 180, 0.2)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          background: 'rgba(0, 180, 180, 0.12)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 180, 180, 0.2)'
                        }
                      }}>
                        <AdminPanelSettings sx={{ fontSize: 48, color: '#00B4B4', mb: 2 }} />
                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
                          ⚙️ Admin
                        </Typography>
                        <Box sx={{ 
                          background: 'rgba(0, 0, 0, 0.3)', 
                          p: 2, 
                          borderRadius: 2, 
                          mb: 2,
                          fontFamily: 'monospace'
                        }}>
                          <Typography variant="caption" sx={{ color: '#00B4B4', display: 'block' }}>
                            admin@kbd-havya.com
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#00B4B4', display: 'block' }}>
                            Admin1234
                          </Typography>
                        </Box>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const nameInput = document.querySelector('input[name="name"]')
                            const emailInput = document.querySelector('input[name="email"]')
                            const passwordInput = document.querySelector('input[name="password"]')
                            if (nameInput) nameInput.value = 'Sarah Admin'
                            if (emailInput) emailInput.value = 'admin@kbd-havya.com'
                            if (passwordInput) passwordInput.value = 'Admin1234'
                            setFieldValue('role', 'admin')
                          }}
                          sx={{ 
                            color: '#00B4B4', 
                            borderColor: '#00B4B4',
                            fontWeight: 600,
                            '&:hover': { 
                              background: 'rgba(0, 180, 180, 0.1)',
                              borderColor: '#00B4B4'
                            }
                          }}
                        >
                          🚀 Quick Login
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                
                <Box sx={{ textAlign: 'center', mt: 4, position: 'relative', zIndex: 3 }}>
                  <Typography variant="caption" sx={{ color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Security sx={{ fontSize: 16, color: '#00B4B4' }} />
                    Secure demo environment for testing purposes
                    <Security sx={{ fontSize: 16, color: '#00B4B4' }} />
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Login
