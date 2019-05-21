import AWS from 'aws-sdk';
import logger from '../utils/logger';
import EmailMessageLogService from './EmailMessageLogService';
import FollowUpService from './FollowUpService';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });

const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.GENERATE_EMAIL_QUEUE_NAME}`;

class EmailService {
  sendEmail = async req => {
    try {
      const { body, body: { type: code } } = req.body;

      const emailLogId = EmailMessageLogService.logEmailRequest('CHATBOT', body);

      const params = {
        MessageBody: {
          type: code,
          data: body,
          emailLogId,
        },
        QueueUrl: QUEUE_URL,
      };

      sqs.sendMessage(params, (err, data) => {
        if (err) {
          logger.error(`[${this.constructor.name}.sendEmail.sendMessage] Error: ${err}`);
          throw err;
        } else {
          return data;
        }
      });

      await FollowUpService.addFollupIfNecessary(code, body);
    } catch (err) {
      logger.error(`[${this.constructor.name}.sendEmail] Error: ${err}`);
      throw err;
    }
  };
}

export default new EmailService();
