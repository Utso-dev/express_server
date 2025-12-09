import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import { UserBody, userServices } from './user.services';
// user contrller file

const createUser = async (req: Request, res: Response) => {

  try {
   const result = await userServices.createUsersDB(req.body);

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
      success: false
    });
    return;
  }

}

const getAllUsers = async (req: Request, res: Response) => {

  try {
    const result = await userServices.getAllUsersDB();
    res.status(200).json({
      message: "User Retrieved successfully",
      success: true,
      data: result.rows
    });
    
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
      success: false,
      details: error
    });
    return;
  }

}

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
  try {
    const result = await userServices.getUserByIdDB(userId);
    if (result.rows.length === 0) {
        res.status(404).json({
          message: "User not found",
          success: false
        });
    }else {
    res.status(200).json({
      message: "Single User Retrieved successfully",
      success: true,
      data: result.rows[0]
    });
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
      success: false,
      details: error
    });
    return;
  }

}

const getUserUpdateById = async (req: Request, res: Response) => {
    const userId = req.params.id;
   
  try {
    const result  = await userServices.updateUserByIdDB(userId, req.body );
    if (result.rows.length === 0) {
        res.status(404).json({
          message: "User not found",
          success: false
        });
    }else {
    res.status(201).json({
      message: "User Updated successfully",
      success: true,
      data: result.rows[0]
    });
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
      success: false,
      details: error
    });
    return;
  }

}

export const userController = {
  createUser, getAllUsers ,getUserById,getUserUpdateById
};  
 