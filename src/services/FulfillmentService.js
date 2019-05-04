import logger from '../utils/logger';
import referrals from '../../seed/data/collections/referral/data';

class FulfillmentService {
  getReferralsBySlug = async req => {
    try {
      const {
        params: { slug },
        body: { type, value },
      } = req;

      //todo get items by slug,type and value

      return referrals;
    } catch (err) {
      logger.error(`[${this.constructor.name}.getReferralsBySlug] Error: ${err}`);
      throw err;
    }
  };
}

export default new FulfillmentService();
