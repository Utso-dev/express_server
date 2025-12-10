import express from 'express';
import { userController } from './user.controller';

const router = express.Router();
// user routes would be defined here

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.getUserUpdateById);
router.delete('/:id', userController.deleteUserById);

export const userRouters = router;
