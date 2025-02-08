import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(10);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get('/api/weather', {
        params: {
          lat: location.lat,
          lon: location.lon,
          startDate,
          days,
        },
      });
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching weather data');
      setWeatherData(null);
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Makarasham Weather History</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Latitude:
          <input
            type="text"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={location.lon}
            onChange={(e) => setLocation({ ...location, lon: e.target.value })}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <label>
          Start Date (YYYY-MM-DD):
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <label>
          Days:
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10))}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>
      <button onClick={fetchWeather}>Fetch Weather Data</button>
      {error && <div className="error-message" style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      {weatherData && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Weather Data</h2>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '1rem' }}>
            {JSON.stringify(weatherData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
