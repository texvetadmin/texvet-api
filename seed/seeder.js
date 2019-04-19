const createIdentityUser = require('./identity/create-user');
const users = require('./data/collections/users/data');
const dbSeeder = require('./data/seed-db');

const region = process.env.USERPOOL_REGION;
const userpoolName = process.env.USERPOOL_NAME;
const userpoolAppClientName = process.env.USERPOOL_APP_CLIENT_NAME;

(async () => {
  try {
    await dbSeeder.seedDb();

    users.forEach((user) => {
      const usr = Object.create(user);
      usr.password = 'Test/123';
      createIdentityUser(region, userpoolName, userpoolAppClientName, usr);
    });
  } catch (err) {
    console.log(err);
  }
})();
