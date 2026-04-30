import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  Button,
  Grid,
  Divider,
} from '@mui/material'
import {
  ExpandMore,
  Help,
  DirectionsCar,
  Person,
  Payment,
  Security,
  SupportAgent,
  Star,
  CheckCircle,
  Warning,
  Lightbulb,
  Phone,
  Email,
  Chat,
  TrendingUp,
  AccessTime,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqCategories = [
    { id: 'general', name: 'General', icon: <Help />, color: '#00B4B4' },
    { id: 'rides', name: 'Rides', icon: <DirectionsCar />, color: '#4CAF50' },
    { id: 'account', name: 'Account', icon: <Person />, color: '#FFB6C1' },
    { id: 'payment', name: 'Payment', icon: <Payment />, color: '#FF9800' },
    { id: 'safety', name: 'Safety', icon: <Security />, color: '#F44336' }
  ]

  const faqData = [
    {
      category: 'general',
      questions: [
        {
          q: 'What is UrbanMove?',
          a: 'UrbanMove is a ride-sharing platform that connects passengers with drivers for convenient, affordable, and safe transportation. Our platform offers various ride types, real-time tracking, and multiple payment options.'
        },
        {
          q: 'Where is UrbanMove available?',
          a: 'UrbanMove is currently available in major cities across the United States, Canada, and select international locations. Check our app to see if we operate in your area.'
        },
        {
          q: 'How is UrbanMove different from other ride-sharing apps?',
          a: 'UrbanMove offers competitive pricing, advanced safety features, flexible ride options, and exceptional customer support. Our app includes features like real-time driver tracking, multiple payment methods, and 24/7 customer support.'
        },
        {
          q: 'What are the service hours?',
          a: 'UrbanMove operates 24/7 in most cities. However, availability may vary based on driver availability and local regulations.'
        }
      ]
    },
    {
      category: 'rides',
      questions: [
        {
          q: 'How do I book a ride?',
          a: 'To book a ride: 1) Open the app and enter your pickup location, 2) Enter your destination, 3) Select your preferred ride type, 4) Confirm the estimated fare, 5) Tap "Book Ride" to request a driver.'
        },
        {
          q: 'Can I schedule rides in advance?',
          a: 'Yes! You can schedule rides up to 30 days in advance using our "Schedule Ride" feature. This is perfect for airport trips, business meetings, or important appointments.'
        },
        {
          q: 'How do I cancel a ride?',
          a: 'You can cancel a ride from the "My Rides" section before the driver arrives. Cancellation fees may apply if you cancel after the driver has accepted your request or is already on the way.'
        },
        {
          q: 'What ride types are available?',
          a: 'UrbanMove offers Standard, Comfort, Premium, XL, and Accessibility rides. Each type has different vehicle sizes, comfort levels, and pricing to suit your needs.'
        }
      ]
    },
    {
      category: 'account',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Download the UrbanMove app, click "Sign Up", and follow the registration process. You\'ll need to provide your email, phone number, and create a password. Email verification may be required.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Tap "Forgot Password" on the login screen, enter your email address, and follow the instructions sent to your email. You\'ll receive a link to create a new password.'
        },
        {
          q: 'Can I change my phone number?',
          a: 'Yes, you can update your phone number in the "Account Settings" section. You\'ll need to verify the new number for security purposes.'
        },
        {
          q: 'How do I delete my account?',
          a: 'You can request account deletion from "Account Settings" or contact our support team. Please note that this action is permanent and cannot be undone.'
        }
      ]
    },
    {
      category: 'payment',
      questions: [
        {
          q: 'What payment methods are accepted?',
          a: 'We accept credit/debit cards (Visa, Mastercard, American Express), digital wallets (Apple Pay, Google Pay), PayPal, and cash in select cities. All payment methods are securely processed.'
        },
        {
          q: 'How are fares calculated?',
          a: 'Fares are calculated based on base fare, distance traveled, time spent in traffic, demand (surge pricing during peak hours), and selected ride type. You\'ll always see the estimated fare before booking.'
        },
        {
          q: 'Can I get a receipt?',
          a: 'Yes, receipts are automatically sent to your email after each ride. You can also view and download receipts from the "Payment History" section in the app.'
        },
        {
          q: 'What is the cancellation policy?',
          a: 'Free cancellation is available within 2 minutes of booking. After that, cancellation fees may apply depending on how close you are to the pickup time and the driver\'s location.'
        }
      ]
    },
    {
      category: 'safety',
      questions: [
        {
          q: 'How do I report an issue during a ride?',
          a: 'Use the in-app emergency button or call our 24/7 safety hotline. You can also report issues after the ride through the "Help" section. We take all safety concerns seriously.'
        },
        {
          q: 'Are drivers background-checked?',
          a: 'Yes, all drivers undergo comprehensive background checks, including criminal history, driving records, and vehicle inspections. They must also complete safety training.'
        },
        {
          q: 'Can I share my trip details?',
          a: 'Yes, use the "Share Trip" feature to send your live location and trip details to trusted contacts. They can track your ride in real-time for added safety.'
        },
        {
          q: 'What safety features are available?',
          a: 'UrbanMove offers 24/7 support, emergency button, trip sharing, driver verification, in-app emergency contacts, and real-time GPS tracking for maximum safety.'
        }
      ]
    }
  ]

  const filteredFAQs = faqData.filter(section => 
    selectedCategory === 'all' || section.category === selectedCategory
  )

  const totalQuestions = faqData.reduce((acc, section) => acc + section.questions.length, 0)

  return (
    <>
      <Helmet>
        <title>FAQ | UrbanMove</title>
        <meta name="description" content="Frequently asked questions about UrbanMove services" />
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
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#a0a0a0',
                mb: 4,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Find answers to common questions about UrbanMove services, booking, payments, and safety
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mb: 6 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#00B4B4', fontWeight: 700 }}>
                  {totalQuestions}+
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  Questions Answered
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#FFB6C1', fontWeight: 700 }}>
                  98%
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  Satisfaction Rate
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                  24/7
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  Support Available
                </Typography>
              </Box>
            </Box>
          </Box>

          <Card sx={{ mb: 6, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Chip
                  label="All Categories"
                  onClick={() => setSelectedCategory('all')}
                  variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                  sx={{
                    background: selectedCategory === 'all' 
                      ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' 
                      : 'transparent',
                    color: selectedCategory === 'all' ? '#fff' : '#00B4B4',
                    borderColor: '#00B4B4',
                    borderWidth: '2px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                    '&:hover': {
                      background: selectedCategory === 'all' 
                        ? 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' 
                        : 'rgba(0, 180, 180, 0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 180, 180, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                />
                {faqCategories.map((category) => (
                  <Chip
                    key={category.id}
                    icon={category.icon}
                    label={category.name}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                    sx={{
                      background: selectedCategory === category.id 
                        ? 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' 
                        : 'transparent',
                      color: selectedCategory === category.id ? '#fff' : category.color,
                      borderColor: category.color,
                      borderWidth: '2px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      '&:hover': {
                        background: selectedCategory === category.id 
                          ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' 
                          : 'rgba(255, 182, 193, 0.1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(255, 182, 193, 0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              {filteredFAQs.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Help sx={{ fontSize: 64, color: '#a0a0a0', mb: 3 }} />
                  <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                    No questions found
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4 }}>
                    Try browsing different categories
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedCategory('all')}
                    sx={{
                      borderColor: '#00B4B4',
                      color: '#00B4B4',
                      '&:hover': {
                        borderColor: '#FFB6C1',
                        color: '#FFB6C1',
                        background: 'rgba(255, 182, 193, 0.1)'
                      }
                    }}
                  >
                    Show All Categories
                  </Button>
                </Box>
              ) : (
                <Box>
                  {filteredFAQs.map((section, sectionIndex) => (
                    <Box key={section.category} sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h4" sx={{ color: '#fff' }}>
                          {faqCategories.find(c => c.id === section.category)?.name}
                        </Typography>
                        <Chip
                          label={`${section.questions.length} questions`}
                          size="small"
                          sx={{
                            ml: 2,
                            background: 'rgba(0, 180, 180, 0.2)',
                            color: '#00B4B4',
                            border: '1px solid rgba(0, 180, 180, 0.3)'
                          }}
                        />
                      </Box>
                      
                      {section.questions.map((faq, faqIndex) => (
                        <Accordion
                          key={faqIndex}
                          sx={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            mb: 2,
                            '&:before': { display: 'none' },
                            '&.Mui-expanded': {
                              background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.1) 100%)',
                              border: '1px solid rgba(0, 180, 180, 0.3)',
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMore 
                                sx={{ 
                                  color: '#00B4B4',
                                  fontSize: 28,
                                  '&.Mui-expanded': {
                                    transform: 'rotate(180deg)',
                                    color: '#FFB6C1'
                                  }
                                }} 
                              />
                            }
                            sx={{ 
                              '& .MuiAccordionSummary-content': { 
                                color: '#fff',
                                fontSize: '1.1rem',
                                fontWeight: 500
                              }
                            }}
                          >
                            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                              {faq.q}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: '#a0a0a0',
                                lineHeight: 1.7,
                                fontSize: '1rem'
                              }}
                            >
                              {faq.a}
                            </Typography>
                            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  startIcon={<CheckCircle />}
                                  sx={{
                                    borderColor: '#4CAF50',
                                    color: '#4CAF50',
                                    fontSize: '0.8rem',
                                    '&:hover': {
                                      background: 'rgba(76, 175, 80, 0.1)',
                                      borderColor: '#4CAF50'
                                    }
                                  }}
                                >
                                  Helpful
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  startIcon={<Warning />}
                                  sx={{
                                    borderColor: '#FF9800',
                                    color: '#FF9800',
                                    fontSize: '0.8rem',
                                    '&:hover': {
                                      background: 'rgba(255, 152, 0, 0.1)',
                                      borderColor: '#FF9800'
                                    }
                                  }}
                                >
                                  Not Helpful
                                </Button>
                              </Box>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                      {sectionIndex < filteredFAQs.length - 1 && (
                        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          <Card sx={{ 
            mt: 6, 
            background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.1) 100%)',
            border: '1px solid rgba(0, 180, 180, 0.3)',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #00B4B4 0%, #FFB6C1 50%, #4CAF50 100%)'
            }} />
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <SupportAgent sx={{ fontSize: 48, color: '#00B4B4', mb: 2 }} />
                <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                  Still Need Help?
                </Typography>
                <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4 }}>
                  Can't find what you're looking for? Our support team is here to help you 24/7
                </Typography>
              </Box>
              
              <Alert 
                severity="info" 
                sx={{ 
                  mb: 4, 
                  background: 'rgba(0, 180, 180, 0.1)',
                  border: '1px solid rgba(0, 180, 180, 0.3)',
                  '& .MuiAlert-message': { color: '#fff' }
                }}
              >
                Our average response time is under 2 minutes for live chat and under 1 hour for email support.
              </Alert>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    startIcon={<Chat />}
                    fullWidth
                    size="large"
                    sx={{
                      background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                      py: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0, 180, 180, 0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Live Chat
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    startIcon={<Email />}
                    fullWidth
                    size="large"
                    sx={{
                      borderColor: '#FFB6C1',
                      color: '#FFB6C1',
                      py: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: '#00B4B4',
                        color: '#00B4B4',
                        background: 'rgba(0, 180, 180, 0.1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(255, 182, 193, 0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Email Support
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    startIcon={<Phone />}
                    fullWidth
                    size="large"
                    sx={{
                      borderColor: '#4CAF50',
                      color: '#4CAF50',
                      py: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: '#FF9800',
                        color: '#FF9800',
                        background: 'rgba(255, 152, 0, 0.1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Call Support
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>

        <Footer />
      </Box>
    </>
  )
}

export default FAQ
