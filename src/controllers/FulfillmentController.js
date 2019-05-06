import fulfillmentService from '../services/FulfillmentService';
import logger from '../utils/logger';
import fail from '../utils/fail';
import { success } from '../utils/response';

class FulfillmentController {
  constructor() {
    this.fulfillmentService = fulfillmentService;
  }

  getStaticResourcesBySlug = async (req, res) => {
    try {
      const info = await this.fulfillmentService.getStaticResourcesBySlug(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getStaticResourcesBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };

  getReferralsBySlug = async (req, res) => {
    try {
      const info = await this.fulfillmentService.getReferralsBySlug(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getReferralsBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };

  getOrganizationBySlug = async (req, res) => {
    try {
      const info = await this.fulfillmentService.getOrganizationBySlug(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getOrganizationBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new FulfillmentController();
