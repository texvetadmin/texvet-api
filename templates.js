/* eslint-disable no-console */
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');
const util = require('util');
const { minify } = require('html-minifier');
const yamlConfig = require('node-yaml-config');
const NotificationTemplate = require('./src/models/notificationTemplate');

require('./config');

const readFile = util.promisify(fs.readFile);

const SUBJECTS_PATH = './src/subjects';
const TEMPLATES_PATH = './src/templates';


const envConfig = yamlConfig.load('./env.yml');
const mongoDB = envConfig.MONGODB_URI;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB database');

  fs.readdirSync(SUBJECTS_PATH)
    .forEach(async subjectName => {
      try {
        const data = await readFile(path.join(SUBJECTS_PATH, subjectName), { encoding: 'utf-8' });
        const template = NotificationTemplate.findOne({ name: subjectName });
        template.subject = data;
        template.save();
        console.log('111');
      } catch (err) {
        console.log('Subjects update Error: ', err);
      }
    });

  fs.readdirSync(TEMPLATES_PATH)
    .forEach(async templateName => {
      try {
        const data = await readFile(path.join(TEMPLATES_PATH, templateName), { encoding: 'utf-8' });
        const template = NotificationTemplate.findOne({ name: templateName });
        template.template = minify(data, {
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
        template.save();
        console.log('222');
      } catch (err) {
        console.log('Templates update Error: ', err);
      }
    });
  console.log('333');
});


