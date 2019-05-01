import { isMongoId } from 'validator';
import { getListFilters } from '../utils/filter';
import Template from '../models/template';

import logger from '../utils/logger';

const templateFilters = ['_id', 'version'];

class TemplateService {
  getTemplates = async req => {
    try {
      const {
        query: { limit, ordering = '-createdAt' },
        skip,
      } = req;

      let query = {};

      const filters = getListFilters(templateFilters, req);
      if (filters.length) {
        query = { ...query, ...Object.assign(...filters) };
      }

      return Promise.all([
        Template.find(query)
          .limit(limit)
          .skip(skip)
          .sort(ordering)
          .exec(),
        Template.count(query),
      ]);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getTemplates] Error: ${err}`);
      throw err;
    }
  };

  getTemplate = async req => {
    try {
      const {
        params: { id },
      } = req;
      const query = isMongoId(id) ? { _id: id } : { externalId: id };

      return Template.findOne(query);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getTemplate] Error: ${err}`);
      throw err;
    }
  };
}

export default new TemplateService();
