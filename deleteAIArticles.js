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

async function deleteAIArticles() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    const entries = await environment.getEntries({
      'metadata.tags.sys.id[in]': 'aiArticle',
    });

    if (entries.items.length === 0) {
      console.log('No AI-generated articles found.');
      return;
    }

    for (const entry of entries.items) {
      try {
        if (entry.isPublished()) {
          await entry.unpublish();
        }
        await entry.delete();
        console.log(`Deleted entry: ${entry.sys.id}`);
      } catch (error) {
        console.error(`Failed to delete entry ${entry.sys.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error fetching or deleting entries:', error.message);
  }
}

deleteAIArticles();
