import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box,
  useTheme,
  Paper,
  Chip,
  Tooltip
} from '@mui/material';
import { 
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiRain,
  WiFog,
  WiSnow,
  WiDayCloudy,
  WiThermometer
} from 'react-icons/wi';
import { Opacity as RainIcon } from '@mui/icons-material';

/**
 * WeatherResults Component
 *
 * Displays the weather forecast data in a responsive card layout.
 * Includes visual indicators for temperature ranges and precipitation.
 *
 * @param {Object} props
 * @param {Object} props.weatherData - The weather data object containing:
 *   - location: Object with latitude and longitude
 *   - startDate: The start date of the forecast
 *   - days: Number of forecast days
 *   - data: Array of daily weather objects with keys: date, tavg, tmin, tmax, prcp
 * @returns {JSX.Element} A component rendering the forecast cards.
 */
const WeatherResults = ({ weatherData }) => {
  const theme = useTheme();

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const iconProps = { size: 48, style: { color: theme.palette.primary.main } };
    
    switch (condition?.toLowerCase()) {
      case 'sunny':
        return <WiDaySunny {...iconProps} />;
      case 'partly cloudy':
        return <WiDayCloudy {...iconProps} />;
      case 'cloudy':
        return <WiCloudy {...iconProps} />;
      case 'light rain':
        return <WiRain {...iconProps} />;
      case 'fog':
        return <WiFog {...iconProps} />;
      case 'snow':
        return <WiSnow {...iconProps} />;
      default:
        return <WiCloud {...iconProps} />;
    }
  };

  if (!weatherData || !weatherData.data || weatherData.data.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
        <Typography variant="body1">No weather data available.</Typography>
      </Paper>
    );
  }

  // Function to format date to a more readable format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to determine temperature color
  const getTempColor = (temp) => {
    if (temp >= 30) return theme.palette.error.main;
    if (temp >= 20) return theme.palette.warning.main;
    if (temp >= 10) return theme.palette.success.main;
    return theme.palette.info.main;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'primary.light' }}>
        <Typography variant="h5" gutterBottom color="white">
          Weather Forecast
        </Typography>
        <Typography variant="subtitle1" color="white">
          Location: {weatherData.location.lat.toFixed(2)}°N, {weatherData.location.lon.toFixed(2)}°E
        </Typography>
        <Typography variant="subtitle2" color="white">
          {weatherData.days} days from {formatDate(weatherData.startDate)}
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {weatherData.data.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              elevation={2}
              sx={{
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  {formatDate(day.date)}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WiThermometer size={32} style={{ color: getTempColor(day.tavg) }} />
                    <Typography variant="h4" component="span" sx={{ ml: 1 }}>
                      {day.tavg.toFixed(1)}°C
                    </Typography>
                  </Box>
                  <Tooltip title={day.condition} arrow placement="top">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getWeatherIcon(day.condition)}
                    </Box>
                  </Tooltip>
                </Box>

                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Tooltip title="Minimum Temperature" arrow>
                      <Chip
                        icon={<WiThermometer size={20} />}
                        label={`Min: ${day.tmin.toFixed(1)}°C`}
                        size="small"
                        sx={{ bgcolor: getTempColor(day.tmin), color: 'white' }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Maximum Temperature" arrow>
                      <Chip
                        icon={<WiThermometer size={20} />}
                        label={`Max: ${day.tmax.toFixed(1)}°C`}
                        size="small"
                        sx={{ bgcolor: getTempColor(day.tmax), color: 'white' }}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>

                {day.prcp !== null && (
                  <Box sx={{ mt: 'auto' }}>
                    <Tooltip title="Precipitation" arrow>
                      <Chip
                        icon={<RainIcon />}
                        label={`${day.prcp.toFixed(1)}mm`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Tooltip>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeatherResults;
