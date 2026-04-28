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
  Drawer
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
  AccessTime,
  Star,
  Phone,
  Chat,
  FilterList,
  Settings,
  Traffic,
  Directions,
  Satellite,
  Map as MapIcon,
  Search,
  Clear,
  Add
} from '@mui/icons-material'

const MapView = () => {
  const [mapType, setMapType] = useState('standard')
  const [showTraffic, setShowTraffic] = useState(false)
  const [showDirections, setShowDirections] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(14)
  const [showDrivers, setShowDrivers] = useState(true)
  const [showUsers, setShowUsers] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false)

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
      location: { lat: 40.7128, lng: -74.0060 },
      distance: '0.3 mi',
      rating: 4.9,
      trips: 523,
      vehicle: 'Toyota Camry - Silver',
      status: 'available',
      eta: '2 min'
    },
    {
      id: 'DRV002',
      name: 'Mike Wilson',
      location: { lat: 40.7260, lng: -73.9897 },
      distance: '0.5 mi',
      rating: 4.7,
      trips: 412,
      vehicle: 'Honda Accord - Blue',
      status: 'available',
      eta: '3 min'
    },
    {
      id: 'DRV003',
      name: 'John Smith',
      location: { lat: 40.7489, lng: -73.9680 },
      distance: '0.8 mi',
      rating: 4.8,
      trips: 678,
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
      pickup: { lat: 40.7128, lng: -74.0060 },
      dropoff: { lat: 40.7580, lng: -73.9855 },
      status: 'en_route',
      progress: 65
    },
    {
      id: 'RIDE002',
      driver: 'Mike Wilson',
      passenger: 'Jane Smith',
      pickup: { lat: 40.7260, lng: -73.9897 },
      dropoff: { lat: 40.7489, lng: -73.9680 },
      status: 'in_progress',
      progress: 35
    }
  ]

  const hotspots = [
    { name: 'Times Square', lat: 40.7580, lng: -73.9855, demand: 'High' },
    { name: 'Central Park', lat: 40.7829, lng: -73.9654, demand: 'Medium' },
    { name: 'Brooklyn Bridge', lat: 40.7061, lng: -73.9969, demand: 'High' },
    { name: 'Grand Central', lat: 40.7527, lng: -73.9772, demand: 'Medium' }
  ]

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1))
  }

  const handleCenterMap = () => {
    // Simulate centering on user location
    console.log('Centering on user location')
  }

  const handleFullscreen = () => {
    // Toggle fullscreen
    console.log('Toggle fullscreen')
  }

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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Live Map View
      </Typography>

      <Grid container spacing={3}>
        {/* Map Controls */}
        <Grid item xs={12} md={3}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Map Settings</Typography>
              
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Map Type</InputLabel>
                <Select
                  value={mapType}
                  label="Map Type"
                  onChange={(e) => setMapType(e.target.value)}
                >
                  {mapTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box display="flex" alignItems="center">
                        {type.icon}
                        <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="body2" gutterBottom>Zoom Level: {zoomLevel}</Typography>
              <Slider
                value={zoomLevel}
                onChange={(e, value) => setZoomLevel(value)}
                min={1}
                max={20}
                step={1}
                marks={[
                  { value: 1, label: '1' },
                  { value: 10, label: '10' },
                  { value: 20, label: '20' }
                ]}
                sx={{ mb: 2 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={showTraffic}
                    onChange={(e) => setShowTraffic(e.target.checked)}
                  />
                }
                label={<Box display="flex" alignItems="center"><Traffic sx={{ mr: 1 }} />Traffic</Box>}
                sx={{ mb: 1 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showDirections}
                    onChange={(e) => setShowDirections(e.target.checked)}
                  />
                }
                label={<Box display="flex" alignItems="center"><Directions sx={{ mr: 1 }} />Directions</Box>}
                sx={{ mb: 1 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                  />
                }
                label="Demand Heatmap"
              />
            </CardContent>
          </Card>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Show</InputLabel>
                <Select
                  value={selectedFilter}
                  label="Show"
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {filters.map(filter => (
                    <MenuItem key={filter.value} value={filter.value}>
                      <Chip
                        label={filter.label}
                        color={filter.color}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={showDrivers}
                    onChange={(e) => setShowDrivers(e.target.checked)}
                  />
                }
                label="Show Drivers"
                sx={{ mb: 1 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showUsers}
                    onChange={(e) => setShowUsers(e.target.checked)}
                  />
                }
                label="Show Users"
              />
            </CardContent>
          </Card>

          {/* Map Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Actions</Typography>
              
              <Box display="flex" flexDirection="column" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<MyLocation />}
                  onClick={handleCenterMap}
                  fullWidth
                >
                  Center Location
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Search />}
                  fullWidth
                >
                  Search Location
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  fullWidth
                >
                  Clear Filters
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Map Area */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '600px', position: 'relative' }}>
            <CardContent sx={{ height: '100%', p: 0, position: 'relative' }}>
              {/* Simulated Map */}
              <Box
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative'
                }}
              >
                <Box textAlign="center">
                  <Map sx={{ fontSize: 64, mb: 2 }} />
                  <Typography variant="h6">Interactive Map View</Typography>
                  <Typography variant="body2">
                    {mapType.charAt(0).toUpperCase() + mapType.slice(1)} Map • Zoom: {zoomLevel}
                  </Typography>
                  {showTraffic && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Traffic Layer: Active
                    </Typography>
                  )}
                  {showHeatmap && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Demand Heatmap: Active
                    </Typography>
                  )}
                </Box>

                {/* Map Controls Overlay */}
                <Box position="absolute" top={16} right={16}>
                  <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <IconButton onClick={handleZoomIn}>
                      <ZoomIn />
                    </IconButton>
                    <IconButton onClick={handleZoomOut}>
                      <ZoomOut />
                    </IconButton>
                    <Divider />
                    <IconButton onClick={handleCenterMap}>
                      <MyLocation />
                    </IconButton>
                    <IconButton onClick={handleFullscreen}>
                      <Fullscreen />
                    </IconButton>
                  </Paper>
                </Box>

                {/* Simulated Map Markers */}
                {showDrivers && nearbyDrivers.slice(0, 3).map((driver, index) => (
                  <Box
                    key={driver.id}
                    sx={{
                      position: 'absolute',
                      top: `${20 + index * 15}%`,
                      left: `${15 + index * 20}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Chip
                          label={driver.status}
                          color={getStatusColor(driver.status)}
                          size="small"
                        />
                      }
                    >
                      <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                        <DirectionsCar />
                      </Avatar>
                    </Badge>
                  </Box>
                ))}

                {showUsers && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '60%',
                      left: '70%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                      <Person />
                    </Avatar>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Side Panel */}
        <Grid item xs={12} md={3}>
          {/* Nearby Drivers */}
          {showDrivers && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Nearby Drivers</Typography>
                <List dense>
                  {nearbyDrivers.map((driver) => (
                    <ListItem key={driver.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'success.main' }}>
                          <DirectionsCar />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box>
                            <Typography variant="subtitle2">{driver.name}</Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Star sx={{ fontSize: 14, color: 'warning.main' }} />
                              <Typography variant="caption">{driver.rating}</Typography>
                              <Chip
                                label={driver.status}
                                color={getStatusColor(driver.status)}
                                size="small"
                              />
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              {driver.vehicle}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {driver.distance} • ETA: {driver.eta}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box display="flex" flexDirection="column" gap={0.5}>
                        <IconButton size="small">
                          <Phone fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <Chat fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Active Rides */}
          {selectedFilter === 'all' || selectedFilter === 'active' ? (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Active Rides</Typography>
                <List dense>
                  {activeRides.map((ride) => (
                    <ListItem key={ride.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                          <Navigation />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box>
                            <Typography variant="subtitle2">
                              {ride.driver} → {ride.passenger}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Progress: {ride.progress}%
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption">
                            Status: {ride.status.replace('_', ' ')}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ) : null}

          {/* Demand Hotspots */}
          {selectedFilter === 'all' || selectedFilter === 'hotspots' ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Demand Hotspots</Typography>
                <List dense>
                  {hotspots.map((hotspot, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        <LocationOn color="error" />
                      </ListItemIcon>
                      <ListItemText
                        primary={hotspot.name}
                        secondary={
                          <Chip
                            label={`${hotspot.demand} Demand`}
                            color={getDemandColor(hotspot.demand)}
                            size="small"
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24
        }}
        onClick={() => setShowSettingsDrawer(true)}
      >
        <Settings />
      </Fab>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={showSettingsDrawer}
        onClose={() => setShowSettingsDrawer(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Advanced Settings</Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Typography variant="subtitle2" gutterBottom>Display Options</Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="3D Buildings"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Street Names"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Compass"
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2" gutterBottom>Data Layers</Typography>
          <FormControlLabel
            control={<Switch />}
            label="Weather"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Public Transport"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Bike Lanes"
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2" gutterBottom>Performance</Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="High Quality Mode"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Auto Refresh"
          />
        </Box>
      </Drawer>
    </Container>
  )
}

export default MapView
