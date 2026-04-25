import React, { useState } from 'react'
import { Box, Fab, Zoom, Typography, Paper, IconButton } from '@mui/material'
import { SmartToy, Close, Send, QuestionAnswer } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const HelixAIButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm Helix AI, your KBD-Havya assistant. How can I help you today?", 
      isAI: true 
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = { text: inputMessage, isAI: false }
      setMessages([...messages, userMessage])
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { 
          text: "I'm here to help you with KBD-Havya! I can tell you about our smart commuting platform, real-time routing, corporate shuttles, and much more. What would you like to know?", 
          isAI: true 
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
      
      setInputMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      toast.success('Helix AI is ready to help!')
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              sx={{
                position: 'fixed',
                bottom: 90,
                right: 24,
                width: 350,
                height: 450,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                zIndex: 999,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                border: '1px solid rgba(0, 180, 180, 0.3)',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: 2,
                  background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                  borderRadius: '12px 12px 0 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SmartToy sx={{ color: '#fff', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem' }}>
                    KBD-Havya's Helix AI
                  </Typography>
                </Box>
                <IconButton size="small" onClick={toggleChat}>
                  <Close sx={{ color: '#fff', fontSize: 20 }} />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      maxWidth: '80%',
                      p: 1.5,
                      borderRadius: 2,
                      background: message.isAI
                        ? 'linear-gradient(135deg, rgba(0, 180, 180, 0.2) 0%, rgba(255, 182, 193, 0.1) 100%)'
                        : 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                      color: message.isAI ? '#fff' : '#fff',
                      alignSelf: message.isAI ? 'flex-start' : 'flex-end',
                      border: message.isAI ? '1px solid rgba(0, 180, 180, 0.3)' : 'none',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                      {message.text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Input */}
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  gap: 1,
                  borderTop: '1px solid rgba(0, 180, 180, 0.3)',
                }}
              >
                <Box
                  component="input"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about KBD-Havya..."
                  sx={{
                    flex: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    border: '1px solid rgba(0, 180, 180, 0.5)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    outline: 'none',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.6)',
                    },
                  }}
                />
                <IconButton
                  onClick={handleSendMessage}
                  sx={{
                    background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)',
                    },
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <Zoom in key="helix-ai-button">
          <Fab
            component={motion.button}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
              color: '#fff',
              zIndex: 1000,
              boxShadow: '0 4px 20px rgba(0, 180, 180, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)',
                boxShadow: '0 6px 25px rgba(255, 182, 193, 0.5)',
              },
            }}
            aria-label="Chat with Helix AI"
          >
            <SmartToy sx={{ fontSize: 28 }} />
          </Fab>
        </Zoom>
      </AnimatePresence>
    </>
  )
}

export default HelixAIButton
