/* eslint-disable no-param-reassign */

import serverless from 'serverless-http';
import createApp from './createApp';
import routes from './routes';

// make the server
const app = createApp([routes]);

const handler = serverless(app, {
  request: (request, event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.source === 'serverless-plugin-warmup') {
      request.method = 'GET';
      request.url = '/warmup';
    }
  },
});

// eslint-disable-next-line import/prefer-default-export
export { handler };
