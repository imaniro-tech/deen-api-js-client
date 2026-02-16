const axios = require('axios');
const {
  DeenAPIError,
  AuthenticationError,
  InsufficientBalanceError,
  RateLimitError,
  NotFoundError,
  ServerError,
  ValidationError,
} = require('./exceptions');
const { Hadith, APIResponse } = require('./models');

class ImaniroDeenAPIClient {
  constructor(apiKey, baseURL = 'https://deen-api.imaniro.com/api/v1') {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = apiKey;
    this.baseURL = baseURL.replace(/\/$/, '');

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
      timeout: 30000,
    });

    this._setupInterceptors();
  }

  _setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;

          switch (status) {
            case 400:
              throw new ValidationError(
                data?.message || 'Invalid request parameters',
                status,
                data?.details,
              );
            case 401:
              throw new AuthenticationError(
                data?.message || 'Invalid API key',
                status,
                data?.details,
              );
            case 402:
              throw new InsufficientBalanceError(
                data?.message || 'Insufficient balance',
                status,
                data?.details,
              );
            case 404:
              throw new NotFoundError(
                data?.message || 'Resource not found',
                status,
                data?.details,
              );
            case 429:
              throw new RateLimitError(
                data?.message || 'Rate limit exceeded',
                status,
                data?.details,
              );
            case 500:
              throw new ServerError(
                data?.message || 'Server error occurred',
                status,
                data?.details,
              );
            default:
              throw new DeenAPIError(
                data?.message || `HTTP Error: ${status}`,
                status,
                data?.details,
              );
          }
        } else if (error.request) {
          throw new DeenAPIError('Network error: Unable to connect to API');
        } else {
          throw new DeenAPIError(error.message);
        }
      },
    );
  }

  async _makeRequest(endpoint, params = {}) {
    try {
      const response = await this.client.post(`/${endpoint}`, params);
      return new APIResponse(response.data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get hadiths based on specified criteria
   *
   * @param {Object} options - Search criteria options
   * @param {string} [options.book] - Name of the hadith book (e.g., "Sahih al-Bukhari")
   * @param {string} [options.hadithNumber] - Specific hadith number
   * @param {string} [options.narrator] - Name of the narrator
   * @param {string} [options.category] - Category or topic of the hadith (e.g., prayer, fasting)
   * @param {string} [options.authenticity] - Classification of the hadith (e.g., Sahih, Daif)
   * @param {string} [options.language="English"] - Language of the hadith (default: "English")
   * @param {number} [options.maxLimit=1] - Maximum number of hadiths to return (default: 1, max: 500)
   * @returns {Promise<Array<Hadith>>} List of Hadith objects matching the criteria
   */
  async getHadiths({
    book,
    hadithNumber,
    narrator,
    category,
    authenticity,
    language = 'English', // Default to English
    maxLimit = 1,
    ...restOptions // For any additional options
  } = {}) {
    // Validate maxLimit
    if (maxLimit > 500) {
      throw new ValidationError('maxLimit cannot exceed 500');
    }
    if (maxLimit < 1) {
      throw new ValidationError('maxLimit must be at least 1');
    }

    // Build params object - only include fields that are provided
    const params = {};

    // Add optional fields only if they have truthy values (not undefined, null, or empty string)
    if (book) params.book = book;
    if (hadithNumber) params.hadithNumber = hadithNumber;
    if (narrator) params.narrator = narrator;
    if (category) params.category = category;
    if (authenticity) params.authenticity = authenticity;

    // Always include language (with default) and maxLimit
    params.language = language;
    params.maxLimit = maxLimit;

    // Add any additional options
    Object.assign(params, restOptions);

    const response = await this._makeRequest('hadiths', params);
    return response.data.map((item) => new Hadith(item));
  }

  /**
   * Check API status
   * @returns {Promise<Object>} API status information
   */
  async checkStatus() {
    try {
      const response = await this.client.get('/status');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ImaniroDeenAPIClient;
