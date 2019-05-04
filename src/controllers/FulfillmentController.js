import fulfillmentService from '../services/EmailService';
import logger from '../utils/logger';
import fail from '../utils/fail';
import { success } from '../utils/response';

class FulfillmentController {
  constructor() {
    this.fulfillmentService = fulfillmentService;
  }

  getStaticResourcesBySlug = async (req, res) => {
    try {
      const info = this.fulfillmentService.getStaticResourcesBySlug(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getStaticResourcesBySlug] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new FulfillmentController();
