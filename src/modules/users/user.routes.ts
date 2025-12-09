import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import { userController } from './user.controller';

const router = express.Router();
// user routes would be defined here


router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.getUserUpdateById);

export const  userRouters = router;