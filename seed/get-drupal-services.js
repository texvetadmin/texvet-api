const fetch = require('node-fetch');
const fs = require('fs');
const resolve = require('path').resolve;

const collectionsPath = resolve(__dirname, 'data', 'services');

const drupalUrl = process.env.DRUPAL_URL || 'http://inventive-d8-txc.pantheonsite.io';
const url = `${drupalUrl}/rest/v1/fulfillments/services`;

const getServices = async () => {
  const resp = await fetch(url);
  const response = await resp.json();

  const servicesSlugList = response.reduce((list, service) => {
    service.field_org_tags.map(s => {
      const slug = s.url ? s.url.split('/')[2].toUpperCase() : null;
      if (!list[slug]) {
        list[slug] = s.target_id;
      }
    });
    return list;
  }, {});

  if (!fs.existsSync(collectionsPath)) {
    fs.mkdirSync(collectionsPath);
  }
  const content = `module.exports = ${JSON.stringify(servicesSlugList)}`;
  fs.writeFile(`${collectionsPath}/data.js`, content, error => {
    if (error) {
      throw error;
    }
  });
};
getServices();

//   const services = await response.map(service => ({
//     id: service.nid[0] ? service.nid[0].value : null,
//     uuid: service.uuid[0] ? service.uuid[0].value : null,
//     title: service.title[0] ? service.title[0].value : null,
//     email: service.field_email[0] ? service.field_email[0].value : null,
//     org_tags: service.field_org_tags.map(tag => {
//       const slug = tag.url ? tag.url.split('/')[2].toUpperCase() : null;
//       return {
//         id: tag.target_id,
//         slug,
//       };
//     }),
//   }));
