/* eslint-disable no-console */
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { minify } = require('html-minifier');
const _ = require('lodash');
const yamlConfig = require('node-yaml-config');
const NotificationTemplate = require('../src/models/notificationTemplate');
const { diff } = require('../src/utils/filter');
require('../config');

const readFile = util.promisify(fs.readFile);

const SUBJECTS_PATH = './src/subjects';
const TEMPLATES_PATH = './src/templates';
const envConfig = yamlConfig.load('./env.yml');
const mongoDB = envConfig.MONGODB_URI;

function seedTemplates() {
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    console.log('Connected to MongoDB database');

    const subjects = fs.readdirSync(SUBJECTS_PATH);
    const templates = fs.readdirSync(TEMPLATES_PATH);

    const difference = diff(subjects, templates);
    if (!_.isEmpty(difference)) {
      throw new Error(`Missing a subject or template Error: ${difference}`);
    }

    const intersection = _.intersection(subjects, templates);

    await NotificationTemplate.deleteMany({ name: { $nin: intersection } }).exec();

    intersection.forEach(async name => {
      try {
        const subjectData = await readFile(path.join(SUBJECTS_PATH, name), { encoding: 'utf-8' });
        const templateData = await readFile(path.join(TEMPLATES_PATH, name), { encoding: 'utf-8' });
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
        await NotificationTemplate.update({ name }, { subject: subjectData, template: minifiedTemplate }, {
          upsert: true,
          setDefaultsOnInsert: true,
        }).exec();
      } catch (err) {
        console.log('Template update Error: ', err);
      }
    });
    db.close();
  });

  mongoose.connect(mongoDB);
}

module.exports = { seedTemplates };
