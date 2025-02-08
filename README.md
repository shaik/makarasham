# Makarasham - Historical Weather Data Service

Makarasham is a modern web service that provides historical weather data through a clean REST API. The service is built with Node.js and Express, featuring modular architecture, caching capabilities, and comprehensive testing.

## Project Structure

```
makarasham/
├── client/                 # Frontend application
│   ├── public/
│   └── src/
│       ├── components/
│       └── tests/
├── server/                 # Backend service
│   ├── adapters/          # API adapters (e.g., Meteostat)
│   ├── routes/            # Express route handlers
│   ├── tests/             # Test suites
│   ├── utils/             # Utility functions
│   ├── server.js          # Main Express application
│   └── weatherProvider.js  # Weather data abstraction
└── setup/                 # Project setup scripts
```

## Features

- **REST API Endpoints**: Clean and well-documented API for retrieving historical weather data
- **Weather Provider Abstraction**: Modular design for easy integration of different weather data sources
- **Caching Layer**: Built-in caching support to improve performance (currently stubbed)
- **Comprehensive Testing**: Full test coverage using Jest and Supertest
- **Error Handling**: Robust error handling and logging using Winston

## API Documentation

### GET /api/weather
Retrieve historical weather data for a specific location and time period.

**Query Parameters:**
- `lat` (required): Latitude of the location
- `lon` (required): Longitude of the location
- `startDate` (required): Start date in YYYY-MM-DD format
- `days` (optional): Number of days to fetch (default: 10)

**Response Format:**
```json
{
  "location": { "lat": number, "lon": number },
  "startDate": "YYYY-MM-DD",
  "days": number,
  "data": [
    {
      "date": "YYYY-MM-DD",
      "tavg": number,
      "tmin": number,
      "tmax": number,
      "prcp": number|null
    }
  ]
}
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shaik/makarasham.git
   cd makarasham
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Start both server and client:
   ```bash
   # Normal start
   ./restart.sh

   # Start with debug mode enabled
   DEBUG_MODE=1 ./restart.sh
   ```
   This will:
   - Stop any existing server and client processes
   - Start the server on port 3000
   - Start the client on port 3001

   Alternatively, you can start them separately:
   ```bash
   # Terminal 1: Start server
   cd server
   npm start

   # Terminal 2: Start client
   cd client
   PORT=3001 npm start
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Development

### Server Components

1. **Weather Provider (`weatherProvider.js`)**
   - Defines the interface for fetching historical weather data
   - Currently implements a stub that returns dummy data

2. **Meteostat Adapter (`adapters/meteostatAdapter.js`)**
   - Implements the weather provider interface for Meteostat API
   - Currently returns simulated data

3. **Caching Layer (`utils/cacheLayer.js`)**
   - Provides caching functionality
   - Currently implemented as a stub

4. **API Routes (`routes/weather.js`)**
   - Handles HTTP requests
   - Implements parameter validation
   - Integrates with weather provider and cache

### Testing

The project uses Jest for backend testing and Cypress for frontend E2E testing.

#### Backend Tests
Test files are located in the `server/tests` directory:

- `server.test.js`: Tests for the main Express application
- `weatherProvider.test.js`: Tests for the weather provider interface
- `meteostatAdapter.test.js`: Tests for the Meteostat adapter
- `cacheLayer.test.js`: Tests for the caching functionality
- `weather.test.js`: Tests for the weather API endpoints

#### End-to-End Testing
The project uses Cypress for end-to-end testing of the client application.

##### Setting Up Cypress
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install Cypress (if not already installed):
   ```bash
   npm install --save-dev cypress
   ```

3. Open Cypress to initialize the folder structure:
   ```bash
   npx cypress open
   ```

##### Running E2E Tests
1. Ensure both the server and client are running:
   ```bash
   # Terminal 1: Start the server
   cd server
   npm start

   # Terminal 2: Start the client
   cd client
   npm start
   ```

2. In a new terminal, run Cypress:
   ```bash
   cd client
   npm run cypress:open
   ```

3. In the Cypress test runner:
   - Click on "E2E Testing"
   - Choose your preferred browser
   - Select `weather_flow.spec.js` to run the integration tests

The E2E tests verify the complete user flow, including:
- Form input handling
- API integration
- Data display
- Error handling

## Future Enhancements

1. Implement real caching using Redis
2. Add authentication and rate limiting
3. Integrate with actual Meteostat API
4. Develop frontend client application
5. Add data visualization components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
