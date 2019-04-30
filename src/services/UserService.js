import { pick, isNil } from 'lodash';
import { isMongoId } from 'validator';

import User from '../models/user';
import logger from '../utils/logger';
import { ApiError } from '../utils/errors';
import { getListFilters } from '../utils/filter';
import parsePhoneNumber from '../utils/phoneNumbers';

const userFilters = ['_id', 'firstName', 'lastName', 'userName', 'email', 'postalCode', 'version'];

class UserService {
  getUsers = async req => {
    try {
      const {
        query: { limit, ordering = '-createdAt' },
        skip,
      } = req;

      let query = {};

      const filters = getListFilters(userFilters, req);
      if (filters.length) {
        query = { ...query, ...Object.assign(...filters) };
      }

      return Promise.all([
        User.find(query)
          .limit(limit)
          .skip(skip)
          .sort(ordering)
          .exec(),
        User.count(query),
      ]);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getUsers] Error: ${err}`);
      throw err;
    }
  };

  getUser = async req => {
    try {
      const {
        params: { id },
      } = req;
      const query = isMongoId(id) ? { _id: id } : { externalId: id };

      return User.findOne(query);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getUser] Error: ${err}`);
      throw err;
    }
  };

  createUser = async req => {
    try {
      const { body } = req;
      const data = pick(body, [
        'userName',
        'firstName',
        'lastName',
        'email',
        'password',
        'postalCode',
        'externalId',
        'profilePicUrl',
      ]);

      const user = new User(data);
      return user.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.createUser] Error: ${err}`);
      throw err;
    }
  };

  updateUser = async req => {
    try {
      const {
        params: { id },
        body: userData,
      } = req;

      const query = isMongoId(id) ? { _id: id } : { externalId: id };
      const user = await User.findOne(query).exec();

      const { version: currentVersion } = user;
      const { version } = userData;

      if (isNil(version) || Number(version) !== currentVersion) {
        throw new ApiError({ message: '409 Conflict', statusCode: 409 });
      }

      if (userData.phoneNumber) {
        userData.phoneNumber = parsePhoneNumber(userData.phoneNumber);
      }

      user.set(userData);
      return user.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.updateUser] Error: ${err}`);
      throw err;
    }
  };

  deleteUser = async req => {
    try {
      const {
        params: { id },
      } = req;

      const user = await User.findOne({ externalId: id }).exec();

      if (!user) {
        throw new ApiError({ message: '404 User Not Found', statusCode: 404 });
      }

      user.set({ active: false, archived: true });
      return user.save();
    } catch (err) {
      logger.error(`[${this.constructor.name}.deleteUser] Error: ${err}`);
      throw err;
    }
  };
}

export default new UserService();
