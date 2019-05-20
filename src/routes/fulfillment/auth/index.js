import express from 'express';
import EmailController from '../../../controllers/EmailController';
import FulfillmentController from '../../../controllers/FulfillmentController';

const router = express.Router();

router.post('/send-email', EmailController.sendEmail);
router.post('/resource1', FulfillmentController.setResource1);
router.post('/resource2', FulfillmentController.setResource2);

export default router;
