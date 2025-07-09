const logger = require('../config/logger');

const errorHandler = (err, req, res, _next) => {
  // Log the error
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Default error
  const error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error.message = 'Validation Error';
    error.status = 400;
    error.details = Object.values(err.errors).map(val => val.message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    error.message = 'Duplicate field value entered';
    error.status = 400;
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    error.message = 'Invalid ID format';
    error.status = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.status = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.status = 401;
  }

  // Send error response
  res.status(error.status).json({
    success: false,
    error: error.message,
    ...(error.details && { details: error.details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler; 