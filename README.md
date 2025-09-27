# Deen API JS Client

A Node.js client for the Deen API, providing easy access to Islamic resources including Hadith, Quran verses, and Duas.

## Installation

```bash
npm install deen-api-client
```

# Quick Start

```js
const { ImaniroDeenAPIClient } = require('deen-api-client');

// Or using ES modules
import { ImaniroDeenAPIClient } from 'deen-api-client';

// Initialize client with your API key
const client = new ImaniroDeenAPIClient('your_api_key_here');

// Get hadiths from Sahih al-Bukhari
async function getHadiths() {
  try {
    const hadiths = await client.getHadiths('Sahih al-Bukhari', 5);

    hadiths.forEach((hadith) => {
      console.log(`Book: ${hadith.book}`);
      console.log(`Hadith Number: ${hadith.number}`);
      console.log(`Arabic Text: ${hadith.hadith}`);
      console.log(`Translation: ${hadith.translation}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getHadiths();
```

# API Reference

## Methods

- getHadiths(book, maxLimits, options)

- getQuranVerses(surah, verse, maxLimits, options)

- getDuas(category, maxLimits, options)

- searchHadith(query, book, maxLimits)

- getBooks()

# Error Handling

```js
try {
  const hadiths = await client.getHadiths('Sahih al-Bukhari');
} catch (error) {
  if (error.name === 'AuthenticationError') {
    console.log('Invalid API key');
  } else if (error.name === 'RateLimitError') {
    console.log('Rate limit exceeded');
  }
}
```
