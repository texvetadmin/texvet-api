/**
 * User controller
 */
import fail from '../utils/fail';
import logger from '../utils/logger';
import userService from '../services/UserService';
import { makeUpdatedResponse, makePaginatedResponse } from '../utils/response';

class UserController {
  constructor() {
    this.userService = userService;
  }

  getUsers = async (req, res) => {
    try {
      const [users, itemCount] = await this.userService.getUsers(req);
      const response = makePaginatedResponse(req, users, itemCount);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getUsers] Error: ${err}`);
      return fail(res, err);
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await this.userService.getUser(req);
      const response = makePaginatedResponse(req, user);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getUser] Error: ${err}`);
      return fail(res, err);
    }
  };

  createUser = async (req, res) => {
    try {
      const user = await this.userService.createUser(req);
      const response = makePaginatedResponse(req, user);

      return res.status(201).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.createUser] Error: ${err}`);
      return fail(res, err);
    }
  };

  updateUser = async (req, res) => {
    try {
      const source = await this.userService.getUser(req);
      const updated = await this.userService.updateUser(req);
      const response = makeUpdatedResponse(source, updated);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.updateUser] Error: ${err}`);
      return fail(res, err);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const deleted = await this.userService.deleteUser(req);
      const response = makePaginatedResponse(req, deleted);
      
      return res.status(204).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.updateUser] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new UserController();
