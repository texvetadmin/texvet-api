import AWS from 'aws-sdk';
import logger from '../utils/logger';
import FollowUp from '../models/followUp';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });

const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.GENERATE_EMAIL_QUEUE_NAME}`;

class EmailService {
  sendEmail = async req => {
    const { message } = req.body;

    const params = {
      MessageBody: message,
      QueueUrl: QUEUE_URL,
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

  registerFollowUps = async req => {
    try {
      const { notification_type_id, notification_type, message } = req.body;

      if (notification_type.requires_followup) {
        const followUp = await FollowUp.findById({ notification_type_id }).exec();

        followUp.set({ data: message });
        followUp.save();
      }
    } catch (err) {
      logger.error(`[${this.constructor.name}.registerFollowUps] Error: ${err}`);
      throw err;
    }
  };
}

export default new EmailService();
