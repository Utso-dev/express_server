import { Pool } from 'pg';
import config from './config';
export const pool = new Pool({
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

export default initDB;