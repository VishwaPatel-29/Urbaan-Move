import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  useTheme,
  Avatar,
  Chip,
  Fade,
  Container,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowForward,
  Person,
  DirectionsCar,
  AdminPanelSettings,
  RocketLaunch,
  Security,
  Speed,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { setCredentials, setError, setLoading, selectAuthLoading, selectAuthError } from '../features/authSlice'
import { authService } from '../services/api'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().oneOf(['employee', 'driver', 'admin'], 'Invalid role').required('Role is required'),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(setLoading(true))
      const response = await authService.login(values)
      const { user, token } = response.data
      
      dispatch(setCredentials({ user, token }))
      
      toast.success(`Welcome back, ${user.name}!`)
      
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin-dashboard')
        } else if (user.role === 'driver') {
          navigate('/driver-dashboard')
        } else {
          navigate('/dashboard')
        }
      }, 800)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      dispatch(setError(message))
      toast.error(message)
    } finally {
      setSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  const roleCards = [
    { 
      value: 'employee', 
      label: 'Employee', 
      icon: Person, 
      color: '#008080',
      gradient: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
      description: 'Book rides & manage commute'
    },
    { 
      value: 'driver', 
      label: 'Driver', 
      icon: DirectionsCar, 
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF4500 100%)',
      description: 'Drive & earn'
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      icon: AdminPanelSettings, 
      color: '#9B59B6',
      gradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
      description: 'Manage system'
    },
  ]

  if (!mounted) return null

  return (
    <>
      <Helmet>
        <title>Login | UrbanMove</title>
        <meta name="description" content="Next-gen corporate commute platform" />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* Animated Background */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 20%, rgba(155, 89, 182, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0 }}
          />
          
          {/* Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0], 
                scale: [0, 1, 0],
                y: [0, -100, -200],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                left: `${20 + i * 15}%`,
                top: `${60 + (i % 2) * 20}%`,
                width: '4px',
                height: '4px',
                background: ['#008080', '#FF6B35', '#9B59B6'][i % 3],
                borderRadius: '50%',
              }}
            />
          ))}
        </Box>

        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Main Login Card */}
            <Box
              sx={{
                background: 'rgba(15, 15, 15, 0.95)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Glitch Effect Overlay */}
              <AnimatePresence>
                {glitchEffect && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent, rgba(0, 128, 128, 0.1), transparent)',
                      zIndex: 1,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 2 }}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 3,
                      background: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
                      boxShadow: '0 8px 32px rgba(0, 128, 128, 0.3)',
                    }}
                  >
                    <RocketLaunch sx={{ fontSize: 36 }} />
                  </Avatar>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #008080 50%, #FFFFFF 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '2rem', sm: '2.5rem' },
                    }}
                  >
                    UrbanMove
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>
                    Next-Gen Corporate Commute Platform
                  </Typography>
                </motion.div>

                {/* Feature Pills */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                  <Chip
                    icon={<Speed sx={{ fontSize: 16 }} />}
                    label="Real-Time"
                    size="small"
                    sx={{
                      background: 'rgba(0, 128, 128, 0.1)',
                      color: '#008080',
                      border: '1px solid rgba(0, 128, 128, 0.3)',
                      fontSize: '0.7rem',
                    }}
                  />
                  <Chip
                    icon={<Security sx={{ fontSize: 16 }} />}
                    label="Secure"
                    size="small"
                    sx={{
                      background: 'rgba(255, 107, 53, 0.1)',
                      color: '#FF6B35',
                      border: '1px solid rgba(255, 107, 53, 0.3)',
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>
              </Box>

              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form */}
              <Formik
                initialValues={{ email: '', password: '', role: 'employee' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting, setFieldValue, values, handleChange, handleBlur }) => (
                  <Form>
                    {/* Role Selection */}
                    <Box sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
                      <Typography variant="body2" sx={{ color: '#AAA', mb: 2, textAlign: 'center', fontWeight: 600 }}>
                        CHOOSE YOUR ACCESS LEVEL
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
                        {roleCards.map((role, index) => {
                          const Icon = role.icon
                          return (
                            <motion.div
                              key={role.value}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Box
                                onClick={() => setFieldValue('role', role.value)}
                                sx={{
                                  p: 2,
                                  textAlign: 'center',
                                  background: values.role === role.value
                                    ? role.gradient
                                    : 'rgba(255, 255, 255, 0.02)',
                                  border: values.role === role.value
                                    ? `2px solid ${role.color}`
                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                  borderRadius: '16px',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  minHeight: '80px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  '&:hover': {
                                    background: values.role === role.value ? role.gradient : `${role.color}15`,
                                    transform: 'translateY(-2px)',
                                  },
                                }}
                              >
                                <Icon
                                  sx={{
                                    fontSize: 24,
                                    color: values.role === role.value ? '#fff' : role.color,
                                    mb: 1,
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: values.role === role.value ? '#fff' : '#AAA',
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {role.label}
                                </Typography>
                              </Box>
                            </motion.div>
                          )
                        })}
                      </Box>
                      {errors.role && touched.role && (
                        <Typography variant="caption" color="error" sx={{ fontSize: '0.7rem', mt: 1, display: 'block', textAlign: 'center' }}>
                          {errors.role}
                        </Typography>
                      )}
                    </Box>

                    {/* Email Field */}
                    <Box sx={{ mb: 3, position: 'relative', zIndex: 2 }}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: '#008080', fontSize: '1.2rem' }} />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          sx: { color: '#888', '&.Mui-focused': { color: '#008080' } }
                        }}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: 'rgba(255, 255, 255, 0.02)',
                            color: '#fff',
                            borderRadius: '12px',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                            '&:hover fieldset': { borderColor: '#008080' },
                            '&.Mui-focused fieldset': { borderColor: '#008080' },
                          },
                          '& .MuiFormHelperText-root': { color: '#FF6B35', marginLeft: 0 },
                        }}
                      />
                    </Box>

                    {/* Password Field */}
                    <Box sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#008080', fontSize: '1.2rem' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: '#888', '&:hover': { color: '#008080' } }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          sx: { color: '#888', '&.Mui-focused': { color: '#008080' } }
                        }}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: 'rgba(255, 255, 255, 0.02)',
                            color: '#fff',
                            borderRadius: '12px',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                            '&:hover fieldset': { borderColor: '#008080' },
                            '&.Mui-focused fieldset': { borderColor: '#008080' },
                          },
                          '& .MuiFormHelperText-root': { color: '#FF6B35', marginLeft: 0 },
                        }}
                      />
                    </Box>

                    {/* Submit Button */}
                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          disabled={isSubmitting || loading}
                          endIcon={<ArrowForward />}
                          sx={{
                            py: 3,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
                            color: '#000',
                            fontWeight: 700,
                            fontSize: '1rem',
                            textTransform: 'none',
                            boxShadow: '0 8px 32px rgba(0, 128, 128, 0.3)',
                            border: '1px solid rgba(0, 128, 128, 0.3)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #006666 0%, #005555 100%)',
                              boxShadow: '0 12px 40px rgba(0, 128, 128, 0.4)',
                            },
                            '&:active': { transform: 'scale(0.98)' },
                            '&.Mui-disabled': {
                              background: 'rgba(255, 255, 255, 0.1)',
                              color: 'rgba(255, 255, 255, 0.3)',
                            },
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Launch Dashboard'}
                        </Button>
                      </motion.div>
                    </Box>
                  </Form>
                )}
              </Formik>

              {/* Footer Links */}
              <Box sx={{ textAlign: 'center', mt: 3, position: 'relative', zIndex: 2 }}>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  No account?{' '}
                  <Link
                    to="/register"
                    style={{
                      color: '#008080',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Create one →
                  </Link>
                </Typography>
              </Box>

              {/* Demo Info */}
              <Box sx={{ 
                mt: 3, 
                p: 2, 
                background: 'rgba(0, 128, 128, 0.05)', 
                borderRadius: '12px', 
                border: '1px solid rgba(0, 128, 128, 0.2)',
                position: 'relative',
                zIndex: 2
              }}>
                <Typography variant="caption" sx={{ color: '#008080', display: 'block', mb: 1, textAlign: 'center', fontWeight: 600 }}>
                  ⚡ QUICK ACCESS
                </Typography>
                <Typography variant="caption" sx={{ color: '#888', display: 'block', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                  demo@urbanmove.com / Demo1234
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  )
}

export default Login
