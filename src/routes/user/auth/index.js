import express from 'express';
import UserController from '../../../controllers/UserController';

const router = express.Router();

router.put('/:id', UserController.updateUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);

export default router;
