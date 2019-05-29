import fetch from 'node-fetch';
import County from '../models/county';
import db from '../mongoose';

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
    return new County({
      id,
      uuid,
      name,
      cities: county.city,
      relatedCities,
    });
  });
  db.collection('Counties').insertMany(counties, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log('Counties inserted');
      db.close();
    }
  });
  return counties;
};
getCounties();
