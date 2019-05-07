import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import Mustache from 'mustache';
import sgMail from '@sendgrid/mail';
import logger from '../utils/logger';
import fail from '../utils/fail';
import { success } from '../utils/response';
import logger from './utils/logger';
import NotificationTypeModel from './models/notificationType';
import NotificationTemplateModel from './models/notificationTemplate';
import sqsService from '../services/SQSService';



const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });
const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.DELIVER_EMAIL_QUEUE_NAME}`;

class SQSController {
  constructor() {
    this.sqsService = sqsService;
  }

  // sendEmail = async (req, res) => {
  //   try {
  //     const info = this.sqsService.sendEmail(req);
  //     return success(res, info);
  //   } catch (err) {
  //     logger.error(`[${this.constructor.name}.sendEmail] Error: ${err}`);
  //     return fail(res, err);
  //   }
  // };

  deliverEmail = (event, context, callback) => {
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
  
  generateEmail = async (event, context, callback) => {
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
      callback(err);
    }
  };
}

export default new SQSController();
