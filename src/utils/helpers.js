/* eslint-disable security/detect-object-injection */
const operationHoursFormatter = data => {
  let days = Object.keys(data).filter(key => key.indexOf('hours') !== -1);
  days = days
    .map(item => {
      if (data[item] && data[item].length && typeof data[item][0] === 'object') {
        return null;
      }
      const day = item.split('_')[1];
      let start = null;
      let end = null;
      if (data[item].length) {
        start = new Date(data[item].split(' ')[0]).getHours();
        end = new Date(data[item].split(' ')[2]).getHours();
      }
      return start || end
        ? {
          day: day.charAt(0).toUpperCase() + day.slice(1),
          start,
          end,
        }
        : null;
    })
    .filter(d => d);
  return days.length ? days : null;
};

const fieldFormatter = field => (field.length ? field.map(p => p.value).join(', ') : null);

export { operationHoursFormatter, fieldFormatter };
