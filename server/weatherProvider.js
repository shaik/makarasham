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
function getSeasonalBaseTemperature(date, latitude) {
  const month = new Date(date).getMonth();
  const absLat = Math.abs(latitude);
  
  // Determine if it's summer or winter in this hemisphere
  const isNorthernHemisphere = latitude >= 0;
  const isSummerMonth = month >= 5 && month <= 7;  // June-August
  const isWinterMonth = month <= 1 || month >= 11; // December-February
  
  // Summer in this hemisphere
  if ((isNorthernHemisphere && isSummerMonth) || (!isNorthernHemisphere && !isSummerMonth)) {
    if (absLat < 23.5) return 30; // Tropical
    if (absLat < 45) return 25;  // Temperate
    return 20;                    // Subarctic
  }
  
  // Winter in this hemisphere
  if ((isNorthernHemisphere && isWinterMonth) || (!isNorthernHemisphere && !isWinterMonth)) {
    if (absLat < 23.5) return 25; // Tropical
    if (absLat < 45) return 5;    // Temperate
    return -10;                   // Subarctic
  }
  
  // Spring/Fall
  if (absLat < 23.5) return 28; // Tropical
  if (absLat < 45) return 15;   // Temperate
  return 5;                     // Subarctic
}

function getWeatherCondition(baseTemp, dayOfYear) {
  const conditions = [
    { temp: -10, possibilities: ['snow', 'cloudy', 'partly cloudy'] },
    { temp: 0, possibilities: ['snow', 'light rain', 'cloudy', 'partly cloudy'] },
    { temp: 10, possibilities: ['light rain', 'cloudy', 'partly cloudy', 'sunny'] },
    { temp: 20, possibilities: ['partly cloudy', 'sunny', 'light rain'] },
    { temp: 30, possibilities: ['sunny', 'partly cloudy'] }
  ];
  
  // Find appropriate conditions for this temperature
  const applicableConditions = conditions.reduce((prev, curr) => 
    Math.abs(curr.temp - baseTemp) < Math.abs(prev.temp - baseTemp) ? curr : prev
  ).possibilities;
  
  // Use day of year to add some determinism to the "random" selection
  return applicableConditions[dayOfYear % applicableConditions.length];
}

async function getHistoricalData(location, startDate, days) {
  const dummyData = [];
  const startTime = new Date(startDate).getTime();
  const oneDay = 86400000; // Number of milliseconds in a day
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startTime + i * oneDay);
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / oneDay);
    
    // Get base temperature for this location and season
    const baseTemp = getSeasonalBaseTemperature(currentDate, location.lat);
    
    // Add daily variation (-3 to +3 degrees)
    const dailyVariation = Math.sin(dayOfYear * 0.017) * 3;
    
    // Add random variation (-2 to +2 degrees)
    const randomVariation = (Math.random() * 4) - 2;
    
    const avgTemp = baseTemp + dailyVariation + randomVariation;
    const condition = getWeatherCondition(baseTemp, dayOfYear);
    const hasPrecipitation = ['light rain', 'snow'].includes(condition);
    
    dummyData.push({
      date: currentDate.toISOString().split('T')[0],
      tavg: Number(avgTemp.toFixed(1)),
      tmin: Number((avgTemp - 5 + (Math.random() * 2)).toFixed(1)),
      tmax: Number((avgTemp + 5 + (Math.random() * 2)).toFixed(1)),
      prcp: hasPrecipitation ? Number((Math.random() * 15).toFixed(1)) : null,
      condition
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
