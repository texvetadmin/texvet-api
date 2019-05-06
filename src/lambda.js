/* eslint-disable no-param-reassign */
import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import Mustache from 'mustache';
import sgMail from '@sendgrid/mail';
import serverless from 'serverless-http';
import makeApp from './makeApp';
import makeRoutes from './makeRoutes';
import logger from './utils/logger';
import NotificationTypeModel from './models/notificationType';
import NotificationTemplateModel from './models/notificationTemplate';

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

const generateEmail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const type = await NotificationTypeModel
      .findOne({ code: JSON.parse(event.Records[0].body).type })
      .exec();
    const template = await NotificationTemplateModel
      .findOne({ _id: mongoose.Types.ObjectId(type.template_id) })
      .exec();
    const params = {
      MessageBody: {
        subject: '',
        message: Mustache.render(template, { message: JSON.parse(event.Records[0].body).text }),
      },
      QueueUrl: QUEUE_URL,
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        logger.error(`[${this.constructor.name}.generateEmail.sendMessage] Error: ${err}`);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } catch (err) {
    logger.error(`[${this.constructor.name}.generateEmail] Error: ${err}`);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handler, generateEmail, deliverEmail };
