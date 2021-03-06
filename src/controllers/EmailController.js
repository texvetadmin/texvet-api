import emailService from '../services/EmailService';
import logger from '../utils/logger';
import fail from '../utils/fail';
import { success } from '../utils/response';

class EmailController {
  constructor() {
    this.emailService = emailService;
  }

  sendEmail = async (req, res) => {
    try {
      const info = this.emailService.sendEmail(req);
      return success(res, info);
    } catch (err) {
      logger.error(`[${this.constructor.name}.sendEmail] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new EmailController();
