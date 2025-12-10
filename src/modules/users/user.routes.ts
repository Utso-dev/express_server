import express from 'express';
import auth from '../../Middleware/auth';
import { userController } from './user.controller';

const router = express.Router();
// user routes would be defined here

router.post('/', userController.createUser);
router.get('/', auth('admin'), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.getUserUpdateById);
router.delete('/:id', userController.deleteUserById);

export const userRouters = router;
