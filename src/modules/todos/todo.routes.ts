import express from 'express';
import { todoController } from './todo.controller';

const router = express.Router();
// user routes would be defined here

router.post('/', todoController.todoCreate);
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);
export const todosRouters = router;
