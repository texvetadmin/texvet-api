import { get, isArray } from 'lodash';

export const makeUpdatedResponse = (original, updated) => ({
  data: {
    original,
    updated,
  },
});

export const makeArray = (req, data, itemCount) => {
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

export const makeObject = (req, data) => ({
  object: 'object',
  data,
});

export const makePaginatedResponse = (req, data, itemCount) => {
  if (isArray(data)) {
    return makeArray(req, data, itemCount);
  }

  // must be object
  return makeObject(req, data);
};

export const success = (res, message = '', code = 200) => res.status(code).send({
  statusCode: code,
  message,
});

export const fail = (res, err) => {
  let body = get(err, 'body') || get(err, 'message') || err;
  const code = get(err, 'statusCode') || get(err, 'code') || 500;

  if (code === 500) {
    body = {
      message: 'Sorry, something went wrong! Please try again later.',
    };
  }

  return res.status(code).send(body);
};
