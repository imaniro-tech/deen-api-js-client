const axios = require('axios');
const {
  DeenAPIError,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  ServerError,
} = require('./exceptions');
const { Hadith, QuranVerse, Dua, APIResponse } = require('./models');

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
            case 401:
              throw new AuthenticationError(data?.message);
            case 404:
              throw new NotFoundError(data?.message);
            case 429:
              throw new RateLimitError(data?.message);
            case 500:
              throw new ServerError(data?.message);
            default:
              throw new DeenAPIError(
                data?.message || `HTTP Error: ${status}`,
                status,
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

  async getHadiths(book, maxLimits = 10, options = {}) {
    const params = {
      book,
      maxLimits,
      ...options,
    };

    const response = await this._makeRequest('hadiths', params);
    return response.data.map((item) => new Hadith(item));
  }
}

module.exports = ImaniroDeenAPIClient;
