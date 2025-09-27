class DeenAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'DeenAPIError';
    this.statusCode = statusCode;
  }
}

class AuthenticationError extends DeenAPIError {
  constructor(message = 'Invalid API key') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

class RateLimitError extends DeenAPIError {
  constructor(message = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

class NotFoundError extends DeenAPIError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class ServerError extends DeenAPIError {
  constructor(message = 'Server error occurred') {
    super(message, 500);
    this.name = 'ServerError';
  }
}

module.exports = {
  DeenAPIError,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  ServerError,
};
