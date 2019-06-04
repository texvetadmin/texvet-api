// import { pick, map } from 'lodash';
const { pick, map } = require('lodash');

const escapeRegex = searchQuery => searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

const getListFilters = (fields, req) => {
  const { query } = req;
  return map(pick(query, fields), (val, field) => ({
    // eslint-disable-next-line security/detect-non-literal-regexp
    [field]: new RegExp(escapeRegex(val), 'gi'),
  }));
};

const getListNumericFilters = (fields, req) => {
  const { query } = req;
  return map(pick(query, fields), (val, field) => ({
    // eslint-disable-next-line security/detect-non-literal-regexp
    [field]: parseInt(val, 10),
  }));
};

module.exports = { escapeRegex, getListFilters, getListNumericFilters };
