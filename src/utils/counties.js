const County = require('../models/county');

const getCountyIdByName = async () => {
  const allCountiesId = '37953';
  const county = await County.find({
    $or: [
      { name: location },
      {
        cities: {
          $elemMatch: {
            value: location,
          },
        },
      },
    ],
  });
  if (!county[0]) {
    return allCountiesId;
  }
  return `${county[0].id}+${allCountiesId}`;
};

module.exports = { getCountyIdByName };
