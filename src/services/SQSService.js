import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import Mustache from 'mustache';
import sgMail from '@sendgrid/mail';
import logger from '../utils/logger';
import NotificationTypeModel from '../models/notificationType';
import NotificationTemplateModel from '../models/notificationTemplate';
import EmailMessageLogService from './EmailMessageLogService';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });
const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.DELIVER_EMAIL_QUEUE_NAME}`;

class SQSService {
  deliverEmail = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
      const queueMessage = JSON.parse(event.Records[0].body);

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const { subject, body } = queueMessage.data;
      const emailMessage = {
        to: 'team-texvet+test@inventive.io',
        from: 'team-texvet@inventive.io',
        subject,
        html: body,
      };

      await EmailMessageLogService.logEmailDelivery(body.emailLogId, emailMessage);

      sgMail.send(emailMessage);
      callback(null, 'Email successfully send');
    } catch (err) {
      logger.error(`[${this.constructor.name}.deliverEmail] Error: ${err}`);
      callback(err);
    }
  };

  generateEmail = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
      const queueMessage = JSON.parse(event.Records[0].body);

      const type = await NotificationTypeModel
        .findOne({ code: queueMessage.type })
        .exec();
      const template = await NotificationTemplateModel
        .findOne({ name: type.template_name })
        .exec();

      const generatedSubject = Mustache.render(template.subject, queueMessage.data);
      const generatedBody = Mustache.render(template.template, queueMessage.data);
      const messageData = {
        subject: generatedSubject,
        body: generatedBody,
      };

      await EmailMessageLogService.logEmailGeneration(queueMessage.emailLogId, messageData);

      const params = {
        MessageBody: {
          type: queueMessage.type,
          data: messageData,
          emailLogId: queueMessage.emailLogId,
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

export default new SQSService();
