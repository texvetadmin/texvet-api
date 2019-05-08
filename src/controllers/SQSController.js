import logger from '../utils/logger';
import sqsService from '../services/SQSService';

class SQSController {
  constructor() {
    this.sqsService = sqsService;
  }

  deliverEmail = async (event, context, callback) => {
    try {
      await this.sqsService.deliverEmail(event, context, callback);
    } catch (err) {
      logger.error(`[${this.constructor.name}.deliverEmail] Error: ${err}`);
      callback(err);
    }
  };

  generateEmail = async (event, context, callback) => {
    try {
      await this.sqsService.generateEmail(event, context, callback);
    } catch (err) {
      logger.error(`[${this.constructor.name}.generateEmail] Error: ${err}`);
      callback(err);
    }
  };
}

export default new SQSController();
