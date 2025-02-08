// weather.js
const express = require('express');
const router = express.Router();
const debug = require('debug')('makarasham:weather');

const { getHistoricalData } = require('../weatherProvider');
const { getCache, setCache } = require('../utils/cacheLayer');

// GET /api/weather
router.get('/', async (req, res) => {
  try {
    debug('Received weather request with query params: %O', req.query);

    // Parse query parameters
    const { lat, lon, startDate, days } = req.query;
    if (!lat || !lon || !startDate) {
      debug('Missing required parameters');
      return res.status(400).json({ error: 'Missing required query parameters: lat, lon, and startDate are required.' });
    }

    const daysCount = days ? parseInt(days, 10) : 10;
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);
    
    debug('Parsed coordinates - Latitude: %d, Longitude: %d', parsedLat, parsedLon);

    // Validate latitude and longitude ranges
    if (parsedLat < -90 || parsedLat > 90) {
      debug('Invalid latitude: %d (must be between -90 and 90)', parsedLat);
      return res.status(400).json({ error: 'Invalid latitude. Must be between -90 and 90 degrees.' });
    }
    if (parsedLon < -180 || parsedLon > 180) {
      debug('Invalid longitude: %d (must be between -180 and 180)', parsedLon);
      return res.status(400).json({ error: 'Invalid longitude. Must be between -180 and 180 degrees.' });
    }
    
    debug('Coordinates validated successfully');
    const location = { lat: parsedLat, lon: parsedLon };

    // Build a cache key
    const cacheKey = `weather_${lat}_${lon}_${startDate}_${daysCount}`;
    debug('Cache key: %s', cacheKey);

    // Attempt to retrieve cached data
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      debug('Cache hit - returning cached data');
      return res.status(200).json(cachedData);
    }
    debug('Cache miss - fetching from weather provider');

    // Fetch historical data via the weather provider
    const weatherData = await getHistoricalData(location, startDate, daysCount);
    debug('Weather data received: %O', weatherData);

    // Store the result in cache (stub: will always be a no-op for now)
    await setCache(cacheKey, weatherData);
    debug('Weather data cached');

    // Return the weather data as JSON
    debug('Sending response');
    return res.status(200).json(weatherData);
  } catch (error) {
    debug('Error in /api/weather: %O', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
