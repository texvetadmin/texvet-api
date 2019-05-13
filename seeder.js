const dbSeeder = require('./seed-db');

(async () => {
  try {
    await dbSeeder.seedDb();

    //TODO: seed some data

  } catch (err) {
    console.log(err);
  }
})();
