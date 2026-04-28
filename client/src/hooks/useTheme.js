import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { selectTheme, toggleTheme, setTheme } from '../features/uiSlice'

export const useTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  const handleSetTheme = (newTheme) => {
    dispatch(setTheme(newTheme))
  }

  const isDark = theme === 'dark'
  const isLight = theme === 'light'

  const colors = useMemo(() => {
    if (isDark) {
      return {
        background: '#000000',
        surface: '#1a1a1a',
        text: '#ffffff',
        textSecondary: '#a0a0a0',
        border: '#333333',
        primary: '#00B4B4',
        secondary: '#FFB6C1',
        accent: '#C2185B',
      }
    }
    return {
      background: '#f5f5f5',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      border: '#e0e0e0',
      primary: '#008080',
      secondary: '#C2185B',
      accent: '#FFB6C1',
    }
  }, [theme])

  return {
    theme,
    isDark,
    isLight,
    toggleTheme: handleToggleTheme,
    setTheme: handleSetTheme,
    colors,
  }
}

export default useTheme