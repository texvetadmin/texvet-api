const fetch = require('node-fetch');

const fs = require('fs');
const resolve = require('path').resolve;

const collectionsPath = resolve(__dirname, 'data', 'counties');

const drupalUrl = process.env.DRUPAL_URL || 'http://inventive-d8-txc.pantheonsite.io';
const url = `${drupalUrl}/rest/v1/content/resources/counties`;

const getCounties = async () => {
  const resp = await fetch(url);
  const response = await resp.json();
  const counties = await response.map(county => {
    const id = county.tid[0] ? county.tid[0].value : null;
    const uuid = county.uuid[0] ? county.uuid[0].value : null;
    const name = county.name[0] ? county.name[0].value : null;
    const relatedCities = county.field_ref_texascities.map(city => {
      const name = city.url ? city.url.split('/')[2].toUpperCase() : null;
      return {
        id: city.target_id,
        name,
      };
    });
    return {
      id,
      uuid,
      name,
      cities: county.city,
      relatedCities,
    };
  });
  if (!fs.existsSync(collectionsPath)) {
    fs.mkdirSync(collectionsPath);
  }
  const content = `module.exports = ${JSON.stringify(counties)}`;
  fs.writeFile(`${collectionsPath}/data.js`, content, error => {
    if (error) {
      throw error;
    }
  });
};
getCounties();
