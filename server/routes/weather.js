// weather.js
const express = require('express');
const router = express.Router();

const { getHistoricalData } = require('../weatherProvider');
const { getCache, setCache } = require('../utils/cacheLayer');

// GET /api/weather
router.get('/', async (req, res) => {
  try {
    // Parse query parameters
    const { lat, lon, startDate, days } = req.query;
    if (!lat || !lon || !startDate) {
      return res.status(400).json({ error: 'Missing required query parameters: lat, lon, and startDate are required.' });
    }
    const daysCount = days ? parseInt(days, 10) : 10;
    const location = { lat: parseFloat(lat), lon: parseFloat(lon) };

    // Build a cache key
    const cacheKey = `weather_${lat}_${lon}_${startDate}_${daysCount}`;

    // Attempt to retrieve cached data
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    // Fetch historical data via the weather provider
    const weatherData = await getHistoricalData(location, startDate, daysCount);

    // Store the result in cache (stub: will always be a no-op for now)
    await setCache(cacheKey, weatherData);

    // Return the weather data as JSON
    return res.status(200).json(weatherData);
  } catch (error) {
    console.error(`Error in /api/weather: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
