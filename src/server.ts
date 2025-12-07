 import express, { Request, Response } from 'express';
import {Pool} from "pg"
import config from './config/config';
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

app.post("/", (req: Request, res: Response) => {
  console.log("check req", req?.body);

  res.status(201).json({
    message: "Data received successfully",
    success: true
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 