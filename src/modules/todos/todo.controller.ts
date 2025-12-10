import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoServices } from "./todo.services";

const todoCreate = async (req: Request, res: Response) => {
 

  try {
    const result = await todoServices.todoCreateDB(req.body);

    res.status(201).json({
      message: "Todo created successfully",
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

export const todoController = {
    todoCreate
};