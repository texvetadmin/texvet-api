import { pick, map } from 'lodash';

export const escapeRegex = searchQuery => searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export const getListFilters = (fields, req) => {
  const { query } = req;
  return map(pick(query, fields), (val, field) => ({
    // eslint-disable-next-line security/detect-non-literal-regexp
    [field]: new RegExp(escapeRegex(val), 'gi'),
  }));
};

export const getListNumericFilters = (fields, req) => {
  const { query } = req;
  return map(pick(query, fields), (val, field) => ({
    // eslint-disable-next-line security/detect-non-literal-regexp
    [field]: parseInt(val, 10),
  }));
};
