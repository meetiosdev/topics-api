/**
 * Utility functions for consistent API response handling
 */

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {any} data - Response data
 * @param {string} message - Success message
 */
const sendSuccess = (
  res,
  statusCode = 200,
  data = null,
  message = 'Success'
) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {any} details - Additional error details
 */
const sendError = (
  res,
  statusCode = 500,
  message = 'Internal Server Error',
  details = null
) => {
  const response = {
    success: false,
    error: message,
  };

  if (details !== null) {
    response.details = details;
  }

  res.status(statusCode).json(response);
};

/**
 * Send paginated response
 * @param {Object} res - Express response object
 * @param {Array} data - Array of items
 * @param {Object} pagination - Pagination metadata
 */
const sendPaginated = (res, data, pagination) => {
  res.status(200).json({
    success: true,
    data,
    pagination,
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendPaginated,
};
