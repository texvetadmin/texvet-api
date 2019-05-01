import { isMongoId } from 'validator';
import { isNil, pick } from 'lodash';
import { getListFilters } from '../utils/filter';
import Type from '../models/type';
import logger from '../utils/logger';
import { ApiError } from '../utils/errors';

const typesFilters = ['_id', 'version'];

class NotificationTypeService {
  getTypes = async req => {
    try {
      const {
        query: { limit, ordering = '-createdAt' },
        skip,
      } = req;

      let query = {};

      const filters = getListFilters(typesFilters, req);
      if (filters.length) {
        query = { ...query, ...Object.assign(...filters) };
      }

      return Promise.all([
        Type.find(query)
          .limit(limit)
          .skip(skip)
          .sort(ordering)
          .exec(),
        Type.count(query),
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
      const query = isMongoId(id) ? { _id: id } : { externalId: id };

      return Type.findOne(query);
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
        'template_id',
      ]);

      const type = new Type(data);
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

      const query = isMongoId(id) ? { _id: id } : { externalId: id };
      const type = await Type.findOne(query).exec();

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

      const type = await Type.findOne({ externalId: id }).exec();

      if (!type) {
        throw new ApiError({ message: '404 Type Not Found', statusCode: 404 });
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
