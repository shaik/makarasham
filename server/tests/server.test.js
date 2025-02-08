// tests/server.test.js
const request = require('supertest');
const app = require('../server'); // Adjust path if necessary

describe('GET /', () => {
  it('should return status 200 and the correct JSON message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Makarasham API - Server is running');
  });
});
