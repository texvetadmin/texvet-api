/* eslint-disable no-console */
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { minify } = require('html-minifier');
const _ = require('lodash');
const yamlConfig = require('node-yaml-config');
const NotificationTemplate = require('../src/models/notificationTemplate');
require('../config');

const readFile = util.promisify(fs.readFile);

const SUBJECTS_PATH = path.resolve(__dirname, 'templates', 'subject');
const TEMPLATES_PATH = path.resolve(__dirname, 'templates', 'body');
const envConfig = yamlConfig.load(path.resolve(__dirname, '../', 'env.yml'));
const mongoDB = envConfig.MONGODB_URI;

async function updateNotificationTemplate(name) {
  console.log(`Updating notification template - ${name}`);

  try {
    const subjectData = await readFile(path.join(SUBJECTS_PATH, `${name}.txt`), { encoding: 'utf-8' });
    const templateData = await readFile(path.join(TEMPLATES_PATH, `${name}.html`), { encoding: 'utf-8' });
    const minifiedSubject = minify(subjectData, { collapseWhitespace: true });
    const minifiedTemplate = minify(templateData, {
      collapseWhitespace: true,
      removeComments: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeTagWhitespace: true,
      useShortDoctype: true,
      minifyCss: true,
      minifyJs: true,
    });

    await NotificationTemplate.updateOne(
      { name },
      { subject: minifiedSubject, template: minifiedTemplate },
      { upsert: true },
    ).exec();
  } catch (err) {
    console.log('Template update Error: ', err);
  }
}

function seedTemplates() {
  const db = mongoose.connection;
  db.Promise = global.Promise;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    console.log('Starting database seeding - Tempates...');

    const subjects = fs.readdirSync(SUBJECTS_PATH);
    const templates = fs.readdirSync(TEMPLATES_PATH);
    const sub = subjects.map(s => s.split('.')[0]);
    const temp = templates.map(t => t.split('.')[0]);

    const difference = _.difference(sub, temp);
    if (!_.isEmpty(difference)) {
      throw new Error(`Missing a subject or template Error: ${difference}`);
    }

    const intersection = _.intersection(sub, temp);
    if (!_.isEmpty(intersection)) {
      await NotificationTemplate.deleteMany({ name: { $nin: intersection } }).exec();

      const tasks = intersection.map(name => updateNotificationTemplate(name));
      await Promise.all(tasks);
    }
    
    await db.close();
  });

  mongoose.connect(mongoDB, { useNewUrlParser: true });
}

module.exports = { seedTemplates };
