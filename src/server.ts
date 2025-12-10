import express, { Request, Response } from 'express';
import config from './config/config';
import initDB from './config/db';
import { todosRouters } from './modules/todos/todo.routes';
import { userRouters } from './modules/users/user.routes';
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// initialize database=========
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// user crud operations

app.use('/users', userRouters);

// todo crud operations
app.use('/todos', todosRouters);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
    path: req.path,
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
