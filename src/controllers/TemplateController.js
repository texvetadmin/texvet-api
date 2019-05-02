import fail from '../utils/fail';
import logger from '../utils/logger';
import templateService from '../services/TemplateService';

import { makePaginatedResponse } from '../utils/response';


class TemplateController {
  constructor() {
    this.templateService = templateService;
  }

  getTemplates = async (req, res) => {
    try {
      const [templates, itemCount] = await this.templateService.getTemplates(req);
      const response = makePaginatedResponse(req, templates, itemCount);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getTemplates] Error: ${err}`);
      return fail(res, err);
    }
  };

  getTemplate = async (req, res) => {
    try {
      const template = await this.templateService.getTemplate(req);
      const response = makePaginatedResponse(req, template);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getTemplate] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new TemplateController();
