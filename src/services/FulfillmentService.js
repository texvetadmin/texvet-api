/* eslint-disable no-unused-vars */
import AWS from 'aws-sdk';
import logger from '../utils/logger';
import staticResources from '../models/staticResources';
import referrals from '../../collections/referral/data';
import organizations from '../../collections/organization/data';
import FollowUp from '../models/followUp';
import FollUpService from './FollowUpService';
import EmailMessageLogService from './EmailMessageLogService';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });
const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.GENERATE_EMAIL_QUEUE_NAME}`;

class FulfillmentService {
  getResourcesBySlug = async req => {
    try {
      const {
        params: { slug },
      } = req;

      return staticResources.findOne({ slug });
    } catch (err) {
      logger.error(`[${this.constructor.name}.getResourcesBySlug] Error: ${err}`);
      throw err;
    }
  };

  getServicesBySlug = async req => {
    try {
      const {
        params: { slug },
        body: { type, value },
      } = req;

      // TODO: get items by slug,type and value

      return organizations;
    } catch (err) {
      logger.error(`[${this.constructor.name}.getServicesBySlug] Error: ${err}`);
      throw err;
    }
  };

  getReferralsBySlug = async req => {
    try {
      const {
        params: { slug },
        body: { type, value },
      } = req;

      // TODO: get items by slug,type and value

      return referrals;
    } catch (err) {
      logger.error(`[${this.constructor.name}.getReferralsBySlug] Error: ${err}`);
      throw err;
    }
  };

  closeTheLoop = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
      const handleSingleFollowUp = async followUp => {
        const emailLogId = EmailMessageLogService.logEmailRequest('CLOSE-THE-LOOP', followUp.data);

        const params = {
          MessageBody: {
            type: followUp.notification_type,
            data: followUp.data,
            emailLogId,
          },
          QueueUrl: QUEUE_URL,
        };
        sqs.sendMessage(params, err => {
          if (err) {
            logger.error(`[${this.constructor.name}.closeTheLoop.sendMessage] Error: ${err}`);
            throw err;
          } else {
            followUp.set({ date_delivered: new Date() });
            followUp.save();
          }
        });

        await FollUpService.addFollupIfNecessary(followUp.notification_type, followUp.data);
      };

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const followUps = await FollowUp.find({ delivery_date: today }).exec();
      if (followUps && followUps.length) {
        const tasks = followUps.map(f => handleSingleFollowUp(f));
        await Promise.all(tasks);
      }

      callback(null, 'Follow-up messages successfully sent');
    } catch (err) {
      logger.error(`[${this.constructor.name}.closeTheLoop] Error: ${err}`);
      callback(err);
    }
  };

  createHistoryMessage = async req => {
    try {
      const {
        body: { type, value },
      } = req;

      // TODO: Store the incoming messages to a chatbot-history collection in MongoDB.

      return 'Thank you for your input. It has been logged.';
    } catch (err) {
      logger.error(`[${this.constructor.name}.createHistoryMessage] Error: ${err}`);
      throw err;
    }
  };
}

export default new FulfillmentService();
