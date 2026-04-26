import axios from 'axios'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'kbd-havya'

const cloudinaryApi = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`,
})

export const uploadToCloudinary = async (file, folder = 'kbd-havya') => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', folder)

  try {
    const response = await cloudinaryApi.post('/auto/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return {
      success: true,
      url: response.data.secure_url,
      publicId: response.data.public_id,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export const deleteFromCloudinary = async (publicId) => {
  try {
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET
    
    await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
      public_id: publicId,
      api_key: apiKey,
      api_secret: apiSecret,
    })
    
    return { success: true }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return { success: false, error: error.message }
  }
}

export const getOptimizedUrl = (url, options = {}) => {
  if (!url) return ''
  
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options

  const transformations = []
  
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)
  if (crop) transformations.push(`c_${crop}`)
  
  if (transformations.length === 0) return url
  
  const transformString = transformations.join(',')
  
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/${transformString}/`)
  }
  
  return url
}

export const generateAvatarUrl = (publicId, size = 200) => {
  if (!publicId) return ''
  return getOptimizedUrl(
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`,
    { width: size, height: size, crop: 'thumb' }
  )
}

export const generateDocumentUrl = (publicId) => {
  if (!publicId) return ''
  return getOptimizedUrl(
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`,
    { quality: 'auto', format: 'pdf' }
  )
}

export default {
  uploadToCloudinary,
  deleteFromCloudinary,
  getOptimizedUrl,
  generateAvatarUrl,
  generateDocumentUrl,
}