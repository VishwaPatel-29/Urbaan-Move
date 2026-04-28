import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Avatar,
} from '@mui/material'
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  CheckCircle,
  SupportAgent,
  Business,
  HeadsetMic,
  Chat,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
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
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'complaint', label: 'Complaint' }
  ]

  const priorities = [
    { value: 'low', label: 'Low - General inquiry' },
    { value: 'normal', label: 'Normal - Standard response time' },
    { value: 'high', label: 'High - Urgent issue' },
    { value: 'urgent', label: 'Urgent - Emergency' }
  ]

  const supportChannels = [
    {
      type: 'phone',
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      contact: '+1 (555) 123-4567',
      hours: 'Mon-Fri 9AM-6PM EST',
      responseTime: 'Instant',
      icon: <Phone />,
      color: 'primary'
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@urbanmove.com',
      hours: '24/7',
      responseTime: 'Within 24 hours',
      icon: <Email />,
      color: 'info'
    },
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available in app',
      hours: 'Mon-Fri 8AM-8PM EST',
      responseTime: 'Instant',
      icon: <Chat />,
      color: 'success'
    }
  ]

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Market Street, Suite 100',
      phone: '+1 (555) 123-4567',
      email: 'sf@urbanmove.com',
      hours: 'Mon-Fri 9AM-6PM'
    },
    {
      city: 'New York',
      address: '456 Broadway, Suite 200',
      phone: '+1 (555) 987-6543',
      email: 'ny@urbanmove.com',
      hours: 'Mon-Fri 9AM-6PM'
    },
    {
      city: 'London',
      address: '789 Oxford Street, Suite 300',
      phone: '+44 20 1234 5678',
      email: 'london@urbanmove.com',
      hours: 'Mon-Fri 9AM-6PM GMT'
    }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setShowSuccessDialog(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      })
      setErrors({})
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | UrbanMove</title>
        <meta name="description" content="Get in touch with UrbanMove support team" />
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: '#000' }}>
        <Navbar />

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#a0a0a0',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              We're here to help! Get in touch with our support team for any questions, concerns, or feedback.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ color: '#00B4B4', mb: 4 }}>
                    Send us a Message
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00B4B4' },
                              '&.Mui-focused fieldset': { borderColor: '#00B4B4' },
                            },
                            '& .MuiInputLabel-root': { color: '#a0a0a0' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#00B4B4' },
                            '& .MuiInputBase-input': { color: '#fff' },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00B4B4' },
                              '&.Mui-focused fieldset': { borderColor: '#00B4B4' },
                            },
                            '& .MuiInputLabel-root': { color: '#a0a0a0' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#00B4B4' },
                            '& .MuiInputBase-input': { color: '#fff' },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00B4B4' },
                              '&.Mui-focused fieldset': { borderColor: '#00B4B4' },
                            },
                            '& .MuiInputLabel-root': { color: '#a0a0a0' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#00B4B4' },
                            '& .MuiInputBase-input': { color: '#fff' },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel sx={{ color: '#a0a0a0', '&.Mui-focused': { color: '#00B4B4' } }}>
                            Category
                          </InputLabel>
                          <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#00B4B4'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#00B4B4'
                              },
                              '& .MuiSvgIcon-root': { color: '#00B4B4' },
                              color: '#fff'
                            }}
                          >
                            {contactCategories.map(cat => (
                              <MenuItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00B4B4' },
                              '&.Mui-focused fieldset': { borderColor: '#00B4B4' },
                            },
                            '& .MuiInputLabel-root': { color: '#a0a0a0' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#00B4B4' },
                            '& .MuiInputBase-input': { color: '#fff' },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          multiline
                          rows={4}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                              '&:hover fieldset': { borderColor: '#00B4B4' },
                              '&.Mui-focused fieldset': { borderColor: '#00B4B4' },
                            },
                            '& .MuiInputLabel-root': { color: '#a0a0a0' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#00B4B4' },
                            '& .MuiInputBase-input': { color: '#fff' },
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          fullWidth
                          sx={{
                            background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)'
                            }
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            {/* Support Channels */}
            <Grid item xs={12} md={4}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)', mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ color: '#00B4B4', mb: 3 }}>
                    Support Channels
                  </Typography>
                  
                  {supportChannels.map((channel, index) => (
                    <Card
                      key={index}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        mb: 2,
                        '&:hover': {
                          background: 'rgba(0, 180, 180, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar sx={{ bgcolor: '#00B4B4', mr: 2 }}>
                            {channel.icon}
                          </Avatar>
                          <Typography variant="h6" sx={{ color: '#fff' }}>
                            {channel.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                          {channel.description}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#00B4B4', mb: 1 }}>
                          {channel.contact}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime sx={{ fontSize: 16, color: '#FFB6C1' }} />
                          <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                            {channel.hours}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Office Locations */}
              <Card sx={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ color: '#00B4B4', mb: 3 }}>
                    Office Locations
                  </Typography>
                  
                  {officeLocations.map((office, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                        {office.city}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                        {office.address}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#00B4B4', mb: 1 }}>
                        {office.phone}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#00B4B4', mb: 1 }}>
                        {office.email}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ fontSize: 16, color: '#FFB6C1' }} />
                        <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                          {office.hours}
                        </Typography>
                      </Box>
                      {index < officeLocations.length - 1 && (
                        <Box sx={{ my: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }} />
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* FAQ Section */}
          <Card sx={{ mt: 6, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ color: '#00B4B4', mb: 4, textAlign: 'center' }}>
                Frequently Asked Questions
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                      How quickly will I get a response?
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                      We typically respond within 24 hours for email inquiries. Phone and chat support provide instant responses during business hours.
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                      What's the best way to contact you?
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                      For urgent issues, call our support line. For general inquiries, email works best. Business partnerships should use the partnership category in the contact form.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Message Sent!</DialogTitle>
          <DialogContent>
            <Box textAlign="center" py={2}>
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Thank you for contacting us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We've received your message and will get back to you soon. Our team typically responds within 24 hours.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSuccessDialog(false)} variant="outlined">
              Send Another Message
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="contained">
              Go to Homepage
            </Button>
          </DialogActions>
        </Dialog>

        <Footer />
      </Box>
    </>
  )
}

export default Contact
