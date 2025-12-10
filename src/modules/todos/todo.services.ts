import { pool } from "../../config/db";

const todoCreateDB = async ( body: any) => {
    const  {user_id, title, description, is_completed} =body;
    const result = await pool.query(
        'INSERT INTO todos (user_id, title, description, is_completed) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, title, description, is_completed]
    );
    return result;
}

const getAllTodosDB = async () => {
    const result = await pool.query('SELECT * FROM todos');
    return result;
}

const getTodoByIdDB = async (id: string | undefined ) => {
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id])

    return result;
}

const updateTodoByIdDB = async (id: string | undefined, body: any) => {
    const {user_id, title, description, is_completed} = body;
    const result = await pool.query( `UPDATE todos SET user_id = $1, title = $2, description = $3, is_completed = $4 WHERE id = $5 RETURNING *`,
    [user_id, title, description, is_completed, id]
    );
    return result;
}

const deleteTodoByIdDB = async (id: string | undefined) => {
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    return result;
}   



export const todoServices = {
    todoCreateDB,
    getAllTodosDB,
    getTodoByIdDB,
    updateTodoByIdDB,
    deleteTodoByIdDB
};