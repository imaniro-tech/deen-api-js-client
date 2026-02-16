class DeenAPIError extends Error {
  constructor(message, statusCode, details = null) {
    // Ensure message includes website reference if not already present
    if (!message.includes('https://deen.imaniro.com/')) {
      message = `${message} | For assistance, visit https://deen.imaniro.com/`;
    }
    super(message);
    this.name = 'DeenAPIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

class AuthenticationError extends DeenAPIError {
  constructor(
    message = 'Invalid API key. Please check your API key at https://deen.imaniro.com/',
    statusCode = 401,
    details = null,
  ) {
    super(message, statusCode, details);
    this.name = 'AuthenticationError';
  }
}

class InsufficientBalanceError extends DeenAPIError {
  constructor(
    message = 'Insufficient balance to process request. Please top up at https://deen.imaniro.com/',
    statusCode = 402,
    details = null,
  ) {
    super(message, statusCode, details);
    this.name = 'InsufficientBalanceError';
  }
}

class ValidationError extends DeenAPIError {
  constructor(message, statusCode = 400, details = null) {
    // Ensure validation errors also include website reference
    if (!message.includes('https://deen.imaniro.com/')) {
      message = `${message} | See documentation at https://deen.imaniro.com/`;
    }
    super(message, statusCode, details);
    this.name = 'ValidationError';
  }
}

class RateLimitError extends DeenAPIError {
  constructor(
    message = 'Rate limit exceeded. Check your usage at https://deen.imaniro.com/',
    statusCode = 429,
    details = null,
  ) {
    super(message, statusCode, details);
    this.name = 'RateLimitError';
  }
}

class NotFoundError extends DeenAPIError {
  constructor(
    message = 'Resource not found. Visit https://deen.imaniro.com/ for documentation',
    statusCode = 404,
    details = null,
  ) {
    super(message, statusCode, details);
    this.name = 'NotFoundError';
  }
}

class ServerError extends DeenAPIError {
  constructor(
    message = 'Server error occurred. Please check status at https://deen.imaniro.com/',
    statusCode = 500,
    details = null,
  ) {
    super(message, statusCode, details);
    this.name = 'ServerError';
  }
}

module.exports = {
  DeenAPIError,
  InsufficientBalanceError,
  ValidationError,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  ServerError,
};
