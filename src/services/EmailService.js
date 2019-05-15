import AWS from 'aws-sdk';
import logger from '../utils/logger';
import FollowUp from '../models/followUp';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });

const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.GENERATE_EMAIL_QUEUE_NAME}`;

class EmailService {
  sendEmail = async req => {
    try {
      const { message: { notification_type } } = req.body;

      if (notification_type.requires_followup) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + notification_type.followup_interval);
        const followUp = new FollowUp({
          recipients: req.body.message.recipients,
          notification_type_id: notification_type.notification_type_id,
          data: req.body.message.text,
          delivery_date: deliveryDate,
        });

        followUp.save(err => {
          if (err) {
            logger.error(`[${this.constructor.name}.followUp.save] Error: ${err}`);
            throw err;
          }
        });
      }

      const params = {
        MessageBody: req.body.message,
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
    } catch (err) {
      logger.error(`[${this.constructor.name}.registerFollowUps] Error: ${err}`);
      throw err;
    }
  };
}

export default new EmailService();
