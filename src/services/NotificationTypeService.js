import { isNil, pick } from 'lodash';
import { getListFilters } from '../utils/filter';
import NotificationType from '../models/notificationType';
import logger from '../utils/logger';
import { ApiError } from '../utils/errors';

const notificationTypesFilters = ['_id', 'name', 'description', 'template_name', 'version'];

class NotificationTypeService {
  getTypes = async req => {
    try {
      const {
        query: { limit, ordering = '-createdAt' },
        skip,
      } = req;

      let query = {};

      const filters = getListFilters(notificationTypesFilters, req);
      if (filters.length) {
        query = { ...query, ...Object.assign(...filters) };
      }
      return Promise.all([
        NotificationType.find(query)
          .limit(limit)
          .skip(skip)
          .sort(ordering)
          .exec(),
        NotificationType.count(query),
      ]);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getTypes] Error: ${err}`);
      throw err;
    }
  };

  getType = async req => {
    try {
      const {
        params: { id },
      } = req;

      return NotificationType.findById(id);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getType] Error: ${err}`);
      throw err;
    }
  };

  createType = async req => {
    try {
      const { body } = req;
      const data = pick(body, [
        'name',
        'code',
        'description',
        'template_name',
        'requires_followup',
        'followup_notification_type',
        'followup_interval',
      ]);

      const type = new NotificationType(data);
      return type.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.createType] Error: ${err}`);
      throw err;
    }
  };

  updateType = async req => {
    try {
      const {
        params: { id },
        body: typeData,
      } = req;

      const type = await NotificationType.findById(id).exec();

      const { version: currentVersion } = type;
      const { version } = typeData;

      if (isNil(version) || Number(version) !== currentVersion) {
        throw new ApiError({ message: '409 Conflict', statusCode: 409 });
      }

      type.set(typeData);
      return type.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.updateType] Error: ${err}`);
      throw err;
    }
  };

  deleteType = async req => {
    try {
      const {
        params: { id },
      } = req;

      const type = await NotificationType.findById(id).exec();

      if (!type) {
        throw new ApiError({ message: '404 Notification Type Not Found', statusCode: 404 });
      }

      type.set({ active: false, archived: true });
      return type.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.deleteType] Error: ${err}`);
      throw err;
    }
  };
}

export default new NotificationTypeService();
