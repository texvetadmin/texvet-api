/* eslint-disable no-param-reassign */
import sgMail from '@sendgrid/mail';

import serverless from 'serverless-http';
import makeApp from './makeApp';
import makeRoutes from './makeRoutes';
import logger from './utils/logger';

// make the server
const app = makeApp([makeRoutes]);

const handler = serverless(app, {
  request: (request, event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.source === 'serverless-plugin-warmup') {
      request.method = 'GET';
      request.url = '/warmup';
    }
  },
});

const deliverEmail = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'team-texvet@inventive.io',
      from: 'test@example.com',
      subject: 'Sending with SendGrid is Fun',
      text: JSON.parse(event.Records[0].body).text,
      html: `<div>${JSON.parse(event.Records[0].body).text}</div`,
    };
    sgMail.send(msg);
  } catch (err) {
    logger.error(`[${this.constructor.name}.deliverEmail] Error: ${err}`);
    callback(err);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handler, deliverEmail };
