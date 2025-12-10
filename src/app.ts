import express, { Request, Response } from 'express';
import config from './config/config';
import initDB from './config/db';
import { todosRouters } from './modules/todos/todo.routes';
import { userRouters } from './modules/users/user.routes';
import { authRouter } from './modules/auth/auth.routes';
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Debug middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// initialize database=========
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// user crud operations
app.use('/users', userRouters);

// todo crud operations
app.use('/todos', todosRouters);

// auth routes can be added here
app.use("/auth",authRouter)

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
    path: req.path,
  });
});

export default app;

