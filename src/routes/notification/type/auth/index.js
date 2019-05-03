import express from 'express';
import NotificationTypeController from '../../../../controllers/NotificationTypeController';

const router = express.Router();

router.post('/auth/v1/notifications/types', NotificationTypeController.createType);
router.put('/auth/v1/notifications/types/:id', NotificationTypeController.updateType);
router.delete('/auth/v1/notifications/types/:id', NotificationTypeController.deleteType);

export default router;
