const express = require('express');
const mongoose = require('mongoose');

const errorHandler = require('./lib/error_handler');
const requestLogger = require('./lib/request_logger');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log each request as it comes in for debugging
app.use(requestLogger);
// Register error handling middleware
app.use(errorHandler);

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log('Listening on: http://localhost:' + port)
})

module.exports = app;
