import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme, selectTheme } from '../features/uiSlice'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        borderColor: theme === 'dark' ? '#00B4B4' : '#C2185B',
        background: theme === 'dark' ? '#000' : '#fff',
      }}
      whileHover={{ rotate: 180 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {theme === 'dark' ? (
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/>
              <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#fff"/>
            </svg>
          </motion.div>
        )}
      </div>
      
      {/* Animated ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: theme === 'dark' ? '#00B4B4' : '#C2185B',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  )
}

export default ThemeToggle
