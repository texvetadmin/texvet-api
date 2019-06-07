/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const util = require('util');
require('../config');

const readFile = util.promisify(fs.readFile);

const notificationTemplateMock = async function getNotificationTemplate() {
  const modelsPath = path.resolve(__dirname, 'models');
  const notificationTemplatePath = path.resolve(__dirname, '../', 'src', 'models');
  const notificationTemplate = await readFile(path.join(notificationTemplatePath, 'notificationTemplate.js'), { encoding: 'utf-8' });
  if (!fs.existsSync(modelsPath)) {
    fs.mkdirSync(modelsPath);
  }
  const formated = notificationTemplate
    .split('\n')
    .slice(4, -2)
    .join('\n');

  const content = `const mongoose = require('mongoose');\n ${formated} \nmodule.exports = NotificationTemplateModel;`;
  fs.writeFile(`${modelsPath}/notificationTemplate.js`, content, error => {
    if (error) {
      throw error;
    }
  });
};
module.exports = notificationTemplateMock;
