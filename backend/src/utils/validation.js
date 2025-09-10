const Joi = require('joi');

// Booking validation schema
const bookingSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),

  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[+]?[\d\s\-\(\)]{8,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number',
      'string.empty': 'Phone number is required',
      'any.required': 'Phone number is required'
    }),

  company: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Company name is required',
      'string.min': 'Company name must be at least 2 characters long',
      'string.max': 'Company name cannot exceed 200 characters',
      'any.required': 'Company name is required'
    }),

  service: Joi.string()
    .valid('AI Development', 'Web Development', 'Production', 'Other')
    .required()
    .messages({
      'any.only': 'Service must be one of: AI Development, Web Development, Production, Other',
      'any.required': 'Service selection is required'
    }),

  selectedDate: Joi.date()
    .iso()
    .min('now')
    .required()
    .messages({
      'date.base': 'Please provide a valid date',
      'date.min': 'Appointment date cannot be in the past',
      'any.required': 'Appointment date is required'
    }),

  selectedTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': 'Please provide a valid time in HH:MM format',
      'string.empty': 'Appointment time is required',
      'any.required': 'Appointment time is required'
    })
});

// Status update validation schema
const statusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'confirmed', 'completed', 'cancelled')
    .required()
    .messages({
      'any.only': 'Status must be one of: pending, confirmed, completed, cancelled',
      'any.required': 'Status is required'
    })
});

// Query parameters validation schema
const queryParamsSchema = Joi.object({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(50),
    
  offset: Joi.number()
    .integer()
    .min(0)
    .default(0),
    
  status: Joi.string()
    .valid('pending', 'confirmed', 'completed', 'cancelled')
    .optional()
});

// UUID validation schema
const uuidSchema = Joi.string()
  .guid({ version: 'uuidv4' })
  .required()
  .messages({
    'string.guid': 'Please provide a valid booking ID',
    'any.required': 'Booking ID is required'
  });

/**
 * Validate booking data
 * @param {Object} data - Booking data to validate
 * @returns {Object} - Validation result
 */
const validateBooking = (data) => {
  const result = bookingSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  // Additional business logic validation
  if (!result.error) {
    const appointmentDate = new Date(result.value.selectedDate);
    const dayOfWeek = appointmentDate.getDay();
    
    // Check if it's a weekend (0 = Sunday, 6 = Saturday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        error: {
          details: [{ message: 'Appointments are not available on weekends' }]
        }
      };
    }

    // Check business hours (9 AM to 5 PM)
    const [hours, minutes] = result.value.selectedTime.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const businessStart = 9 * 60; // 9:00 AM
    const businessEnd = 17 * 60; // 5:00 PM

    if (timeInMinutes < businessStart || timeInMinutes >= businessEnd) {
      return {
        error: {
          details: [{ message: 'Appointments are only available during business hours (9:00 AM - 5:00 PM)' }]
        }
      };
    }
  }

  return result;
};

/**
 * Validate status update data
 * @param {Object} data - Status update data to validate
 * @returns {Object} - Validation result
 */
const validateStatusUpdate = (data) => {
  return statusUpdateSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });
};

/**
 * Validate query parameters
 * @param {Object} query - Query parameters to validate
 * @returns {Object} - Validation result
 */
const validateQueryParams = (query) => {
  return queryParamsSchema.validate(query, {
    abortEarly: false,
    stripUnknown: true
  });
};

/**
 * Validate UUID
 * @param {string} id - UUID to validate
 * @returns {Object} - Validation result
 */
const validateUUID = (id) => {
  return uuidSchema.validate(id);
};

/**
 * Sanitize phone number
 * @param {string} phone - Phone number to sanitize
 * @returns {string} - Sanitized phone number
 */
const sanitizePhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Add + if not present and number doesn't start with +
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  return cleaned;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate time slot availability
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @returns {Object} - Validation result
 */
const validateTimeSlot = (date, time) => {
  try {
    const appointmentDateTime = new Date(`${date}T${time}:00`);
    const now = new Date();

    // Check if appointment is in the past
    if (appointmentDateTime <= now) {
      return {
        valid: false,
        message: 'Cannot schedule appointments in the past'
      };
    }

    // Check if appointment is too far in the future (e.g., more than 3 months)
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (appointmentDateTime > threeMonthsFromNow) {
      return {
        valid: false,
        message: 'Cannot schedule appointments more than 3 months in advance'
      };
    }

    return { valid: true };

  } catch (error) {
    return {
      valid: false,
      message: 'Invalid date or time format'
    };
  }
};

module.exports = {
  validateBooking,
  validateStatusUpdate,
  validateQueryParams,
  validateUUID,
  sanitizePhone,
  isValidEmail,
  validateTimeSlot,
  schemas: {
    bookingSchema,
    statusUpdateSchema,
    queryParamsSchema,
    uuidSchema
  }
};
