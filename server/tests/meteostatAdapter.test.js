// meteostatAdapter.test.js
const { fetchHistoricalData } = require('../adapters/meteostatAdapter');

describe('Meteostat Adapter', () => {
  it('should return dummy historical weather data with the correct structure', async () => {
    const location = { lat: 9.7387, lon: 100.0603 };
    const startDate = "2022-03-10";
    const days = 5;
    const result = await fetchHistoricalData(location, startDate, days);
    
    // Validate top-level structure
    expect(result).toHaveProperty('location', location);
    expect(result).toHaveProperty('startDate', startDate);
    expect(result).toHaveProperty('days', days);
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBe(days);
    
    // Validate structure for each day
    result.data.forEach(dayData => {
      expect(dayData).toHaveProperty('date');
      expect(dayData).toHaveProperty('tavg');
      expect(dayData).toHaveProperty('tmin');
      expect(dayData).toHaveProperty('tmax');
      expect(dayData).toHaveProperty('prcp');
    });
  });
});
