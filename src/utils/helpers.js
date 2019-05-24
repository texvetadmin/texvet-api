const operationHoursFormatter = data => {
  const days = Object.keys(data).filter(key => key.indexOf('hours') !== -1);
  return days.map(item => {
    const day = item.split('_')[1];
    const start = data[item] ? new Date(data[item].split(' ')[0]).getHours() : null;
    const end = data[item] ? new Date(data[item].split(' ')[2]).getHours() : null;
    return {
      day: day.charAt(0).toUpperCase() + day.slice(1),
      start,
      end,
    };
  });
};

export { operationHoursFormatter };
