const express = require('express');
const winston = require('winston');

// Create a logger instance using Winston
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

const app = express();
const port = process.env.PORT || 3000;

// Mount the weather router
const weatherRouter = require('./routes/weather');
app.use('/api/weather', weatherRouter);

// Define the root route that returns a JSON message
app.get('/', (req, res) => {
  logger.info('GET / called');
  res.status(200).json({ message: "Makarasham API - Server is running" });
});

// Only start the server if this file is run directly (not required as a module)
if (require.main === module) {
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

// Export the app for testing purposes
module.exports = app;
