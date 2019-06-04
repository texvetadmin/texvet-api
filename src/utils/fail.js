// import { get } from 'lodash';
const { get } = require('lodash');

const fail = (res, err) => {
  let body = get(err, 'body') || get(err, 'message') || err;
  const code = get(err, 'statusCode') || get(err, 'code') || 500;

  if (code === 500) {
    body = {
      message: 'Sorry, something went wrong! Please try again later.',
    };
  }

  return res.status(code).send(body);
};
module.exports = { fail };
// export default fail;
