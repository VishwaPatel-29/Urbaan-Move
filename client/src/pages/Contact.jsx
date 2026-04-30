import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  useTheme as useMuiTheme,
  IconButton,
  Divider,
} from '@mui/material'
import {
  Phone,
  Email,
  CheckCircle,
  Chat,
  ArrowForward,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  const theme = useMuiTheme()
  const isDark = theme.palette.mode === 'dark'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const contactCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payment' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'partnership', label: 'Partnerships' },
  ]

  const supportChannels = [
    {
      type: 'phone',
      title: 'Phone Support',
      description: 'Immediate assistance from our team.',
      contact: '+1 (555) 123-4567',
      hours: 'Mon-Fri 9AM-6PM EST',
      icon: <Phone />,
      color: '#00B4B4'
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Response within 24 hours.',
      contact: 'support@urbanmove.com',
      hours: '24/7 Availability',
      icon: <Email />,
      color: '#ec4899'
    },
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Real-time support in-app.',
      contact: 'Open Dashboard',
      hours: 'Mon-Fri 8AM-8PM EST',
      icon: <Chat />,
      color: '#00B4B4'
    }
  ]

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setShowSuccessDialog(true)
      setFormData({
        name: '', email: '', phone: '', subject: '', category: 'general', message: '', priority: 'normal'
      })
      setErrors({})
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Premium glassmorphism style
  const glassStyle = {
    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  }

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '& fieldset': { borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
      '&:hover fieldset': { borderColor: '#00B4B4' },
      '&.Mui-focused fieldset': { borderColor: '#00B4B4' },
    },
    '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
    '& .MuiInputLabel-root.Mui-focused': { color: '#00B4B4' },
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: isDark ? '#050505' : '#f9fafb', position: 'relative', overflow: 'hidden' }}>
      <Helmet>
        <title>Contact Us | UrbanMove</title>
        <meta name="description" content="Connect with UrbanMove's elite support team" />
      </Helmet>

      <Navbar />

      {/* Dynamic Background Elements */}
      <Box sx={{ 
        position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', 
        background: 'radial-gradient(circle, rgba(0, 180, 180, 0.15) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0
      }} />
      <Box sx={{ 
        position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', 
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ pt: { xs: '120px', md: '160px' }, pb: 12, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6}>
          {/* Left Column: Info & Links */}
          <Grid item xs={12} lg={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="overline"
                sx={{ color: '#00B4B4', fontWeight: 800, letterSpacing: '4px', mb: 2, display: 'block' }}
              >
                GET IN TOUCH
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  color: theme.palette.text.primary,
                  lineHeight: 1.1,
                  mb: 3
                }}
              >
                Let's <span style={{ color: '#00B4B4' }}>Start</span> a Conversation
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.text.secondary, mb: 6, maxWidth: '500px', fontWeight: 400 }}
              >
                Have a question or looking to partner? Our team is dedicated to providing elite support for your corporate mobility needs.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 6 }}>
                {supportChannels.map((channel, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ 
                      width: 56, height: 56, borderRadius: '16px', 
                      background: `linear-gradient(135deg, ${channel.color}22 0%, ${channel.color}44 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: channel.color, border: `1px solid ${channel.color}33`
                    }}>
                      {channel.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{channel.title}</Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>{channel.contact}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ mb: 4, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Follow Our Journey</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[Twitter, LinkedIn, Facebook, Instagram].map((Icon, i) => (
                  <IconButton 
                    key={i} 
                    sx={{ 
                      bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      '&:hover': { color: '#00B4B4', transform: 'translateY(-3px)' },
                      transition: 'all 0.3s'
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Right Column: Contact Form */}
          <Grid item xs={12} lg={7}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card sx={glassStyle} elevation={0}>
                <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Send a Message</Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 5 }}>
                    Fill out the form below and we'll connect you with the right department.
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth label="Full Name" name="name"
                          value={formData.name} onChange={handleChange}
                          error={!!errors.name} helperText={errors.name}
                          sx={inputStyles}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth label="Work Email" name="email"
                          value={formData.email} onChange={handleChange}
                          error={!!errors.email} helperText={errors.email}
                          sx={inputStyles}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth label="Phone (Optional)" name="phone"
                          value={formData.phone} onChange={handleChange}
                          sx={inputStyles}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={inputStyles}>
                          <InputLabel>Inquiry Category</InputLabel>
                          <Select
                            name="category" value={formData.category} onChange={handleChange}
                            label="Inquiry Category"
                          >
                            {contactCategories.map(cat => (
                              <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth label="Subject" name="subject"
                          value={formData.subject} onChange={handleChange}
                          error={!!errors.subject} helperText={errors.subject}
                          sx={inputStyles}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth label="Message" name="message"
                          value={formData.message} onChange={handleChange}
                          error={!!errors.message} helperText={errors.message}
                          multiline rows={5}
                          sx={inputStyles}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit" variant="contained" size="large"
                          disabled={loading} fullWidth
                          endIcon={!loading && <ArrowForward />}
                          sx={{
                            borderRadius: '16px', py: 2, fontSize: '1.1rem', fontWeight: 700,
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                            boxShadow: '0 8px 24px rgba(0, 180, 180, 0.3)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
                              transform: 'scale(1.02)'
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {loading ? <CircularProgress size={28} color="inherit" /> : 'Send Elite Inquiry'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Success Dialog */}
      <Dialog 
        open={showSuccessDialog} 
        onClose={() => setShowSuccessDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: '24px', p: 2, background: isDark ? '#111' : '#fff' }
        }}
      >
        <DialogContent>
          <Box textAlign="center" py={4}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            >
              <CheckCircle sx={{ fontSize: 80, color: '#00B4B4', mb: 3 }} />
            </motion.div>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Inquiry Received</Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
              Thank you for reaching out. A specialized support executive will contact you shortly via email.
            </Typography>
            <Button 
              onClick={() => setShowSuccessDialog(false)} 
              variant="contained" 
              fullWidth
              sx={{ borderRadius: '12px', py: 1.5, textTransform: 'none', fontWeight: 700, bgcolor: '#00B4B4' }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Footer />
    </Box>
  )
}

export default Contact
