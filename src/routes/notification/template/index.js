import express from 'express';
import TemplateController from '../../../controllers/TemplateController';

const router = express.Router();

router.get('/', TemplateController.getTemplates);
router.get('/:id', TemplateController.getTemplate);

export default router;
