const dbSeeder = require('./seed-db');

(async () => {
  try {
    await dbSeeder.seedDb();
  } catch (err) {
    console.log(err);
  }
})();
