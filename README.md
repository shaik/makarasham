# Makarasham

## Project Overview

Makarasham is a historical weather data service designed to assist travelers in planning their trips by providing detailed weather information for specific locations and dates. The application consists of a Node.js/Express backend API and a React-based frontend interface.

The service allows users to:
- Query historical weather data by latitude and longitude
- Specify a start date and number of days for the weather history
- View temperature and precipitation data in a clean, user-friendly interface

## Architecture

- **Frontend**: React.js application with a clean, modern UI
- **Backend**: Express.js REST API
- **Testing**: Jest for unit tests, Cypress for E2E testing
- **CI/CD**: GitHub Actions for automated testing

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git - Historical Weather Data Service

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/makarasham.git
   cd makarasham
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Development Mode

You can use our convenience scripts to start both server and client:

```bash
# Start both server and client
./restart.sh

# Start server only (with debug logging)
./restart_server.sh
```

Or start them separately:

1. Start the server (Port 3000):
   ```bash
   cd server
   npm start
   ```

2. Start the client (Port 3001):
   ```bash
   cd client
   PORT=3001 npm start
   ```

### Debug Mode

To run the server with debug logging:
```bash
DEBUG=makarasham:* npm start
```

## Testing

### Unit Tests

1. Server Tests:
   ```bash
   cd server
   npm test
   ```

2. Client Tests:
   ```bash
   cd client
   npm test
   ```

### End-to-End Tests

Cypress E2E tests are available in the client directory:

```bash
cd client
npm run cypress:open  # Opens Cypress Test Runner
npm run cypress:run   # Runs tests headlessly
```

## CI/CD

The project uses GitHub Actions for continuous integration. On every push and pull request to the main branch, it:
- Installs dependencies
- Runs server tests
- Runs client tests

View the workflow configuration in `.github/workflows/test.yml`.

## Known Issues & Future Improvements

1. Current Limitations:
   - Uses dummy weather data (real API integration pending)
   - Basic caching implementation
   - Limited error handling for edge cases

2. Planned Enhancements:
   - Integration with real weather API
   - Enhanced data visualization
   - User authentication
   - Saved locations feature
   - Advanced caching mechanism

## Project Structure

```
makarasham/
├── client/              # React frontend
│   ├── cypress/         # E2E tests
│   ├── public/          # Static files
│   └── src/            # Source code
├── server/              # Express backend
│   ├── routes/         # API routes
│   ├── utils/          # Utilities
│   └── tests/         # Unit tests
└── .github/            # GitHub configurations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

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
