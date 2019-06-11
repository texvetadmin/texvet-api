/* eslint-disable security/detect-object-injection */
const operationHoursFormatter = data => {
  const days = Object.keys(data).filter(key => key.indexOf('hours') !== -1);
  return days
    .map(item => {
      if (data[item] && data[item].length && typeof data[item][0] === 'object') {
        return null;
      }
      const day = item.split('_')[1];
      let start = null;
      let end = null;
      if (data[item].length) {
        console.log('data[item]', data[item]);
        start = new Date(data[item].split(' ')[0]).getHours();
        end = new Date(data[item].split(' ')[2]).getHours();
      }
      return {
        day: day.charAt(0).toUpperCase() + day.slice(1),
        start,
        end,
      };
    })
    .filter(d => d);
};

export default operationHoursFormatter;
