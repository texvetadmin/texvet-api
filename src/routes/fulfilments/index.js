import express from 'express';
import FulfillmentController from '../../../controllers/FulfillmentController';

const router = express.Router();

router.post('/static-resources/:slug', FulfillmentController.sendEmail);

export default router;
