/* eslint-disable prefer-destructuring */
/* eslint-disable import/first */
process.env.DEBUG = 'mongo-seeding'; // https://www.npmjs.com/package/mongo-seeding#debug-output
const { Seeder } = require('mongo-seeding');
const yamlConfig = require('node-yaml-config');

const path = require('path');
require('./config');

const dataPath = path.resolve(__dirname, 'data');

function seedDb(environment) {
  process.env.NODE_ENV = environment;
  const envConfig = yamlConfig.load(path.resolve(__dirname, '../env.yml'));
  const config = {
    database: envConfig.MONGODB_URI,
    dropDatabase: true,
    dropCollections: true,
  };

  console.log('Starting database seeding - Misc...');

  return new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        const seeder = new Seeder(config);
        const collections = seeder.readCollectionsFromPath(dataPath, {
          extensions: ['js'],
          transformers: [],
        });
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
