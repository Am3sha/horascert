/**
 * Security utility functions for input validation and sanitization
 * Protects against XSS, injection attacks, and validates user input
 */

/**
 * Sanitizes string input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags and event handlers
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  
  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>'"&]/g, (match) => {
    const escapeMap = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '&': '&amp;'
    };
    return escapeMap[match] || match;
  });

  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
};

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates phone number format (international format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  
  // Allow international format: +country code and digits
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleaned);
};

/**
 * Validates certificate number format
 * @param {string} certNumber - Certificate number to validate
 * @returns {boolean} - True if valid format
 */
export const validateCertificateNumber = (certNumber) => {
  if (!certNumber || typeof certNumber !== 'string') {
    return false;
  }
  
  // Certificate numbers should be alphanumeric, 6-20 characters
  const certRegex = /^[A-Z0-9\-]{6,20}$/i;
  return certRegex.test(certNumber.trim());
};

/**
 * Validates text input length
 * @param {string} input - Input string
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if length is valid
 */
export const validateLength = (input, minLength = 0, maxLength = 1000) => {
  if (typeof input !== 'string') {
    return false;
  }
  
  const length = input.trim().length;
  return length >= minLength && length <= maxLength;
};

/**
 * Sanitizes and validates form data object
 * @param {Object} formData - Form data object
 * @param {Object} validationRules - Validation rules for each field
 * @returns {Object} - { sanitized: Object, errors: Object }
 */
export const sanitizeAndValidateForm = (formData, validationRules = {}) => {
  const sanitized = {};
  const errors = {};

  for (const [key, value] of Object.entries(formData)) {
    let sanitizedValue = value;
    
    // Sanitize string values
    if (typeof value === 'string') {
      sanitizedValue = sanitizeInput(value);
    }
    
    // Apply validation rules if provided
    if (validationRules[key]) {
      const rules = validationRules[key];
      
      // Required check
      if (rules.required && (!sanitizedValue || sanitizedValue.trim() === '')) {
        errors[key] = rules.requiredMessage || `${key} is required`;
        continue;
      }
      
      // Skip other validations if field is empty and not required
      if (!sanitizedValue || sanitizedValue.trim() === '') {
        sanitized[key] = sanitizedValue;
        continue;
      }
      
      // Email validation
      if (rules.email && !validateEmail(sanitizedValue)) {
        errors[key] = rules.emailMessage || 'Please enter a valid email address';
        continue;
      }
      
      // Phone validation
      if (rules.phone && !validatePhone(sanitizedValue)) {
        errors[key] = rules.phoneMessage || 'Please enter a valid phone number';
        continue;
      }
      
      // Length validation
      if (rules.minLength && !validateLength(sanitizedValue, rules.minLength)) {
        errors[key] = rules.minLengthMessage || `Minimum length is ${rules.minLength} characters`;
        continue;
      }
      
      if (rules.maxLength && !validateLength(sanitizedValue, 0, rules.maxLength)) {
        errors[key] = rules.maxLengthMessage || `Maximum length is ${rules.maxLength} characters`;
        continue;
      }
    }
    
    sanitized[key] = sanitizedValue;
  }

  return { sanitized, errors };
};

/**
 * Escapes HTML entities for safe display
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
export const escapeHtml = (text) => {
  if (typeof text !== 'string') {
    return '';
  }
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Generates a simple CSRF token (for demonstration)
 * In production, this should be generated server-side
 * @returns {string} - CSRF token
 */
export const generateCSRFToken = () => {
  // In a real application, this should come from the server
  // This is a placeholder for client-side token generation
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Validates CSRF token
 * @param {string} token - Token to validate
 * @param {string} storedToken - Stored token to compare against
 * @returns {boolean} - True if tokens match
 */
export const validateCSRFToken = (token, storedToken) => {
  if (!token || !storedToken) {
    return false;
  }
  return token === storedToken;
};

