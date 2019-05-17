import express from 'express';
import FollowUpController from '../../controllers/FollowUpController';

const router = express.Router();

router.get('/', FollowUpController.getFollowUps);
router.get('/:id', FollowUpController.getFollowUp);

export default router;
