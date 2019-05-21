const createIdentityUser = require('./identity/create-user');
const users = require('../scripts/test/users/data');
const dbSeeder = require('./seed-db');

const region = process.env.USERPOOL_REGION;
const userpoolName = process.env.USERPOOL_NAME;
const userpoolAppClientName = process.env.USERPOOL_APP_CLIENT_NAME;

(async () => {
  try {
    await dbSeeder.seedDb('development');
    await dbSeeder.seedDb('staging');
    await dbSeeder.seedDb('demo');
    await dbSeeder.seedDb('production');

    users.forEach(user => {
      const usr = Object.create(user);
      usr.password = 'Test/123';
      createIdentityUser(region, userpoolName, userpoolAppClientName, usr);
    });
  } catch (err) {
    console.log(err);
  }
})();
