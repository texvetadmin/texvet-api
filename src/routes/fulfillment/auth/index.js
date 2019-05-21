import express from 'express';
import FulfillmentController from '../../../controllers/FulfillmentController';
import EmailController from '../../../controllers/EmailController';

const router = express.Router();

router.post('/send-email', EmailController.sendEmail);
router.post('/dialogflow-webhook', FulfillmentController.createHistoryMessage);

export default router;
