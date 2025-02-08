/**
 * server.js
 * 
 * Main entry point for the Makarasham Weather History API server.
 * Initializes Express server, sets up Winston logging, and mounts API routes.
 * 
 * @module server
 * @requires express
 * @requires winston
 * @requires ./routes/weather
 */

const express = require('express');
const winston = require('winston');

/**
 * Winston logger configuration
 * Outputs logs to console with simple formatting
 */
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

const app = express();
const port = process.env.PORT || 3000;

/**
 * Weather API routes
 * Handles all /api/weather endpoints for historical weather data
 */
const weatherRouter = require('./routes/weather');
app.use('/api/weather', weatherRouter);

/**
 * GET /
 * Root endpoint that confirms the server is running
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with server status message
 */
app.get('/', (req, res) => {
  logger.info('GET / called');
  res.status(200).json({ message: "Makarasham API - Server is running" });
});

/**
 * Server initialization
 * Only starts the server if this file is run directly (not required as a module)
 * This allows for testing without starting the server
 */
if (require.main === module) {
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

/**
 * Export Express app for testing
 * @exports app
 */
module.exports = app;
