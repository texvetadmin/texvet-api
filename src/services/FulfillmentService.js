/* eslint-disable no-unused-vars */
import AWS from 'aws-sdk';
import fetch from 'node-fetch';
import logger from '../utils/logger';
import { operationHoursFormatter, fieldFormatter} from '../utils/helpers';
import StaticResources from '../models/staticResources';
import FollowUp from '../models/followUp';
import FollUpService from './FollowUpService';
import EmailMessageLogService from './EmailMessageLogService';
import ChatbotHistory from '../models/chatbotHistory';
import ServiceCategoryModel from '../models/serviceCategory';
import { getCountyIdByName, getCountyNameByCity} from '../utils/counties';
import dialogFlowResponse from '../templates/dialogFlowResponse';

const sqs = new AWS.SQS({ region: process.env.USERPOOL_REGION });
const QUEUE_URL = `https://sqs.${process.env.USERPOOL_REGION}.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.GENERATE_EMAIL_QUEUE_NAME}`;

class FulfillmentService {
  getResourcesBySlugAPI = async req => {
    try {
      const {
        params: { slug },
      } = req;
      return this.getResourcesBySlug(slug);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getServicesBySlug] Error: ${err}`);
      throw err;
    }
  };

  getServicesBySlugAPI = async req => {
    try {
      const {
        params: { slug, location },
      } = req;
      return this.getServicesBySlug({ slug, location });
    } catch (err) {
      logger.error(`[${this.constructor.name}.getServicesBySlug] Error: ${err}`);
      throw err;
    }
  };

  getReferralsBySlugAPI = async req => {
    try {
      const {
        params: { slug, location },
      } = req;
      return this.getReferralsBySlug({ slug, location });
    } catch (err) {
      logger.error(`[${this.constructor.name}.getReferralsBySlug] Error: ${err}`);
      throw err;
    }
  };

  getResourcesBySlug = async ({slug}) => {
    try {
      return StaticResources.findOne({ slug });
    } catch (err) {
      logger.error(`[${this.constructor.name}.getResourcesBySlug] Error: ${err}`);
      throw err;
    }
  };

  getServicesBySlug = async ({ slug, location }) => {
    try {
      const county = await getCountyIdByName(location);
      const getServiceId = async () => {
        const slugData = await ServiceCategoryModel.find({
          $or: [
            { title: slug },
            { slug },
          ],
        });
        if (!slugData[0]) {
          throw new Error('Sorry, service category is invalid!');
        }
        return slugData[0].target_id;
      };
      const serviceId = await getServiceId();
      const query = `${serviceId}+${county}`;

      const url = `${process.env.DRUPAL_URL}/rest/v1/fulfillments/services/${query}`;
      const resp = await fetch(url);
      const response = await resp.json();

      return response.map(data => ({
        name: data.title ? fieldFormatter(data.title) : null,
        phone: data.field_phone ? fieldFormatter(data.field_phone) : null,
        hoursOfOperation: operationHoursFormatter(data),
      }));
    } catch (err) {
      logger.error(`[${this.constructor.name}.getServicesBySlug] Error: ${err}`);
      throw err;
    }
  };

  getReferralsBySlug = async ({ slug, location }) => {
    try {
      const county = await getCountyIdByName(location);
      const query = slug ? `${slug}/${county}` : county;
      const url = `${process.env.DRUPAL_URL}/rest/v1/content/resources/referrals/${query}`;

      const resp = await fetch(url);
      const response = await resp.json();
      return response.map(data => {
        
        return {
          organization: data.title ? data.title[0].value : null,
          title: data.field_partner_contact_title || null,
          phone: data.field_phone ? fieldFormatter(data.field_phone) : null,
          email: data.field_email ? fieldFormatter(data.field_email) : null,
          additional_email: data.field_persons_direct_work_email || null,
        };
      });
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

  processDialogFlowWebhook = async req => {
    try {
      const history = new ChatbotHistory(req.body);
      history.save();
      const {
        queryResult: {
          queryText,
          parameters: { slug, location },
          intent,
        },
      } = req.body;

      if (!location) {
        const fulfillmentText = 'Sorry, what is your county?';
        return dialogFlowResponse({ fulfillmentText });
      }

      if (!slug) {
        const county = await getCountyNameByCity(location);
        const fulfillmentText = `What can I help you find in ${county} County?`;
        const outputContext = [
          {
            name: location,
            parameters: {
              input: location,
              output: county,
            },
          },
        ];

        return dialogFlowResponse({ fulfillmentText, outputContext });
      }

      const staticResourcesSlugs = [
        'reduced-fee-sporting-license',
        'property-taxes',
        'drivers-license-veteran-designation',
        'free-toll-roads',
        'the-hazlewood-act',
        'free-park-pass',
      ];

      const query = slug.toLowerCase();
      let staticResources;
      let referrals;
      let services;

      const isReferralsType = ['mvpn', 'cvso', 'vcso'].map(type => query.replace(/-|\s/g, '').indexOf(type) !== -1).some(elem => elem);
      const isStaticResourcesType = staticResourcesSlugs.map(type => query.indexOf(type) !== -1).some(elem => elem);

      if (!isReferralsType && !isStaticResourcesType) {
        referrals = await this.getReferralsBySlug({ slug: null, location });
        services = await this.getServicesBySlug({ slug: query, location });
      } else if (!isStaticResourcesType) {
        referrals = await this.getReferralsBySlug({ slug: query, location });
      } else if (!isReferralsType && isStaticResourcesType) {
        staticResources = await this.getResourcesBySlug({ slug: query });
      }

      const fulfillmentText = `I found the following information in ${location}. Do you want me to email you this information?`;
      const outputContext = [{ referrals, services, staticResources }];

      return dialogFlowResponse({ fulfillmentText, outputContext });
    } catch (err) {
      logger.error(`[${this.constructor.name}.processDialogFlowWebhook] Error: ${err}`);
      throw err;
    }
  };
}

export default new FulfillmentService();
