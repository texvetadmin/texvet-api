import express from 'express';
import EmailController from '../../../controllers/EmailController';

const router = express.Router();

router.post('/send-email', EmailController.sendEmail);

export default router;
