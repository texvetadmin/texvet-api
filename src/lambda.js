/* eslint-disable no-param-reassign */
import AWS from 'aws-sdk';
import serverless from 'serverless-http';
import makeApp from './makeApp';
import makeRoutes from './makeRoutes';
import logger from './utils/logger';

// make the server
const app = makeApp([makeRoutes]);

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });
const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.DELIVER_EMAIL_QUEUE_NAME}`;


const handler = serverless(app, {
  request: (request, event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.source === 'serverless-plugin-warmup') {
      request.method = 'GET';
      request.url = '/warmup';
    }
  },
});

const generateEmail = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const params = {
    MessageBody: {
      subject: '',
      message: JSON.parse(event.Records[0].body).text,
    },
    QueueUrl: QUEUE_URL,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      logger.error(`[${this.constructor.name}.generateEmail] Error: ${err}`);
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { handler, generateEmail };
