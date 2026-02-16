const { ImaniroDeenAPIClient } = require('../src/index');

async function hadithExample() {
  const client = new ImaniroDeenAPIClient('sk_12345');

  try {
    const hadiths = await client.getHadiths({
      book: 'Sahih al-Bukhari',
      narrator: 'Abu Hurairah (RA)',
    });

    console.log('Hadiths from Sahih al-Bukhari:');
    hadiths.forEach((hadith, index) => {
      console.log(`\n${index + 1}. ${hadith.number}`);
      console.log(`Text: ${hadith.hadith}`);
      console.log(`Translation: ${hadith.translation}`);
      console.log('-'.repeat(50));
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

hadithExample();
