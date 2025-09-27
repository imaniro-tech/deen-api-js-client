const ImaniroDeenAPIClient = require('../src/client');
const nock = require('nock');

describe('ImaniroDeenAPIClient', () => {
  const apiKey = 'test-key';
  const baseURL = 'https://deen-api.imaniro.com/api/v1';
  let client;

  beforeEach(() => {
    client = new ImaniroDeenAPIClient(apiKey, baseURL);
    nock.cleanAll();
  });

  test('should initialize with API key', () => {
    expect(client.apiKey).toBe(apiKey);
    expect(client.baseURL).toBe(baseURL);
  });

  test('should throw error when no API key provided', () => {
    expect(() => new ImaniroDeenAPIClient()).toThrow('API key is required');
  });

  test('should get hadiths successfully', async () => {
    const mockResponse = {
      success: true,
      data: [
        {
          attribution: 'Marfu',
          authenticity: 'Sahih',
          category: 'Prayer',
          context: 'Hadith Context...',
          explanation: 'Hadith Explanation....',
          hadith: 'الَ : أَخْبَرَنا مالكٌ عَنْ أَبي النَّضْرِ ....',
          narratedBy: 'Abu Huraira',
          book: 'Sahih al-Bukhari',
          number: '508',
          translation: 'Hadith translation...',
        },
      ],
      message: 'Success',
      count: 1,
    };

    nock(baseURL).post('/hadiths').reply(200, mockResponse);

    const hadiths = await client.getHadiths('Sahih al-Bukhari', 1);

    expect(hadiths).toHaveLength(1);
    expect(hadiths[0].book).toBe('Sahih al-Bukhari');
  });

  test('should handle authentication error', async () => {
    nock(baseURL).post('/hadiths').reply(401, { message: 'Invalid API key' });

    await expect(client.getHadiths('Sahih al-Bukhari')).rejects.toThrow(
      'Invalid API key',
    );
  });
});
