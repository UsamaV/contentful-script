const contentful = require("contentful-management");

const SPACE_ID = "2tttqpbs93x3";
const ENVIRONMENT_ID = "master";
const ACCESS_TOKEN = "CFPAT-7jCGWMghUW7mtVfinaP1cS01geYQ1cJLUOQjoeJHQQs";
const ENTRY_ID = "4dtirX7Vi7kPCYyyG5RKW4";

const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

async function deleteEntry() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    const entry = await environment.getEntry(ENTRY_ID);

    if (entry) {
      await entry.unpublish();
      await entry.delete();
      console.log(`Entry ${ENTRY_ID} deleted successfully.`);
    } else {
      console.log(`Entry ${ENTRY_ID} not found.`);
    }
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

deleteEntry();
