import express from 'express';
import FulfillmentController from '../../controllers/FulfillmentController';

const router = express.Router();

router.get('/referrals/:slug', FulfillmentController.getReferralsBySlug);
router.get('/service-lookup/:slug', FulfillmentController.getOrganizationBySlug);

export default router;
