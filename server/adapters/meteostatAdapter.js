// meteostatAdapter.js
const axios = require('axios');
const winston = require('winston');

// Set up Winston logger (if not already set up globally)
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Meteostat API configuration
const METEOSTAT_CONFIG = {
  baseURL: 'https://meteostat.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'meteostat.p.rapidapi.com',
    'x-rapidapi-key': '11291be2bbmshadcc6301ebde779p16effcjsnb77fb8704911'
  }
};

/**
 * fetchHistoricalData - Retrieves historical weather data from Meteostat.
 *
 * @param {Object} location - Object with { lat: number, lon: number }
 * @param {string|Date} startDate - The start date for data retrieval.
 * @param {number} days - Number of days to fetch data for.
 *
 * @returns {Promise<Object>} Resolves to an object containing:
 * {
 *   location: <location>,
 *   startDate: <startDate>,
 *   days: <days>,
 *   data: [ { date, tavg, tmin, tmax, prcp }, ... ]
 * }
 */
async function fetchHistoricalData(location, startDate, days) {
  try {
    // Calculate end date based on start date and number of days
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + days - 1);

    // Format dates for API request
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    logger.info(`Fetching Meteostat data for location (${location.lat}, ${location.lon}) from ${startStr} to ${endStr}`);

    // Make API request
    const response = await axios.get('/point/daily', {
      ...METEOSTAT_CONFIG,
      params: {
        lat: location.lat,
        lon: location.lon,
        start: startStr,
        end: endStr
      }
    });

    if (!response.data || !response.data.data) {
      throw new Error('Invalid response from Meteostat API');
    }

    // Transform API response to match our application's format
    const weatherData = response.data.data.map(day => ({
      date: day.date,
      tavg: day.tavg,
      tmin: day.tmin,
      tmax: day.tmax,
      prcp: day.prcp
    }));


    return {
      location,
      startDate,
      days,
      data: weatherData
    };
  } catch (error) {
    logger.error(`Error fetching Meteostat data: ${error.message}`);
    throw new Error(`Meteostat API error: ${error.message}`);
  }
}

module.exports = { fetchHistoricalData };
