const User = require('../models/User')

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get profile',
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { name, phone, company } = req.body
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, company },
      { new: true, runValidators: true }
    )
    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update profile',
    })
  }
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.userId).select('+password')
    
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password is incorrect',
      })
    }
    
    user.password = newPassword
    await user.save()
    
    res.json({
      status: 'success',
      message: 'Password changed successfully',
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to change password',
    })
  }
}

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded',
      })
    }
    
    const avatarUrl = req.file.path
    const user = await User.findByIdAndUpdate(
      req.userId,
      { avatar: avatarUrl },
      { new: true }
    )
    
    res.json({
      status: 'success',
      data: { avatar: avatarUrl },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload avatar',
    })
  }
}

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
}