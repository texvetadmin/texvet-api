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
      const info = await this.fulfillmentService.getResourcesBySlug_API(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getResourcesBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };

  getServicesBySlug = async (req, res) => {
    try {
      const info = await this.fulfillmentService.getServicesBySlug_API(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getServicesBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };

  getReferralsBySlug = async (req, res) => {
    try {
      const info = await this.fulfillmentService.getReferralsBySlug_API(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getReferralsBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };

  closeTheLoop = async (event, context, callback) => {
    try {
      await this.fulfillmentService.closeTheLoop(event, context, callback);
    } catch (err) {
      logger.error(`[${this.constructor.name}.closeTheLoop] Error: ${err}`);
      callback(err);
    }
  };

  processDialogFlowWebhook = async (req, res) => {
    try {
      const info = await this.fulfillmentService.processDialogFlowWebhook(req);
      console.log(info);

      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.processDialogFlowWebhook] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new FulfillmentController();
