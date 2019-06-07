const notificationTemplateMock = require('./notificationTemplateMock.js');

(async () => {
  try {
    await notificationTemplateMock();

    const dbSeeder = require('./seed-db.js');
    const seedTemplates = require('./seed-templates.js');

    await dbSeeder.seedDb();
    await seedTemplates();
  } catch (err) {
    console.log(err);
  }
})();
