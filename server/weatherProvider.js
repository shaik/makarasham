/**
 * weatherProvider.js
 *
 * This module defines the interface for fetching historical weather data.
 * The exported function getHistoricalData() serves as a stub that returns a dummy response.
 *
 * Parameters:
 *   - location: Object (e.g., { lat: number, lon: number })
 *   - startDate: string or Date representing the start date
 *   - days: integer, number of days to fetch data for
 *
 * Returns:
 *   A Promise that resolves to an object with the following structure:
 *   {
 *     location: <passed location>,
 *     startDate: <passed startDate>,
 *     days: <passed days>,
 *     data: [] // dummy data array
 *   }
 */
async function getHistoricalData(location, startDate, days) {
  // Stub implementation: return a dummy response
  return {
    location,
    startDate,
    days,
    data: []  // empty array represents no actual data yet
  };
}

module.exports = { getHistoricalData };
