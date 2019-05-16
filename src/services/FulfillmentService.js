/* eslint-disable no-unused-vars */
import AWS from 'aws-sdk';
import logger from '../utils/logger';
import staticResources from '../models/staticResources';
import referrals from '../../collections/referral/data';
import organizations from '../../collections/organization/data';
import FollowUp from '../models/followUp';

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
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const followUps = await FollowUp.find({ delivery_date: today }).exec();

      const params = {
        Entries: followUps,
        QueueUrl: QUEUE_URL,
      };
      sqs.sendMessageBatch(params, err => {
        if (err) {
          logger.error(`[${this.constructor.name}.closeTheLoop] Error: ${err}`);
          callback(err);
        } else {
          callback(null, 'Follow-ups messages successfully send');
          followUps.forEach(followUp => {
            followUp.set({ date_delivered: today });
            followUp.save();
          });
        }
      });
    } catch (err) {
      logger.error(`[${this.constructor.name}.closeTheLoop] Error: ${err}`);
      callback(err);
    }
  };
}

export default new FulfillmentService();
