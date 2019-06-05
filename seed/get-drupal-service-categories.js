const fetch = require('node-fetch');
const fs = require('fs');
const resolve = require('path').resolve;

const collectionsPath = resolve(__dirname, 'data', 'serviceCategories');

const drupalUrl = process.env.DRUPAL_URL || 'http://inventive-d8-txc.pantheonsite.io';
const url = `${drupalUrl}/rest/v1/content/resources/categories`;

const getServices = async () => {
  const resp = await fetch(url);
  const response = await resp.json();

  const categories = await response.map(category => {
    const id = category.tid[0] ? category.tid[0].value : null;
    const uuid = category.uuid[0] ? category.uuid[0].value : null;
    const title = category.name[0] ? category.name[0].value : null;
    const url = category.path[0] ? category.path[0].alias : null;
    const slug = url ? url.split('/')[2] : null;
    return {
      target_id: id,
      target_uuid: uuid,
      url,
      title,
      slug,
    }
  });

  if (!fs.existsSync(collectionsPath)) {
    fs.mkdirSync(collectionsPath);
  }
  const content = `module.exports = ${JSON.stringify(categories, null, 2)}`;
  fs.writeFile(`${collectionsPath}/data.js`, content, error => {
    if (error) {
      throw error;
    }
  });
};

getServices();
