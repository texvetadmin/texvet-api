import County from '../models/county';

const getCountyIdByName = async loc => {
  const allCountiesId = '37953';
  if (!loc) {
    return allCountiesId;
  }
  const location = loc.toUpperCase();
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
  return `${allCountiesId}+${county[0].id}`;
};

const getCountyNameByCity = async name => {
  if (!name) {
    return null;
  }
  const location = name.toUpperCase();
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
    return null;
  }
  return `${county[0].name}`;
};

export { getCountyIdByName, getCountyNameByCity };
