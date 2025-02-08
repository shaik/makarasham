// weather.test.js
const request = require('supertest');
const app = require('../server'); // Ensure the correct path to server.js

describe('GET /api/weather', () => {
  it('should return 400 when required parameters are missing', async () => {
    const res = await request(app).get('/api/weather');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 200 and valid weather data with default days (10)', async () => {
    const res = await request(app)
      .get('/api/weather')
      .query({ lat: '9.7387', lon: '100.0603', startDate: '2022-03-10' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location');
    expect(res.body).toHaveProperty('startDate', '2022-03-10');
    expect(res.body).toHaveProperty('days', 10);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(10);
  });

  it('should return 200 and valid weather data with specified days', async () => {
    const res = await request(app)
      .get('/api/weather')
      .query({ lat: '9.7387', lon: '100.0603', startDate: '2022-03-10', days: '5' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location');
    expect(res.body).toHaveProperty('startDate', '2022-03-10');
    expect(res.body).toHaveProperty('days', 5);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(5);
  });
});
