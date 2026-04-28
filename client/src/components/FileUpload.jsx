import React, { useState, useCallback } from 'react'
import { Box, Typography, IconButton, Button, LinearProgress } from '@mui/material'
import { CloudUpload, Delete, Image as ImageIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'

const FileUpload = ({
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 1,
  onFilesChange,
  preview = true,
  disabled = false,
}) => {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const validateFile = (file) => {
    if (!accept.includes('*') && !file.type.match(accept.replace('*', '.*'))) {
      throw new Error(`File type ${file.type} is not allowed`)
    }
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`)
    }
    return true
  }

  const handleFiles = useCallback((newFiles) => {
    const validFiles = []
    const errors = []

    Array.from(newFiles).forEach(file => {
      try {
        validateFile(file)
        validFiles.push(file)
      } catch (error) {
        errors.push(error.message)
      }
    })

    if (errors.length > 0) {
      console.error('File validation errors:', errors)
    }

    const updatedFiles = [...files, ...validFiles].slice(0, maxFiles)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }, [files, maxFiles, accept, maxSize, onFilesChange])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (disabled) return
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      handleFiles(droppedFiles)
    }
  }, [disabled, handleFiles])

  const handleFileInput = (e) => {
    if (disabled) return
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles)
    }
  }

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const simulateUpload = () => {
    setUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${dragActive ? '#00B4B4' : '#333'}`,
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          background: dragActive ? 'rgba(0, 180, 180, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: disabled ? '#333' : '#00B4B4',
            background: disabled ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 180, 180, 0.02)',
          },
        }}
      >
        <input
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileInput}
          disabled={disabled}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CloudUpload sx={{ fontSize: 48, color: '#00B4B4', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            {dragActive ? 'Drop files here' : 'Drag & Drop files here'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
            or click to browse
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Max file size: {maxSize / 1024 / 1024}MB • Max files: {maxFiles}
          </Typography>
        </motion.div>
      </Box>

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#00B4B4', mb: 1 }}>
            Uploading... {uploadProgress}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #00B4B4, #008080)',
              },
            }}
          />
        </Box>
      )}

      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 2 }}>
            Selected Files ({files.length}/{maxFiles})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid #333',
                    borderRadius: 2,
                  }}
                >
                  {preview && file.type.startsWith('image/') ? (
                    <Box
                      component="img"
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        objectFit: 'cover',
                        mr: 2,
                      }}
                    />
                  ) : (
                    <ImageIcon sx={{ fontSize: 40, color: '#666', mr: 2 }} />
                  )}
                  
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#fff', fontWeight: 500, truncate: true }}
                    >
                      {file.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      {(file.size / 1024).toFixed(1)} KB
                    </Typography>
                  </Box>
                  
                  <IconButton
                    size="small"
                    onClick={() => removeFile(index)}
                    disabled={disabled}
                    sx={{ color: '#FF6B6B', '&:hover': { background: 'rgba(255, 107, 107, 0.1)' } }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </motion.div>
            ))}
          </Box>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={simulateUpload}
              disabled={uploading || disabled}
              sx={{
                background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
                },
              }}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setFiles([])
                onFilesChange?.([])
              }}
              disabled={uploading || disabled}
              sx={{ borderColor: '#666', color: '#666' }}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FileUpload
