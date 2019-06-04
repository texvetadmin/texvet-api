// import { isArray } from 'lodash';
const { isArray } = require('lodash');

const makeUpdatedResponse = (original, updated) => ({
  data: {
    original,
    updated,
  },
});

const makeArray = (req, data, itemCount) => {
  const {
    query: { limit, skip = 0, page = 1 },
  } = req;
  const currentPage = page > 1 ? page : 1 + Math.ceil(skip / limit);
  const pageCount = Math.ceil(itemCount / limit);

  return {
    object: 'list',
    has_more: currentPage < pageCount,
    data,
    pageCount,
    currentPage,
  };
};

const makeObject = (req, data) => ({
  object: 'object',
  data,
});

const makePaginatedResponse = (req, data, itemCount) => {
  if (isArray(data)) {
    return makeArray(req, data, itemCount);
  }

  // must be object
  return makeObject(req, data);
};

const success = (res, message = '', code = 200) => res.status(code).send({
  statusCode: code,
  message,
});

module.exports = { makeUpdatedResponse, makeArray, makeObject, makePaginatedResponse, success };
