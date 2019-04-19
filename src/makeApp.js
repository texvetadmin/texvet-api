import express from 'express';
import bodyParser from 'body-parser';
import paginate from 'express-paginate';
import helmet from 'helmet';
import './mongoose';
import * as C from './constants';

// this function creates the express app that is used both locally and in our
// hosted environments, including production. Any changes you make here will
// be reflected everywhere, so be careful.
const makeApp = makeRoutesFunctions => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // keep this before all routes that will use pagination
  app.use(paginate.middleware(C.DEFAULT_QUERY_LIMIT, C.MAXIMUM_QUERY_LIMIT));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    );

    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
      // respond with 200
      res.sendStatus(200);
    } else {
      // move on
      next();
    }
  });

  app.use(helmet());

  makeRoutesFunctions.forEach(makeRoutes => {
    makeRoutes(app);
  });

  return app;
};

export default makeApp;
