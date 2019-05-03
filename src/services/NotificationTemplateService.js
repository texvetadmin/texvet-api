import { getListFilters } from '../utils/filter';
import NotificationTemplate from '../models/notificationTemplate';

import logger from '../utils/logger';

const notificationTemplateFilters = ['_id', 'version'];

class NotificationTemplateService {
  getTemplates = async req => {
    try {
      const {
        query: { limit, ordering = '-createdAt' },
        skip,
      } = req;

      let query = {};

      const filters = getListFilters(notificationTemplateFilters, req);
      if (filters.length) {
        query = { ...query, ...Object.assign(...filters) };
      }

      return Promise.all([
        NotificationTemplate.find(query)
          .limit(limit)
          .skip(skip)
          .sort(ordering)
          .exec(),
        NotificationTemplate.count(query),
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

      return NotificationTemplate.findById(id);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getTemplate] Error: ${err}`);
      throw err;
    }
  };
}

export default new NotificationTemplateService();
