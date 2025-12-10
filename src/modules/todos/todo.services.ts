import { pool } from "../../config/db";

const todoCreateDB = async ( body: any) => {
    const  {user_id, title, description, is_completed} =body;
    const result = await pool.query(
        'INSERT INTO todos (user_id, title, description, is_completed) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, title, description, is_completed]
    );
    return result;
}

export const todoServices = {
    todoCreateDB
};