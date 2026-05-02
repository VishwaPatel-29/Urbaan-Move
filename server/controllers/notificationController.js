const Notification = require('../models/Notification')

const getNotifications = async (req, res) => {
  try {
    let notifications = await Notification.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(50)
    
    let unreadCount = await Notification.countDocuments({
      user: req.userId,
      read: false,
    })

    // Fallback dummy data
    if (notifications.length === 0) {
      notifications = [
        {
          _id: 'dummy-notif-1',
          title: 'Ride Confirmed',
          message: 'Your ride to Corporate Office A has been confirmed.',
          type: 'info',
          read: false,
          createdAt: new Date()
        },
        {
          _id: 'dummy-notif-2',
          title: 'Welcome to UrbanMove',
          message: 'Explore smart commutes with our corporate shuttle platform.',
          type: 'success',
          read: true,
          createdAt: new Date(Date.now() - 86400000)
        }
      ]
      unreadCount = 1
    }
    
    res.json({
      status: 'success',
      data: { notifications, unreadCount },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get notifications',
    })
  }
}

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { read: true, readAt: new Date() },
      { new: true }
    )
    
    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found',
      })
    }
    
    res.json({
      status: 'success',
      data: notification,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to mark notification as read',
    })
  }
}

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.userId, read: false },
      { read: true, readAt: new Date() }
    )
    
    res.json({
      status: 'success',
      message: 'All notifications marked as read',
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to mark all notifications as read',
    })
  }
}

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
}