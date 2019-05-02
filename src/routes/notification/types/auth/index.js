import express from 'express';
import NotificationTypeController from '../../../../controllers/NotificationTypeController';

const router = express.Router();

router.post('/', NotificationTypeController.createType);
router.put('/:id', NotificationTypeController.updateType);
router.delete('/:id', NotificationTypeController.deleteType);

export default router;
