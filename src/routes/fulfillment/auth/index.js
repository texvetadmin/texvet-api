import express from 'express';
import EmailController from '../../../controllers/EmailController';
import FulfillmentController from '../../../controllers/FulfillmentController';

const router = express.Router();

router.post('/send-email', EmailController.sendEmail);
router.get('/close-the-loop', FulfillmentController.getResourcesBySlug);

export default router;
