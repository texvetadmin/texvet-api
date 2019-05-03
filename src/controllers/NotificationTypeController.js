import notificationTypeService from '../services/NotificationTypeService';
import logger from '../utils/logger';
import fail from '../utils/fail';
import { makePaginatedResponse, makeUpdatedResponse } from '../utils/response';

class NotificationTypeController {
  constructor() {
    this.notificationTypeService = notificationTypeService;
  }

  getTypes = async (req, res) => {
    try {
      const [types, itemCount] = await this.notificationTypeService.getTypes(req);
      const response = makePaginatedResponse(req, types, itemCount);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getTypes] Error: ${err}`);
      return fail(res, err);
    }
  };

  getType = async (req, res) => {
    try {
      const type = await this.notificationTypeService.getType(req);
      const response = makePaginatedResponse(req, type);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getType] Error: ${err}`);
      return fail(res, err);
    }
  };

  createType = async (req, res) => {
    try {
      const type = await this.notificationTypeService.createType(req);
      const response = makePaginatedResponse(req, type);

      return res.status(201).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.createType] Error: ${err}`);
      return fail(res, err);
    }
  };

  updateType = async (req, res) => {
    try {
      const source = await this.notificationTypeService.getType(req);
      const updated = await this.notificationTypeService.updateType(req);
      const response = makeUpdatedResponse(source, updated);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.updateType] Error: ${err}`);
      return fail(res, err);
    }
  };

  deleteType = async (req, res) => {
    try {
      const deleted = await this.notificationTypeService.deleteType(req);
      const response = makePaginatedResponse(req, deleted);

      return res.status(204).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.deleteType] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new NotificationTypeController();
