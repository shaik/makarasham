// tests/weatherProvider.test.js
const { getHistoricalData } = require('../weatherProvider');

describe('Weather Provider Interface', () => {
  it('should return a dummy response with provided parameters', async () => {
    const location = { lat: 9.7387, lon: 100.0603 };
    const startDate = "2022-03-10";
    const days = 10;
    const result = await getHistoricalData(location, startDate, days);
    
    // Validate the structure of the returned object
    expect(result).toHaveProperty('location', location);
    expect(result).toHaveProperty('startDate', startDate);
    expect(result).toHaveProperty('days', days);
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
  });
});
