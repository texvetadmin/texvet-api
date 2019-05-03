import express from 'express';
import NotificationTemplateController from '../../../controllers/NotificationTemplateController';

const router = express.Router();

router.get('/', NotificationTemplateController.getTemplates);
router.get('/:id', NotificationTemplateController.getTemplate);

export default router;
