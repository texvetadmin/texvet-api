/* eslint-disable no-unused-vars */
import logger from '../utils/logger';
import staticResources from '../models/staticResources';
import referrals from '../../collections/referral/data';
import organizations from '../../collections/organization/data';

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

  setResource1 = async req => {
    try {
      return null;
    } catch (err) {
      logger.error(`[${this.constructor.name}.setResource1] Error: ${err}`);
      throw err;
    }
  };

  setResource2 = async req => {
    try {
      return null;
    } catch (err) {
      logger.error(`[${this.constructor.name}.setResource1] Error: ${err}`);
      throw err;
    }
  };
}

export default new FulfillmentService();
