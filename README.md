# Deen API JS Client

A Node.js client for the Deen API, providing easy access to Islamic resources including Hadith, Quran verses, and Duas.

## Getting an API Key

To use the Deen API, you'll need a valid API key. Follow these steps to get yours:

### Step 1: Visit the API Keys Page

Go to **[https://deen.imaniro.com/api-keys](https://deen.imaniro.com/api-keys)** to access your API key dashboard.

### Step 2: Sign In or Create an Account

- If you already have an account, sign in with your credentials
- New user? Click on "Create Account" and fill in the registration form

### Step 3: Generate Your API Key

1. Once logged in, navigate to the **API Keys** section
2. Click the **"Generate New Key"** button
3. Give your key a descriptive name (e.g., "Production App", "Development Server")
4. Select the appropriate permissions/plan for your needs
5. Click **"Generate New Key"** to generate your key

### Step 4: Copy and Secure Your Key

- Store it securely (use environment variables, never commit to version control)
- Consider using a password manager or secure vault

### 💡 Best Practices for API Key Security

```javascript
// DON'T: Hardcode your API key
const client = new ImaniroDeenAPIClient('your_api_key_here');

// DO: Use environment variables
const client = new ImaniroDeenAPIClient(process.env.DEEN_API_KEY);
```

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
    const hadiths = await client.getHadiths({
      book: 'Sahih al-Bukhari',
      maxLimit: 1,
    });

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

- getHadiths({
  book: 'Sahih al-Bukhari',
  narrator: 'Abu Huraira (RA)',
  category: 'prayer',
  authenticity: 'Sahih',
  language: 'English',
  maxLimit: 3
  })

# Error Handling

```js
try {
  const hadiths = await client.getHadiths('Sahih al-Bukhari');
} catch (error) {
  if (error.name === 'AuthenticationError') {
    console.log('Invalid API key');
  } else if (error.name === 'InsufficientBalanceError') {
    console.log('Insuffieient Balance');
  }
}
```
