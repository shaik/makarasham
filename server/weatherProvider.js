/**
 * weatherProvider.js
 *
 * Module providing historical weather data functionality.
 * Currently implements a stub that returns dummy data for testing and development.
 *
 * @module weatherProvider
 */

/**
 * Fetches historical weather data for a specific location and date range.
 * Currently returns dummy data with a consistent pattern.
 *
 * @async
 * @function getHistoricalData
 * @param {Object} location - The geographical coordinates
 * @param {number} location.lat - Latitude (-90 to 90)
 * @param {number} location.lon - Longitude (-180 to 180)
 * @param {string|Date} startDate - Start date for the weather data
 * @param {number} days - Number of days to fetch data for
 * @returns {Promise<Object>} Weather data object
 * @returns {Object} result.location - The input location object
 * @returns {string} result.startDate - The input start date
 * @returns {number} result.days - Number of days requested
 * @returns {Array<Object>} result.data - Array of daily weather records
 * @returns {string} result.data[].date - Date in YYYY-MM-DD format
 * @returns {number} result.data[].tavg - Average temperature
 * @returns {number} result.data[].tmin - Minimum temperature
 * @returns {number} result.data[].tmax - Maximum temperature
 * @returns {number|null} result.data[].prcp - Precipitation amount
 */
async function getHistoricalData(location, startDate, days) {
  // Generate dummy data for the specified number of days
  const dummyData = [];
  const startTime = new Date(startDate).getTime();
  const oneDay = 86400000; // Number of milliseconds in a day

  for (let i = 0; i < days; i++) {
    // Calculate the date for each day and format it as "YYYY-MM-DD"
    const date = new Date(startTime + i * oneDay).toISOString().split('T')[0];
    dummyData.push({
      date,
      tavg: 28.0 + i * 0.1, // Example dummy average temperature
      tmin: 25.0 + i * 0.1, // Example dummy minimum temperature
      tmax: 30.0 + i * 0.1, // Example dummy maximum temperature
      prcp: null          // No precipitation data for dummy
    });
  }

  return {
    location,
    startDate,
    days,
    data: dummyData
  };
}

module.exports = { getHistoricalData };
