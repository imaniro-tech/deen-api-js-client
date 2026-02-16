const ImaniroDeenAPIClient = require('./client');
const { Hadith, APIResponse } = require('./models');

const {
  DeenAPIError,
  AuthenticationError,
  InsufficientBalanceError,
  ValidationError,
  RateLimitError,
  NotFoundError,
  ServerError,
} = require('./exceptions');

module.exports = {
  ImaniroDeenAPIClient,
  Hadith,
  APIResponse,
  DeenAPIError,
  AuthenticationError,
  InsufficientBalanceError,
  ValidationError,
  RateLimitError,
  NotFoundError,
  ServerError,
};

// Default export for ES modules
module.exports.default = ImaniroDeenAPIClient;
