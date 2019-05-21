import express from 'express';
import FollowUpController from '../../../controllers/FollowUpController';

const router = express.Router();

router.post('/', FollowUpController.createFollowUp);
router.put('/:id', FollowUpController.updateFollowUp);
router.delete('/:id', FollowUpController.deleteFollowUp);

export default router;
