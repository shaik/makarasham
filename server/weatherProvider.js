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
