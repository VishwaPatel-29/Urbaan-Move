import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Help as HelpIcon,
  SupportAgent,
  Phone,
  Email,
  Chat,
  ExpandMore,
  Lightbulb,
  Security,
  Payment,
  DirectionsCar,
  Person,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HelpPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showSupportDialog, setShowSupportDialog] = useState(false)

  const helpCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: <Lightbulb /> },
    { id: 'rides', name: 'Rides & Booking', icon: <DirectionsCar /> },
    { id: 'account', name: 'Account & Profile', icon: <Person /> },
    { id: 'payment', name: 'Payment & Billing', icon: <Payment /> },
    { id: 'safety', name: 'Safety & Security', icon: <Security /> }
  ]

  const popularTopics = [
    { 
      title: 'How to book your first ride', 
      category: 'getting-started',
      description: 'Learn the step-by-step process to book your first ride with UrbanMove'
    },
    { 
      title: 'Payment methods explained', 
      category: 'payment',
      description: 'Understand different payment options and how to manage your payment methods'
    },
    { 
      title: 'Canceling a ride', 
      category: 'rides',
      description: 'Find out when and how you can cancel rides and what fees may apply'
    },
    { 
      title: 'Account verification', 
      category: 'account',
      description: 'Complete your account verification to unlock all features'
    },
    { 
      title: 'Safety features', 
      category: 'safety',
      description: 'Explore our safety features and how to use them effectively'
    }
  ]

  const faqData = [
    {
      category: 'getting-started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Download the UrbanMove app, click "Sign Up", and follow the registration process. You\'ll need to provide your email, phone number, and create a password.'
        },
        {
          q: 'What information do I need to provide?',
          a: 'You\'ll need to provide your name, email address, phone number, and payment information. You may also need to verify your identity for security purposes.'
        },
        {
          q: 'How do I download the app?',
          a: 'You can download UrbanMove from the Apple App Store or Google Play Store. Search for "UrbanMove" and click download.'
        }
      ]
    },
    {
      category: 'rides',
      questions: [
        {
          q: 'How do I book a ride?',
          a: 'Enter your pickup and dropoff locations, select your ride type, confirm the fare, and tap "Book Ride". Your driver will be assigned and you can track their arrival.'
        },
        {
          q: 'Can I schedule rides in advance?',
          a: 'Yes! You can schedule rides up to 30 days in advance using the "Schedule Ride" feature in the app.'
        },
        {
          q: 'How do I cancel a ride?',
          a: 'You can cancel a ride from the "My Rides" section. Cancellation fees may apply depending on how close you are to the pickup time.'
        }
      ]
    },
    {
      category: 'payment',
      questions: [
        {
          q: 'What payment methods are accepted?',
          a: 'We accept credit/debit cards, digital wallets (Apple Pay, Google Pay), and cash in select cities.'
        },
        {
          q: 'How are fares calculated?',
          a: 'Fares are based on distance, time, demand, and ride type. You\'ll always see the estimated fare before booking.'
        },
        {
          q: 'Can I get a receipt?',
          a: 'Yes, receipts are automatically sent to your email after each ride. You can also view them in the app under "Payment History".'
        }
      ]
    },
    {
      category: 'safety',
      questions: [
        {
          q: 'How do I report an issue?',
          a: 'Use the in-app emergency button or contact support immediately. We have 24/7 support for safety concerns.'
        },
        {
          q: 'Are drivers background-checked?',
          a: 'Yes, all drivers undergo comprehensive background checks and vehicle inspections before joining UrbanMove.'
        },
        {
          q: 'Can I share my trip details?',
          a: 'Yes, you can share your live trip status with trusted contacts through the "Share Trip" feature.'
        }
      ]
    }
  ]

  const supportOptions = [
    {
      icon: <Phone />,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      contact: '+1 (555) 123-4567',
      hours: '24/7 Emergency, Mon-Fri 9AM-6PM General',
      color: '#00B4B4'
    },
    {
      icon: <Email />,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@urbanmove.com',
      hours: '24/7',
      color: '#FFB6C1'
    },
    {
      icon: <Chat />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available in app',
      hours: 'Mon-Fri 8AM-8PM EST',
      color: '#4CAF50'
    }
  ]

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const filteredTopics = popularTopics.filter(topic => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory
    return matchesCategory
  })

  return (
    <>
      <Helmet>
        <title>Help Center | UrbanMove</title>
        <meta name="description" content="Get help and support for UrbanMove services" />
      </Helmet>

      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
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
              Help Center
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
              Find answers to common questions and get support for your UrbanMove experience
            </Typography>
          </Box>

          
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ color: '#00B4B4', mb: 3, textAlign: 'center' }}>
              Browse by Category
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={2.4}>
                <Button
                  variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
                  onClick={() => handleCategorySelect('all')}
                  fullWidth
                  sx={{
                    borderColor: '#00B4B4',
                    color: selectedCategory === 'all' ? '#fff' : '#00B4B4',
                    background: selectedCategory === 'all' ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' : 'transparent',
                    '&:hover': {
                      borderColor: '#FFB6C1',
                      color: '#FFB6C1',
                      background: selectedCategory === 'all' ? 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' : 'transparent'
                    }
                  }}
                >
                  All Topics
                </Button>
              </Grid>
              {helpCategories.map((category) => (
                <Grid item xs={12} sm={6} md={2.4} key={category.id}>
                  <Button
                    variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                    onClick={() => handleCategorySelect(category.id)}
                    fullWidth
                    startIcon={category.icon}
                    sx={{
                      borderColor: '#00B4B4',
                      color: selectedCategory === category.id ? '#fff' : '#00B4B4',
                      background: selectedCategory === category.id ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' : 'transparent',
                      '&:hover': {
                        borderColor: '#FFB6C1',
                        color: '#FFB6C1',
                        background: selectedCategory === category.id ? 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' : 'transparent'
                      }
                    }}
                  >
                    {category.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ color: '#00B4B4', mb: 3, textAlign: 'center' }}>
              Popular Topics
            </Typography>
            <Grid container spacing={3}>
              {filteredTopics.map((topic, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        background: 'rgba(0, 180, 180, 0.1)',
                        transform: 'translateY(-4px)'
                      },
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                        {topic.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 2 }}>
                        {topic.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: '#00B4B4' }}>
                        <Typography variant="caption" sx={{ mr: 1 }}>
                          {helpCategories.find(cat => cat.id === topic.category)?.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ color: '#00B4B4', mb: 3, textAlign: 'center' }}>
              Frequently Asked Questions
            </Typography>
            {faqData.map((category, categoryIndex) => (
              <Box key={categoryIndex} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#FFB6C1', mb: 2 }}>
                  {helpCategories.find(cat => cat.id === category.category)?.name}
                </Typography>
                {category.questions.map((faq, faqIndex) => (
                  <Accordion
                    key={faqIndex}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      mb: 1,
                      '&:before': { display: 'none' }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: '#00B4B4' }} />}
                      sx={{ '& .MuiAccordionSummary-content': { color: '#fff' } }}
                    >
                      <Typography variant="h6">
                        {faq.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ color: '#a0a0a0' }}>
                        {faq.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            ))}
          </Box>

          <Card sx={{ background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.1) 100%)', border: '1px solid rgba(0, 180, 180, 0.3)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ color: '#00B4B4', mb: 4, textAlign: 'center' }}>
                Still Need Help?
              </Typography>
              <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4, textAlign: 'center' }}>
                Our support team is here to help you 24/7. Reach out to us through any of the following channels.
              </Typography>
              <Grid container spacing={3}>
                {supportOptions.map((option, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center',
                        '&:hover': {
                          background: 'rgba(0, 180, 180, 0.1)',
                          transform: 'translateY(-4px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ color: option.color, mb: 2, fontSize: '3rem' }}>
                          {option.icon}
                        </Box>
                        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                          {option.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 2 }}>
                          {option.description}
                        </Typography>
                        <Typography variant="body2" sx={{ color: option.color, mb: 1 }}>
                          {option.contact}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#FFB6C1' }}>
                          {option.hours}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setShowSupportDialog(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)'
                    }
                  }}
                >
                  Contact Support Team
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>

        <Dialog open={showSupportDialog} onClose={() => setShowSupportDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              Our support team is available 24/7 to help you with any issues or questions.
            </Alert>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Phone:</strong> +1 (555) 123-4567
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Email:</strong> support@urbanmove.com
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Live Chat:</strong> Available in the UrbanMove app
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              For emergency situations, please use the emergency button in the app or call our emergency hotline.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSupportDialog(false)} variant="outlined">
              Close
            </Button>
            <Button onClick={() => window.location.href = '/contact'} variant="contained">
              Contact Form
            </Button>
          </DialogActions>
        </Dialog>

        <Footer />
      </Box>
    </>
  )
}

export default HelpPage
