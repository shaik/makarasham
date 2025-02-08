import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import WeatherResults from './components/WeatherResults';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

/**
 * Main App component for the Makarasham Weather History application.
 * Provides a form for users to input location and date parameters,
 * and displays historical weather data in a styled card layout.
 */
function App() {
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(10);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get('/api/weather', {
        params: {
          lat: location.lat,
          lon: location.lon,
          startDate,
          days,
        },
      });
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching weather data');
      setWeatherData(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h1" gutterBottom align="center" color="primary">
            Makarasham Weather History
          </Typography>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <TextField
                label="Latitude"
                value={location.lat}
                onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                placeholder="e.g., 40.7128"
                helperText="Enter latitude (-90 to 90)"
              />
              <TextField
                label="Longitude"
                value={location.lon}
                onChange={(e) => setLocation({ ...location, lon: e.target.value })}
                placeholder="e.g., -74.0060"
                helperText="Enter longitude (-180 to 180)"
              />
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Number of Days"
                type="number"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10))}
                inputProps={{ min: 1, max: 30 }}
                helperText="1-30 days"
              />
              <Button
                onClick={fetchWeather}
                size="large"
                sx={{ minWidth: 200, height: 40 }}
              >
                Fetch Weather Data
              </Button>
            </Box>
          </Paper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {weatherData && <WeatherResults weatherData={weatherData} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
