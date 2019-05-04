import express from 'express';
import FulfillmentController from '../../controllers/FulfillmentController';

const router = express.Router();

router.get('/referrals/:slug', FulfillmentController.getReferralsBySlug);

export default router;
