 import express, { Request, Response } from 'express';
import config from './config/config';
import  initDB, { pool }  from './config/db';
import { userRouters} from './modules/users/user.routes';
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// initialize database=========
initDB();



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// user crud operations

app.use("/users", userRouters);
app.use("/users/:id", userRouters);


app.delete ("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
   
  try {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [userId]
    )
    if (result.rowCount === 0) {
        res.status(404).json({
          message: "User not found",
          success: false
        });
    }else {
    res.status(201).json({
      message: "User Deleted successfully",
      success: true,
      data: null
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

});

// todo crud operations
app.post("/todos", async (req: Request, res: Response) => {
 const  {user_id, title, description, is_completed} = req.body;

  try {
    const result = await pool.query(
        'INSERT INTO todos (user_id, title, description, is_completed) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, title, description, is_completed]
    )

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

});



app.use((req:Request, res:Response) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
    path: req.path

  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 