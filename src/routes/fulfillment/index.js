import express from 'express';
import FulfillmentController from '../../controllers/FulfillmentController';

const router = express.Router();

router.get('/resources/:slug', FulfillmentController.getStaticResourcesBySlug);
router.get('/services/:slug', FulfillmentController.getOrganizationBySlug);
router.get('/referrals/:slug', FulfillmentController.getReferralsBySlug);

export default router;
