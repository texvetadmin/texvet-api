import followUpService from '../services/FollowUpService';
import logger from '../utils/logger';
import fail from '../utils/fail';
import { makePaginatedResponse, makeUpdatedResponse } from '../utils/response';

class FollowUpController {
  constructor() {
    this.followUpService = followUpService;
  }

  getFollowUps = async (req, res) => {
    try {
      const [followUps, itemCount] = await this.followUpService.getFollowUps(req);
      const response = makePaginatedResponse(req, followUps, itemCount);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getFollowUps] Error: ${err}`);
      return fail(res, err);
    }
  };

  getFollowUp = async (req, res) => {
    try {
      const followUp = await this.followUpService.getFollowUp(req);
      const response = makePaginatedResponse(req, followUp);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.getFollowUp] Error: ${err}`);
      return fail(res, err);
    }
  };

  createFollowUp = async (req, res) => {
    try {
      const followUp = await this.followUpService.createFollowUp(req);
      const response = makePaginatedResponse(req, followUp);

      return res.status(201).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.createFollowUp] Error: ${err}`);
      return fail(res, err);
    }
  };

  updateFollowUp = async (req, res) => {
    try {
      const source = await this.followUpService.getFollowUp(req);
      const updated = await this.followUpService.updateFollowUp(req);
      const response = makeUpdatedResponse(source, updated);

      return res.status(200).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.updateFollowUp] Error: ${err}`);
      return fail(res, err);
    }
  };

  deleteFollowUp = async (req, res) => {
    try {
      const deleted = await this.followUpService.deleteFollowUp(req);
      const response = makePaginatedResponse(req, deleted);

      return res.status(204).json(response);
    } catch (err) {
      logger.error(`[${this.constructor.name}.deleteFollowUp] Error: ${err}`);
      return fail(res, err);
    }
  };
}

export default new FollowUpController();
