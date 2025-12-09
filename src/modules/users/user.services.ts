import e from "express";
import { pool } from "../../config/db";

export type UserBody = {
    name: string;
    email: string;
    age: number;
    phone: string;
    adress: string;
}
type SingleUser = {
    name: string;
    email: string;
    age: number;
    phone: string;
    adress: string;
}


const createUsersDB = async (body: UserBody) => {
    const {name, email, age, phone, adress} = body;
    const result = await pool.query(
      'INSERT INTO users (name, email, age, phone, adress) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, age, phone, adress]
    );  

    return result;
}

const getAllUsersDB = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result;
}

const getUserByIdDB = async (id: string | undefined ) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result;
}

const updateUserByIdDB = async (id: string | undefined, body: Promise<SingleUser>) => {
    const {name, email, age, phone, adress}: SingleUser = await body;
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, age = $3, phone = $4, adress = $5 WHERE id = $6 RETURNING *',
        [name, email, age, phone, adress, id]
    )
    return result;
}

export const userServices = {
    createUsersDB, getAllUsersDB, getUserByIdDB,
    updateUserByIdDB
};