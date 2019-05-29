/* eslint-disable prefer-destructuring */
/* eslint-disable import/first */
process.env.DEBUG = 'mongo-seeding'; // https://www.npmjs.com/package/mongo-seeding#debug-output
const { Seeder } = require('mongo-seeding');
const path = require('path');
require('./config');

const collectionsPath = path.resolve(__dirname, 'collections');

const config = {
  database: process.env.MONGODB_URI,
  dropCollections: true,
};

function seedDb() {
  console.log('Starting database seeding - Misc...');

  return new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        const seeder = new Seeder(config);
        const collections = seeder.readCollectionsFromPath(collectionsPath);
        console.log(collections);
        await seeder.import(collections);
        resolve();
      }, 5000);
    } catch (err) {
      // Handle errors
      console.log(err);
      reject(err);
    }
  });
}

module.exports = { seedDb };
