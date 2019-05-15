import { isNil, pick } from 'lodash';
import { getListFilters } from '../utils/filter';
import logger from '../utils/logger';
import FollowUp from '../models/followUp';
import { ApiError } from '../utils/errors';

const followUpsFilters = [
  '_id',
  'recipient.email',
  'delivery_date',
  'version'];

class FollowUpService {
  getFollowUps = async req => {
    try {
      const {
        query: { skip, limit, ordering = '-createdAt' },
      } = req;
      let query = {};

      const filters = getListFilters(followUpsFilters, req);
      if (filters.length) {
        query = { ...query, ...Object.assign(...filters) };
      }
      return Promise.all([
        FollowUp.find(query)
          .limit(limit)
          .skip(skip)
          .sort(ordering)
          .exec(),
        FollowUp.count(query),
      ]);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getFollowUps] Error: ${err}`);
      throw err;
    }
  };

  getFollowUp = async req => {
    try {
      const {
        params: { id },
      } = req;

      return FollowUp.findById(id);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getFollowUp] Error: ${err}`);
      throw err;
    }
  };

  createFollowUp = async req => {
    try {
      const { body } = req;
      const data = pick(body, [
        'recipients',
        'notification_type_id',
        'data',
        'delivery_date',
        'date_delivered',
      ]);

      const followUp = new FollowUp(data);
      return followUp.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.createFollowUp] Error: ${err}`);
      throw err;
    }
  };

  updateFollowUp = async req => {
    try {
      const {
        params: { id },
        body: followUpData,
      } = req;

      const followUp = await FollowUp.findById(id).exec();

      const { version: currentVersion } = followUp;
      const { version } = followUpData;

      if (isNil(version) || Number(version) !== currentVersion) {
        throw new ApiError({ message: '409 Conflict', statusCode: 409 });
      }

      followUp.set(followUpData);
      return followUp.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.updateFollowUp] Error: ${err}`);
      throw err;
    }
  };

  deleteFollowUp = async req => {
    try {
      const {
        params: { id },
      } = req;

      const followUp = await FollowUp.findById(id).exec();

      if (!followUp) {
        throw new ApiError({ message: '404 FollowUp Not Found', statusCode: 404 });
      }

      followUp.set({ active: false, archived: true });
      return followUp.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.deleteFollowUp] Error: ${err}`);
      throw err;
    }
  };
}

export default new FollowUpService();
