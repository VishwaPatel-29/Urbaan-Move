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
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Button,
} from '@mui/material'
import {
  ExpandMore,
  Security,
  Person,
  LocationOn,
  Info,
  CheckCircle,
  Settings,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Privacy = () => {
  const privacySections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Person />,
      content: [
        'Personal Information: Name, email, phone number, and payment information.',
        'Location Data: GPS coordinates and location history for ride matching.',
        'Device Information: Device type, operating system, and unique device identifiers.',
        'Usage Data: How you interact with our app and services.',
        'Communication Data: Messages, support requests, and feedback.',
        'Payment Information: Payment method details and transaction history.'
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      icon: <Settings />,
      content: [
        'Service Provision: To provide ride-sharing services and match riders with drivers.',
        'Safety and Security: To ensure safe rides and prevent fraudulent activities.',
        'Communication: To send important service updates and safety notifications.',
        'Customer Support: To respond to your inquiries and provide assistance.',
        'Improvement: To analyze usage patterns and improve our services.',
        'Legal Compliance: To comply with applicable laws and regulations.'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing',
      icon: <LocationOn />,
      content: [
        'Driver Partners: Share necessary information with drivers for ride completion.',
        'Payment Processors: Share payment information with secure payment processing services.',
        'Service Providers: Share data with third-party service providers for operational purposes.',
        'Legal Requirements: Share information when required by law or legal process.',
        'Business Transfers: Share information in case of merger, acquisition, or sale.',
        'Safety Purposes: Share information with emergency services when necessary.'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Privacy Rights',
      icon: <CheckCircle />,
      content: [
        'Access: Request access to your personal information we hold.',
        'Correction: Request correction of inaccurate personal information.',
        'Deletion: Request deletion of your personal information.',
        'Portability: Request transfer of your personal information.',
        'Opt-out: Opt-out of marketing communications and data collection.',
        'Restriction: Request restriction of processing of your personal information.'
      ]
    },
    {
      id: 'security-measures',
      title: 'Data Security',
      icon: <Security />,
      content: [
        'Encryption: All data is encrypted in transit and at rest.',
        'Access Controls: Strict access controls to personal information.',
        'Regular Audits: Regular security audits and vulnerability assessments.',
        'Employee Training: All employees receive privacy and security training.',
        'Data Minimization: We collect only necessary information.',
        'Incident Response: Procedures for responding to security incidents.'
      ]
    },
    {
      id: 'policy-updates',
      title: 'Policy Updates',
      icon: <Info />,
      content: [
        'Regular Updates: This privacy policy may be updated periodically.',
        'Notification: Users will be notified of significant changes.',
        'Effective Date: Updated policies will indicate the effective date.',
        'Review Period: Users will have reasonable time to review changes.',
        'Continued Use: Continued use constitutes acceptance of updated policies.',
        'Archive: Previous versions will be archived for reference.'
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Privacy Policy | UrbanMove</title>
        <meta name="description" content="UrbanMove Privacy Policy" />
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
              Privacy Policy
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
              Last updated: January 15, 2024
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 6, background: 'rgba(0, 180, 180, 0.1)', border: '1px solid rgba(0, 180, 180, 0.3)', '& .MuiAlert-message': { color: '#fff' } }}>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              At UrbanMove, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
            </Typography>
          </Alert>

          {privacySections.map((section) => (
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
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ color: '#00B4B4' }}>
                      {section.icon}
                    </Box>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      {section.title}
                    </Typography>
                  </Box>
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
                Questions About Your Privacy?
              </Typography>
              <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4, textAlign: 'center' }}>
                If you have any questions about our privacy practices or want to exercise your privacy rights, please contact us.
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
                  href="/terms"
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
                  Terms of Service
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

export default Privacy
