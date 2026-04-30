import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
  Chip,
  Avatar,
  Badge,
  Tooltip,
  Fab,
  Drawer,
  Divider,
  useTheme,
  alpha
} from '@mui/material'
import {
  Navigation,
  MyLocation,
  Layers,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  DirectionsCar,
  Person,
  LocationOn,
  Star,
  Phone,
  Chat,
  Settings,
  Traffic,
  Directions,
  Satellite,
  Map as MapIcon,
  Search,
  Clear,
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoogleMapComponent from '../components/GoogleMapComponent'
import GOOGLE_MAPS_CONFIG from '../utils/googleMapsConfig'

const MapView = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const [mapType, setMapType] = useState('standard')
  const [showTraffic, setShowTraffic] = useState(false)
  const [showDirections, setShowDirections] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(14)
  const [showDrivers, setShowDrivers] = useState(true)
  const [showUsers, setShowUsers] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false)
  const [mapCenter, setMapCenter] = useState(null)

  const handleCenterMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => alert('Could not get your location.')
      )
    }
  }

  const mapTypes = [
    { value: 'standard', label: 'Standard', icon: <MapIcon /> },
    { value: 'satellite', label: 'Satellite', icon: <Satellite /> },
    { value: 'hybrid', label: 'Hybrid', icon: <Layers /> },
    { value: 'terrain', label: 'Terrain', icon: <MapIcon /> }
  ]

  const filters = [
    { value: 'all', label: 'All', color: 'default' },
    { value: 'active', label: 'Active Rides', color: 'success' },
    { value: 'available', label: 'Available Drivers', color: 'primary' },
    { value: 'hotspots', label: 'Hotspots', color: 'warning' }
  ]

  const nearbyDrivers = [
    {
      id: 'DRV001',
      name: 'Sarah Johnson',
      distance: '0.3 mi',
      rating: 4.9,
      vehicle: 'Toyota Camry - Silver',
      status: 'available',
      eta: '2 min'
    },
    {
      id: 'DRV002',
      name: 'Mike Wilson',
      distance: '0.5 mi',
      rating: 4.7,
      vehicle: 'Honda Accord - Blue',
      status: 'available',
      eta: '3 min'
    },
    {
      id: 'DRV003',
      name: 'John Smith',
      distance: '0.8 mi',
      rating: 4.8,
      vehicle: 'Nissan Altima - Black',
      status: 'busy',
      eta: 'N/A'
    }
  ]

  const activeRides = [
    {
      id: 'RIDE001',
      driver: 'Sarah Johnson',
      passenger: 'John Doe',
      status: 'en_route',
      progress: 65
    },
    {
      id: 'RIDE002',
      driver: 'Mike Wilson',
      passenger: 'Jane Smith',
      status: 'in_progress',
      progress: 35
    }
  ]

  const hotspots = [
    { name: 'Times Square', demand: 'High' },
    { name: 'Central Park', demand: 'Medium' },
    { name: 'Brooklyn Bridge', demand: 'High' },
    { name: 'Grand Central', demand: 'Medium' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success'
      case 'busy': return 'warning'
      case 'offline': return 'default'
      default: return 'default'
    }
  }

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'High': return 'error'
      case 'Medium': return 'warning'
      case 'Low': return 'success'
      default: return 'default'
    }
  }

  const glassCardStyle = {
    background: isDark ? alpha(theme.palette.background.paper, 0.6) : alpha('#ffffff', 0.8),
    backdropFilter: 'blur(16px)',
    border: '1px solid',
    borderColor: isDark ? alpha('#ffffff', 0.05) : alpha('#000000', 0.05),
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.05)',
    borderRadius: '16px',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      boxShadow: isDark ? '0 8px 32px rgba(0,180,180,0.15)' : '0 8px 32px rgba(0,180,180,0.1)',
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Box sx={{ flexGrow: 1, pt: { xs: 10, md: 12 }, pb: 6, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xxl" disableGutters>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>
                Live Fleet Map
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Real-time tracking and dispatch dashboard
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Settings />}
              onClick={() => setShowSettingsDrawer(true)}
              sx={{
                bgcolor: '#00B4B4',
                color: '#fff',
                borderRadius: '12px',
                px: 3,
                py: 1,
                boxShadow: '0 4px 14px rgba(0, 180, 180, 0.3)',
                '&:hover': { bgcolor: '#009090' }
              }}
            >
              Settings
            </Button>
          </Box>

          <Grid container spacing={4}>
            {/* Map Controls */}
            <Grid item xs={12} lg={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Card sx={glassCardStyle}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="700" gutterBottom>Map Settings</Typography>
                    
                    <FormControl fullWidth size="small" sx={{ mb: 3, mt: 1 }}>
                      <InputLabel>Map Type</InputLabel>
                      <Select
                        value={mapType}
                        label="Map Type"
                        onChange={(e) => setMapType(e.target.value)}
                        sx={{ borderRadius: '8px' }}
                      >
                        {mapTypes.map(type => (
                          <MenuItem key={type.value} value={type.value}>
                            <Box display="flex" alignItems="center">
                              {type.icon}
                              <Typography sx={{ ml: 1.5 }}>{type.label}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Typography variant="body2" color="text.secondary" gutterBottom>Zoom Level</Typography>
                    <Slider
                      value={zoomLevel}
                      onChange={(e, value) => setZoomLevel(value)}
                      min={1}
                      max={20}
                      step={1}
                      sx={{ 
                        mb: 3,
                        color: '#00B4B4',
                        '& .MuiSlider-thumb': {
                          boxShadow: '0 0 10px rgba(0,180,180,0.5)',
                        }
                      }}
                    />

                    <Divider sx={{ mb: 2, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />

                    <FormControlLabel
                      control={<Switch checked={showTraffic} onChange={(e) => setShowTraffic(e.target.checked)} color="primary" />}
                      label={<Box display="flex" alignItems="center"><Traffic sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />Traffic Layer</Box>}
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      control={<Switch checked={showDirections} onChange={(e) => setShowDirections(e.target.checked)} color="primary" />}
                      label={<Box display="flex" alignItems="center"><Directions sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />Route Directions</Box>}
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      control={<Switch checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} color="primary" />}
                      label="Demand Heatmap"
                    />
                  </CardContent>
                </Card>

                <Card sx={glassCardStyle}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="700" gutterBottom>Filters</Typography>
                    
                    <FormControl fullWidth size="small" sx={{ mb: 3, mt: 1 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={selectedFilter}
                        label="Status"
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        sx={{ borderRadius: '8px' }}
                      >
                        {filters.map(filter => (
                          <MenuItem key={filter.value} value={filter.value}>
                            <Chip label={filter.label} color={filter.color} size="small" sx={{ borderRadius: '6px' }} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={<Switch checked={showDrivers} onChange={(e) => setShowDrivers(e.target.checked)} />}
                      label="Show Active Drivers"
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      control={<Switch checked={showUsers} onChange={(e) => setShowUsers(e.target.checked)} />}
                      label="Show Waiting Users"
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            {/* Map Area */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                ...glassCardStyle, 
                height: { xs: '500px', lg: 'calc(100vh - 200px)' }, 
                minHeight: '600px',
                p: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{ flexGrow: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                  <GoogleMapComponent 
                    apiKey={GOOGLE_MAPS_CONFIG.getApiKey()} 
                    height="100%" 
                    mapType={mapType}
                    zoom={zoomLevel}
                    onZoomChange={setZoomLevel}
                    showTraffic={showTraffic}
                    centerLocation={mapCenter}
                  />
                  
                  {/* Floating Action Buttons over Map */}
                  <Box position="absolute" top={16} right={16} display="flex" flexDirection="column" gap={1}>
                    <Paper elevation={4} sx={{ borderRadius: '12px', overflow: 'hidden', bgcolor: 'background.paper' }}>
                      <IconButton onClick={() => setZoomLevel(prev => Math.min(prev + 1, 20))} size="large">
                        <ZoomIn />
                      </IconButton>
                      <Divider />
                      <IconButton onClick={() => setZoomLevel(prev => Math.max(prev - 1, 1))} size="large">
                        <ZoomOut />
                      </IconButton>
                    </Paper>
                    <Paper elevation={4} sx={{ borderRadius: '50%', overflow: 'hidden', mt: 1, bgcolor: 'background.paper' }}>
                      <IconButton onClick={handleCenterMap} size="large">
                        <MyLocation />
                      </IconButton>
                    </Paper>
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* Side Panel: Lists */}
            <Grid item xs={12} lg={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: { xs: 'auto', lg: 'calc(100vh - 200px)' } }}>
                
                {/* Nearby Drivers */}
                {showDrivers && (
                  <Card sx={{ ...glassCardStyle, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box p={3} pb={2}>
                        <Typography variant="h6" fontWeight="700">Nearby Drivers</Typography>
                      </Box>
                      <List sx={{ overflowY: 'auto', px: 2, pb: 2 }}>
                        {nearbyDrivers.map((driver) => (
                          <ListItem key={driver.id} sx={{ mb: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                            <ListItemIcon>
                              <Avatar sx={{ width: 44, height: 44, bgcolor: '#00B4B4', color: '#fff' }}>
                                <DirectionsCar />
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                  <Typography variant="subtitle2" fontWeight="600">{driver.name}</Typography>
                                  <Chip label={driver.status} color={getStatusColor(driver.status)} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                            </Box>
                          }
                          secondary={
                            <Box mt={0.5}>
                              <Typography variant="caption" display="block" color="text.secondary">
                                {driver.vehicle}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                <Typography variant="caption" color="text.primary" fontWeight="500">ETA: {driver.eta}</Typography>
                                <Box display="flex" alignItems="center">
                                  <Star sx={{ fontSize: 14, color: '#FFD700', mr: 0.5 }} />
                                  <Typography variant="caption">{driver.rating}</Typography>
                                </Box>
                              </Box>
                            </Box>
                          }
                        />
                        <Box display="flex" flexDirection="column" gap={0.5} ml={1}>
                          <IconButton size="small" onClick={() => window.open('tel:+1234567890', '_self')} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                            <Phone fontSize="small" color="primary" />
                          </IconButton>
                          <IconButton size="small" onClick={() => alert(`Starting chat with ${driver.name}...`)} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                            <Chat fontSize="small" color="secondary" />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                      </List>
                    </CardContent>
                  </Card>
                )}

                {/* Demand Hotspots */}
                {(selectedFilter === 'all' || selectedFilter === 'hotspots') && (
                  <Card sx={{ ...glassCardStyle, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box p={3} pb={2}>
                        <Typography variant="h6" fontWeight="700">Demand Hotspots</Typography>
                      </Box>
                      <List sx={{ overflowY: 'auto', px: 2, pb: 2 }}>
                        {hotspots.map((hotspot, index) => (
                          <ListItem key={index} sx={{ mb: 1, borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <LocationOn color={hotspot.demand === 'High' ? 'error' : 'warning'} />
                            </ListItemIcon>
                            <ListItemText
                              primary={<Typography variant="body2" fontWeight="500">{hotspot.name}</Typography>}
                            />
                            <Chip
                              label={`${hotspot.demand} Demand`}
                              color={getDemandColor(hotspot.demand)}
                              size="small"
                              sx={{ borderRadius: '6px' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>



      <Drawer
        anchor="left"
        open={showSettingsDrawer}
        onClose={() => setShowSettingsDrawer(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: 'background.paper',
            p: 3
          }
        }}
      >
        <Typography variant="h6" fontWeight="700" gutterBottom>Advanced Settings</Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Map Layers</Typography>
        <FormControlLabel control={<Switch defaultChecked color="primary" />} label="3D Buildings" sx={{ mb: 1 }} />
        <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Street Names" sx={{ mb: 1 }} />
        <FormControlLabel control={<Switch color="primary" />} label="Weather Radar" sx={{ mb: 3 }} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>System</Typography>
        <FormControlLabel control={<Switch defaultChecked color="primary" />} label="High Performance Mode" sx={{ mb: 1 }} />
        <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Auto-refresh Data" />
      </Drawer>

      <Footer />
    </Box>
  )
}

export default MapView
