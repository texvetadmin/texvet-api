import express from 'express';
import FulfillmentController from '../../controllers/FulfillmentController';

const router = express.Router();

router.get('/static-resources/:slug', FulfillmentController.getStaticResourcesBySlug);

export default router;
