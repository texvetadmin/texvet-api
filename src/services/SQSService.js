import AWS from 'aws-sdk';
import mongoose from 'mongoose';
import Mustache from 'mustache';
import sgMail from '@sendgrid/mail';
import logger from '../utils/logger';
import NotificationTypeModel from '../models/notificationType';
import NotificationTemplateModel from '../models/notificationTemplate';
import FollowUpModel from '../models/followUp';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });
const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.DELIVER_EMAIL_QUEUE_NAME}`;

class SQSService {
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
      const { type } = JSON.parse(event.Records[0].body);
      const notificationType = await NotificationTypeModel
        .findOne({ code: type })
        .exec();
      const template = await NotificationTemplateModel
        .findOne({ _id: mongoose.Types.ObjectId(notificationType.template_id) })
        .exec();

      //TODO: number of chats (per day and total),
      //TODO: number of resources referred to (per day and total), and
      const followUpCompleted = await FollowUpModel
        .find({ date_delivered: new Date() })
        .count()
        .exec();

      let message;
      if (type === 'activity-report') {
        message = {
          startDate: '',
          endDate: '',
          startedChats: '',
          referralChats: '',
          transcriptReq: '',
          humanReq: '',
          followUpReq: '',
          followUpAttempts: '',
          followUpCompleted,
          noOfTextChats: '',
          noOfVoiceChats: '',
          url: '',
        };
      }

      const params = {
        MessageBody: {
          subject: `TexVet: Activity report for ${message.startDate} - ${message.endDate}`,
          message: Mustache.render(template, { ...message }),
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
