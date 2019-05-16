import AWS from 'aws-sdk';
import logger from '../utils/logger';
import EmailMessageLog from '../models/emailMessageLog';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });

const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.GENERATE_EMAIL_QUEUE_NAME}`;

class EmailService {
  sendEmail = async req => {
    const { message } = req.body;

    const emailLog = new EmailMessageLog({
      initialRequestType: 'CHATBOT',
      initialRequestDate: new Date(),
      initialRequest: req.body,
      generateEmailMessageDate: null,
      generateEmailMessage: null,
      deliverEmailMessageDate: null,
      deliverEmailMessage: null,
    });
    emailLog.save();

    const params = {
      MessageBody: message,
      QueueUrl: QUEUE_URL,
      emailLogId: emailLog._id,
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        logger.error(`[${this.constructor.name}.sendEmail] Error: ${err}`);
        throw err;
      } else {
        return data;
      }
    });
  };
}

export default new EmailService();
