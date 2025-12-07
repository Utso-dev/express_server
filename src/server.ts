 import express, { Request, Response } from 'express';
import {Pool} from "pg"
import config from './config/config';
import e from 'express';
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const pool = new Pool({
  connectionString: config.connection_db
});

const initDB = async () => {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        adress VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`
    )

    await pool.query(
        `CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        due_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )

    `)
}

initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// user crud operations

app.post("/users", async (req: Request, res: Response) => {
 const  {name, email, age, phone, adress} = req.body;

  try {
    const result = await pool.query(
        'INSERT INTO users (name, email, age, phone, adress) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, age, phone, adress]
    )

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

});
app.get("/users", async (req: Request, res: Response) => {

  try {
    const result = await pool.query(
        'SELECT * FROM users'
    )

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

});
app.get("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
  try {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [userId]
    )
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

});
app.put ("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const {name, email, age, phone, adress} = req.body;
  try {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, age = $3, phone = $4, adress = $5 WHERE id = $6 RETURNING *',
        [name, email, age, phone, adress, userId]
    )
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

});
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

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 