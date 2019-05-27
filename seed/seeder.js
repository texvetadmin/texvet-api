const dbSeeder = require('./seed-db.js');
const templatesSeeder = require('./seed-templates.js');

(async () => {
  try {
    await dbSeeder.seedDb();
    await templatesSeeder.seedTemplates();
  } catch (err) {
    console.log(err);
  }
})();
