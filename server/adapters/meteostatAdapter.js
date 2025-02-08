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
    // Log the API call request
    logger.info(`Fetching Meteostat data for location ${JSON.stringify(location)}, startDate: ${startDate}, days: ${days}`);
    
    // Simulate an API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate dummy data for the specified number of days
    const dummyData = [];
    const startTime = new Date(startDate).getTime();
    const oneDay = 86400000; // milliseconds in one day

    for (let i = 0; i < days; i++) {
      const date = new Date(startTime + i * oneDay).toISOString().split('T')[0];
      dummyData.push({
        date,
        tavg: 28 + i * 0.1,  // simulated average temperature
        tmin: 25 + i * 0.1,  // simulated minimum temperature
        tmax: 30 + i * 0.1,  // simulated maximum temperature
        prcp: null         // no precipitation data in dummy response
      });
    }

    return {
      location,
      startDate,
      days,
      data: dummyData
    };

    // --- For a real API call, uncomment and adjust the following ---
    /*
    const response = await axios.get('https://api.meteostat.net/v2/point/daily', {
      params: {
        lat: location.lat,
        lon: location.lon,
        start: formatDate(startDate), // You can implement formatDate as needed
        end: formatDate(new Date(new Date(startDate).getTime() + (days - 1) * oneDay)),
        // Include your API key and any additional parameters required by Meteostat
      }
    });
    return {
      location,
      startDate,
      days,
      data: response.data.data
    };
    */
  } catch (error) {
    logger.error(`Error fetching Meteostat data: ${error.message}`);
    throw new Error(`Meteostat API error: ${error.message}`);
  }
}

module.exports = { fetchHistoricalData };
