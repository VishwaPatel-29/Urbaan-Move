// Responsive design utilities and breakpoints

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

export const useResponsiveValues = (theme) => {
  const isDark = theme?.palette?.mode === 'dark'
  
  return {
    // Colors based on theme
    colors: {
      background: isDark ? '#000000' : '#f8f9fa',
      surface: isDark ? '#1a1a1a' : '#ffffff',
      text: isDark ? '#ffffff' : '#1a1a1a',
      textSecondary: isDark ? '#a0a0a0' : '#666666',
      border: isDark ? '#333333' : '#e0e0e0',
      primary: isDark ? '#00B4B4' : '#008080',
      secondary: isDark ? '#FFB6C1' : '#C2185B',
      accent: isDark ? '#C2185B' : '#FFB6C1',
    },
    
    // Responsive spacing
    spacing: {
      xs: { p: 2, m: 1 },
      sm: { p: 3, m: 2 },
      md: { p: 4, m: 3 },
      lg: { p: 5, m: 4 },
      xl: { p: 6, m: 5 },
    },
    
    // Responsive typography
    typography: {
      h1: {
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem', xl: '4rem' },
        fontWeight: 900,
      },
      h2: {
        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.2rem', xl: '2.5rem' },
        fontWeight: 800,
      },
      h3: {
        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
        fontWeight: 700,
      },
      h4: {
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.5rem', xl: '1.6rem' },
        fontWeight: 600,
      },
      body1: {
        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem', xl: '1.3rem' },
      },
      body2: {
        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.2rem' },
      },
    },
    
    // Responsive containers
    container: {
      xs: { maxWidth: '100%', px: 2 },
      sm: { maxWidth: 540, px: 3 },
      md: { maxWidth: 720, px: 4 },
      lg: { maxWidth: 960, px: 5 },
      xl: { maxWidth: 1140, px: 6 },
    },
    
    // Responsive grid
    grid: {
      xs: { columns: 1, spacing: 2 },
      sm: { columns: 2, spacing: 3 },
      md: { columns: 3, spacing: 4 },
      lg: { columns: 4, spacing: 4 },
      xl: { columns: 4, spacing: 6 },
    },
  }
}

export const getResponsiveStyles = (theme) => {
  const { colors, spacing, typography } = useResponsiveValues(theme)
  
  return {
    // Common responsive styles
    pageContainer: {
      minHeight: '100vh',
      background: colors.background,
      color: colors.text,
      ...spacing.xs,
      transition: 'all 0.3s ease',
    },
    
    card: {
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 2,
      boxShadow: theme?.palette?.mode === 'dark' 
        ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
        : '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme?.palette?.mode === 'dark' 
          ? '0 8px 30px rgba(0, 0, 0, 0.7)' 
          : '0 8px 30px rgba(0, 0, 0, 0.15)',
      },
    },
    
    button: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      color: '#fff',
      border: 'none',
      borderRadius: 2,
      fontWeight: 600,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${colors.primary}40`,
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    },
    
    textField: {
      '& .MuiOutlinedInput-root': {
        background: theme?.palette?.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.02)' 
          : 'rgba(255, 255, 255, 0.8)',
        color: colors.text,
        '& fieldset': {
          borderColor: colors.border,
        },
        '&:hover fieldset': {
          borderColor: colors.primary,
        },
        '&.Mui-focused fieldset': {
          borderColor: colors.primary,
        },
      },
      '& .MuiInputLabel-root': {
        color: colors.textSecondary,
        '&.Mui-focused': {
          color: colors.primary,
        },
      },
    },
    
    // Navigation styles
    navbar: {
      background: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    
    sidebar: {
      background: colors.surface,
      borderRight: `1px solid ${colors.border}`,
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    },
    
    // Form styles
    formContainer: {
      ...spacing.md,
      maxWidth: { xs: '100%', sm: '500px', md: '600px', lg: '700px' },
      mx: 'auto',
    },
    
    // Loading and empty states
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      color: colors.textSecondary,
    },
    
    emptyState: {
      textAlign: 'center',
      py: 8,
      color: colors.textSecondary,
    },
  }
}

export const getMediaQuery = (breakpoint) => {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`
}

export const getMobileFirstStyles = (theme) => {
  const { colors } = useResponsiveValues(theme)
  
  return {
    // Mobile-first approach styles
    mobileFirst: {
      width: '100%',
      padding: 2,
      
      [getMediaQuery('sm')]: {
        padding: 3,
      },
      
      [getMediaQuery('md')]: {
        padding: 4,
        maxWidth: '720px',
        margin: '0 auto',
      },
      
      [getMediaQuery('lg')]: {
        padding: 5,
        maxWidth: '960px',
      },
      
      [getMediaQuery('xl')]: {
        padding: 6,
        maxWidth: '1140px',
      },
    },
  }
}

// Hook for responsive design
export const useResponsiveDesign = (theme) => {
  const responsiveValues = useResponsiveValues(theme)
  const responsiveStyles = getResponsiveStyles(theme)
  const mobileFirstStyles = getMobileFirstStyles(theme)
  
  return {
    ...responsiveValues,
    styles: responsiveStyles,
    mobileFirst: mobileFirstStyles,
    breakpoints,
    getMediaQuery,
  }
}

export default {
  breakpoints,
  useResponsiveValues,
  getResponsiveStyles,
  getMediaQuery,
  getMobileFirstStyles,
  useResponsiveDesign,
}
