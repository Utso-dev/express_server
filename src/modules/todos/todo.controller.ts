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

const getAllTodos = async (req: Request, res: Response) => {
    try {   
        const result = await  todoServices.getAllTodosDB();
        res.status(200).json({
            message: 'Todos Retrieved successfully',
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Internal Server Error',
            success: false, 
            details: error
        });
        return;
    }
};

const getTodoById = async (req: Request, res: Response) => {
    const todoId = req.params.id;
    try {
        const result = await todoServices.getTodoByIdDB(todoId);
        if (result.rows.length === 0) { 
            res.status(404).json({
                message: 'Todo not found',
                success: false
            });
        } else {
            res.status(200).json({
                message: 'Single Todo Retrieved successfully',  
                success: true,
                data: result.rows[0]
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Internal Server Error',
            success: false,
            details: error
        });
        return;
    }
};

const updateTodoById = async (req: Request, res: Response) => {
    const todoId = req.params.id;   
    try {
        const result = await todoServices.updateTodoByIdDB(todoId, req.body);
        if (result.rows.length === 0) {
            res.status(404).json({
                message: 'Todo not found',
                success: false
            });
        }       
        else {
            res.status(200).json({
                message: 'Todo Updated successfully',       
                success: true,
                data: result.rows[0]
            });
        }       
    } catch (error) {   
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Internal Server Error',
            success: false, 
            details: error
        });
        return;
    }   
};

const deleteTodoById = async (req: Request, res: Response) => {
    const todoId = req.params.id;
    try {
        const result = await todoServices.deleteTodoByIdDB(todoId);
        if (result.rows.length === 0) {     
            res.status(404).json({
                message: 'Todo not found',
                success: false
            });
        } else {
            res.status(200).json({
                message: 'Todo Deleted successfully',
                success: true,
                data: result.rows[0]
            });
        }   
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Internal Server Error',  
            success: false,
            details: error
        });
        return;
    }   
};

export const todoController = {
    todoCreate,
    getAllTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById
};