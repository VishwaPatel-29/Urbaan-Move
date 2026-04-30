import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Badge,
  Chip,
  Divider,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  InputAdornment
} from '@mui/material'
import {
  Send,
  Search,
  MoreVert,
  Phone,
  VideoCall,
  AttachFile,
  EmojiEmotions,
  DirectionsCar,
  Person,
  SupportAgent,
  Info,
  CheckCircle,
  AccessTime,
  Circle
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Messages = () => {
  const [conversations, setConversations] = useState([
    {
      id: 'CONV001',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'driver',
      lastMessage: 'I\'m 5 minutes away from your location',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      rideId: 'RIDE001',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 'CONV002',
      name: 'Customer Support',
      avatar: 'CS',
      role: 'support',
      lastMessage: 'Your refund has been processed successfully',
      timestamp: '1 hour ago',
      unread: 0,
      online: true,
      rideId: null,
      phone: '+1 (555) 987-6543'
    },
    {
      id: 'CONV003',
      name: 'Mike Wilson',
      avatar: 'MW',
      role: 'user',
      lastMessage: 'Thanks for the great ride!',
      timestamp: '2 days ago',
      unread: 0,
      online: false,
      rideId: 'RIDE002',
      phone: '+1 (555) 456-7890'
    },
    {
      id: 'CONV004',
      name: 'Emma Davis',
      avatar: 'ED',
      role: 'driver',
      lastMessage: 'See you next time!',
      timestamp: '3 days ago',
      unread: 0,
      online: false,
      rideId: 'RIDE003',
      phone: '+1 (555) 234-5678'
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedConvId, setSelectedConvId] = useState(null)

  const messages = {
    'CONV001': [
      {
        id: 'MSG001',
        sender: 'other',
        text: 'Hi! I\'m your driver for today\'s ride',
        timestamp: '09:25 AM',
        read: true
      },
      {
        id: 'MSG002',
        sender: 'me',
        text: 'Great! I\'m waiting at the pickup location',
        timestamp: '09:26 AM',
        read: true
      },
      {
        id: 'MSG003',
        sender: 'other',
        text: 'I can see you. I\'m the silver Toyota Camry',
        timestamp: '09:28 AM',
        read: true
      },
      {
        id: 'MSG004',
        sender: 'other',
        text: 'I\'m 5 minutes away from your location',
        timestamp: '09:30 AM',
        read: false
      }
    ],
    'CONV002': [
      {
        id: 'MSG005',
        sender: 'me',
        text: 'I need help with a refund for my cancelled ride',
        timestamp: 'Yesterday',
        read: true
      },
      {
        id: 'MSG006',
        sender: 'other',
        text: 'I can help you with that. What was your ride ID?',
        timestamp: 'Yesterday',
        read: true
      },
      {
        id: 'MSG007',
        sender: 'me',
        text: 'RIDE003 from January 13th',
        timestamp: 'Yesterday',
        read: true
      },
      {
        id: 'MSG008',
        sender: 'other',
        text: 'Your refund has been processed successfully',
        timestamp: '1 hour ago',
        read: true
      }
    ]
  }

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation)
    // Mark as read
    setConversations(prev => prev.map(conv => 
      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
    ))
  }

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return

    const newMessage = {
      id: `MSG${Date.now()}`,
      sender: 'me',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    }

    // Add message to conversation
    if (!messages[selectedConversation.id]) {
      messages[selectedConversation.id] = []
    }
    messages[selectedConversation.id].push(newMessage)

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: message, timestamp: 'Just now' }
        : conv
    ))

    setMessage('')
  }

  const handleMenuClick = (event, convId) => {
    setAnchorEl(event.currentTarget)
    setSelectedConvId(convId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedConvId(null)
  }

  const handleDeleteConversation = () => {
    setConversations(prev => prev.filter(conv => conv.id !== selectedConvId))
    if (selectedConversation?.id === selectedConvId) {
      setSelectedConversation(null)
    }
    handleMenuClose()
  }

  const handleCall = () => {
    if (selectedConversation?.phone) {
      window.location.href = `tel:${selectedConversation.phone}`
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'driver': return <DirectionsCar />
      case 'support': return <SupportAgent />
      case 'user': return <Person />
      default: return <Person />
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'driver': return 'success'
      case 'support': return 'primary'
      case 'user': return 'info'
      default: return 'default'
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Messages
          </Typography>

          <Grid container spacing={3} sx={{ height: '80vh' }}>
            {/* Conversations List */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 0, pb: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                    }}
                    size="small"
                  />
                </CardContent>
                
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <List sx={{ p: 0 }}>
                    {filteredConversations.map((conversation) => (
                      <ListItem
                        key={conversation.id}
                        button
                        selected={selectedConversation?.id === conversation.id}
                        onClick={() => handleSelectConversation(conversation)}
                        sx={{
                          '&:hover': { bgcolor: 'action.hover' },
                          '&.Mui-selected': { bgcolor: 'action.selected' }
                        }}
                      >
                        <ListItemAvatar>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color={conversation.online ? 'success' : 'default'}
                          >
                            <Avatar sx={{ bgcolor: `${getRoleColor(conversation.role)}.main` }}>
                              {conversation.avatar}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Typography variant="subtitle2" noWrap>
                                {conversation.name}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMenuClick(e, conversation.id)
                                }}
                              >
                                <MoreVert fontSize="small" />
                              </IconButton>
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {conversation.lastMessage}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                <Chip
                                  icon={getRoleIcon(conversation.role)}
                                  label={conversation.role}
                                  size="small"
                                  variant="outlined"
                                  sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {conversation.timestamp}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                        {conversation.unread > 0 && (
                          <Badge badgeContent={conversation.unread} color="primary" />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Card>
            </Grid>

            {/* Chat Area */}
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <CardContent sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color={selectedConversation.online ? 'success' : 'default'}
                          >
                            <Avatar sx={{ mr: 2, bgcolor: `${getRoleColor(selectedConversation.role)}.main` }}>
                              {selectedConversation.avatar}
                            </Avatar>
                          </Badge>
                          <Box>
                            <Typography variant="h6">
                              {selectedConversation.name}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Chip
                                icon={getRoleIcon(selectedConversation.role)}
                                label={selectedConversation.role}
                                size="small"
                                variant="outlined"
                              />
                              <Typography variant="body2" color="text.secondary">
                                {selectedConversation.online ? 'Online' : 'Offline'}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box display="flex" gap={1}>
                          <IconButton onClick={handleCall} disabled={!selectedConversation.phone}>
                            <Phone />
                          </IconButton>
                          <IconButton>
                            <VideoCall />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>

                    {/* Messages */}
                    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                      {messages[selectedConversation.id]?.map((msg) => (
                        <Box
                          key={msg.id}
                          sx={{
                            display: 'flex',
                            justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                            mb: 2
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: '70%',
                              bgcolor: msg.sender === 'me' ? 'primary.main' : 'grey.200',
                              color: msg.sender === 'me' ? 'white' : 'text.primary',
                              borderRadius: 2,
                              px: 2,
                              py: 1
                            }}
                          >
                            <Typography variant="body2">
                              {msg.text}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                {msg.timestamp}
                              </Typography>
                              {msg.sender === 'me' && (
                                msg.read ? <CheckCircle sx={{ fontSize: 12 }} /> : <Circle sx={{ fontSize: 12 }} />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    {/* Message Input */}
                    <CardContent sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
                      <Box display="flex" gap={1}>
                        <IconButton>
                          <AttachFile />
                        </IconButton>
                        <IconButton>
                          <EmojiEmotions />
                        </IconButton>
                        <TextField
                          fullWidth
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          variant="outlined"
                          size="small"
                        />
                        <IconButton
                          color="primary"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                        >
                          <Send />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </>
                ) : (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      color: 'text.secondary'
                    }}
                  >
                    <Info sx={{ fontSize: 64, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Select a conversation
                    </Typography>
                    <Typography variant="body2">
                      Choose a conversation from the list to start messaging
                    </Typography>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Context Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Mute Notifications</MenuItem>
            <MenuItem onClick={handleDeleteConversation} sx={{ color: 'error.main' }}>
              Delete Conversation
            </MenuItem>
          </Menu>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Messages
