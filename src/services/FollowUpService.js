import { pick } from 'lodash';
import { getListFilters } from '../utils/filter';
import logger from '../utils/logger';

const followUpsFilters = ['_id', 'version'];

class FollowUpService {
  getFollowUps = async req => {
    try {
      const {
        query: { skip, limit, ordering = '-createdAt' },
      } = req;
      //TODO: get Search Criteria and create query
      let query = {};

      const filters = getListFilters(followUpsFilters, req);
      if (filters.length) {
        query = { ...query, ...Object.assign(...filters) };
      }
      //TODO: return
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

      //TODO: return

    } catch (err) {
      logger.error(`[${this.constructor.name}.getFollowUp] Error: ${err}`);
      throw err;
    }
  };

  createFollowUp = async req => {
    try {
      const { body } = req;
      const data = pick(body, []);

      //TODO: create model
      //TODO: return model.save()

    } catch (err) {
      logger.error(`[${this.constructor.name}.createFollowUp] Error: ${err}`);
      throw err;
    }
  };

  updateFollowUp = async req => {
    try {
      const {
        params: { id },
      } = req;

      //TODO: findById
      //TODO: error checking
      //TODO: model.set({});
      //TODO: return model.save()
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

      //TODO: findById
      //TODO: error checking
      //TODO: model.set({});
      //TODO: return model.save()
    } catch (err) {
      logger.error(`[${this.constructor.name}.deleteFollowUp] Error: ${err}`);
      throw err;
    }
  };
}

export default new FollowUpService();
