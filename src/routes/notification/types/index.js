import express from 'express';
import NotificationTypeController from '../../../controllers/NotificationTypeController';

const router = express.Router();

router.get('/', NotificationTypeController.getTypes);
router.get('/:id', NotificationTypeController.getType);

export default router;
