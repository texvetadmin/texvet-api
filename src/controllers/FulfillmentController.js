import fulfillmentService from '../services/FulfillmentService';
import logger from '../utils/logger';
import fail from '../utils/fail';
import { success } from '../utils/response';

class FulfillmentController {
  constructor() {
    this.fulfillmentService = fulfillmentService;
  }

  getResourcesBySlug = async (req, res) => {
    try {
      const info = await this.fulfillmentService.getResourcesBySlug(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getResourcesBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };

  getServicesBySlug = async (req, res) => {
    try {
      const info = await this.fulfillmentService.getServicesBySlug(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getServicesBySlug] Error: ${err}`);
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

  setResource1 = async (req, res) => {
    try {
      const info = await this.fulfillmentService.setResource1(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.setResource1] Error: ${err}`);
      return fail(res, err);
    }
  };

  setResource2 = async (req, res) => {
    try {
      const info = await this.fulfillmentService.setResource2(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.setResource2] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new FulfillmentController();
