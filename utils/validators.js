/**
 * Common validation utility functions
 */

/**
 * Validate UUID format
 * @param {string} uuid - UUID string to validate
 * @returns {boolean} - True if valid UUID
 */
const isValidUUID = uuid => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Validate pagination parameters
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Object} - Validation result
 */
const validatePagination = (page, limit) => {
  const errors = [];

  if (page && (isNaN(page) || page < 1)) {
    errors.push('Page must be a positive integer');
  }

  if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
    errors.push('Limit must be between 1 and 100');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize string input
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeString = input => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validate hex color format
 * @param {string} color - Color string to validate
 * @returns {boolean} - True if valid hex color
 */
const isValidHexColor = color => {
  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  return hexColorRegex.test(color);
};

module.exports = {
  isValidUUID,
  validatePagination,
  sanitizeString,
  isValidHexColor,
};
