require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = 'master';
const ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error('Missing CONTENTFUL_MANAGEMENT_ACCESS_TOKEN in environment variables');
}

const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

async function createEntry() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    const entry = await environment.createEntry('recipe', {
      fields: {
        title: {
          'en-US': 'New Entry Title',
        },
      },
    });

    console.log('Entry created successfully:', entry);
  } catch (error) {
    console.error('Error creating entry:', error);
  }
}

createEntry();
