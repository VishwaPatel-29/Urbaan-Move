import React from 'react'
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
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import {
  ExpandMore,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Terms = () => {
  const termsSections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using UrbanMove services, you agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, you may not access or use our services.',
        'These terms apply to all users of UrbanMove services.',
        'Please review these terms periodically for changes.'
      ]
    },
    {
      id: 'services',
      title: 'Services Description',
      content: [
        'UrbanMove provides a ride-sharing platform connecting passengers with independent driver partners.',
        'Our services include: Standard rides, Comfort rides, Premium rides, XL rides, and Accessibility rides.',
        'Services are provided on an "as is" and "as available" basis.',
        'Service availability may be limited by geographic location and driver availability.'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      content: [
        'Users must provide accurate, complete, and current information during registration.',
        'Users must be at least 18 years old to create an account and use our services.',
        'Users must comply with all applicable laws and regulations when using our services.',
        'Users must treat drivers and other users with respect and courtesy.',
        'Users are responsible for their personal belongings during rides.'
      ]
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      content: [
        'Users agree to pay all fees and charges incurred in connection with their use of UrbanMove services.',
        'Payment processing is handled through secure third-party payment processors.',
        'Fares are calculated based on distance, time, demand, and ride type.',
        'Users must provide valid payment information to use paid services.',
        'Refunds are subject to our refund policy and may take 5-7 business days to process.'
      ]
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      content: [
        'UrbanMove is committed to protecting user privacy and personal information.',
        'We collect personal information only as necessary to provide our services.',
        'User information is stored securely and used in accordance with our Privacy Policy.',
        'We do not sell or rent personal information to third parties.',
        'Users may request access to or deletion of their personal information at any time.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: [
        'All content, trademarks, service marks, logos, and other intellectual property are owned by UrbanMove.',
        'Users may not use our intellectual property without prior written consent.',
        'UrbanMove grants users a limited, non-exclusive, non-transferable license to use our services.',
        'Users retain ownership of content they submit to our services.',
        'By submitting content, users grant UrbanMove a worldwide license to use such content.'
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      content: [
        'Users may terminate their account at any time through the app settings.',
        'UrbanMove may suspend or terminate accounts for violations of these terms.',
        'Terminated users may not create new accounts without explicit permission.',
        'Upon termination, all rights and licenses granted to the user will cease.',
        'UrbanMove retains the right to remove user-generated content upon account termination.'
      ]
    },
    {
      id: 'disputes',
      title: 'Dispute Resolution',
      content: [
        'All disputes will be resolved through binding arbitration.',
        'Users waive their right to participate in class action lawsuits.',
        'Arbitration will be conducted in accordance with the rules of the American Arbitration Association.',
        'The prevailing party in any dispute may be entitled to reasonable attorney fees.',
        'These terms are governed by the laws of the state where UrbanMove is headquartered.',
        'Any legal action must be filed within one year of the dispute arising.'
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Terms of Service | UrbanMove</title>
        <meta name="description" content="UrbanMove Terms of Service" />
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
              Terms of Service
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
              Last updated: January 1, 2024
            </Typography>
          </Box>

          {termsSections.map((section) => (
            <Card key={section.id} sx={{ mb: 3, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Accordion sx={{
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.1) 100%)',
                  border: '1px solid rgba(0, 180, 180, 0.3)',
                },
                transition: 'all 0.3s ease'
              }}>
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
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {section.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                  <List sx={{ p: 0 }}>
                    {section.content.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemText
                          primary={item}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: '#a0a0a0',
                              fontSize: '1rem',
                              lineHeight: 1.6
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Card>
          ))}

          <Card sx={{ mt: 6, background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.1) 100%)', border: '1px solid rgba(0, 180, 180, 0.3)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ color: '#00B4B4', mb: 3, textAlign: 'center' }}>
                Questions About Our Terms?
              </Typography>
              <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4, textAlign: 'center' }}>
                If you have any questions about these Terms of Service, please contact our legal team.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  component="a"
                  href="/contact"
                  sx={{
                    background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)'
                    }
                  }}
                >
                  Contact Us
                </Button>
                <Button
                  variant="outlined"
                  component="a"
                  href="/privacy"
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
                  Privacy Policy
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>

        <Footer />
      </Box>
    </>
  )
}

export default Terms
