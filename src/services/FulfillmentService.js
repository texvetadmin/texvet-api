import logger from '../utils/logger';
import staticResources from '../models/staticResources';
import referrals from '../../seed/data/collections/referral/data';
import organizations from '../../seed/data/collections/organization/data';

class FulfillmentService {
  getStaticResourcesBySlug = async req => {
    try {
      const {
        params: { slug },
      } = req;

      return staticResources.findOne({ slug });
    } catch (err) {
      logger.error(`[${this.constructor.name}.getStaticResourcesBySlug] Error: ${err}`);
      throw err;
    }
  };

  getOrganizationBySlug = async req => {
    try {
      const {
        params: { slug },
        body: { type, value },
      } = req;

      // TODO: get items by slug,type and value

      return organizations;
    } catch (err) {
      logger.error(`[${this.constructor.name}.getOrganizationBySlug] Error: ${err}`);
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
}

export default new FulfillmentService();
