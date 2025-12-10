import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../config/db';
const loginUser = async (email: string, password: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error('User not found');
  }
  const user = result.rows[0];
  const matched = bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email ,name: user.name , role: user.role},
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '7d' }
  );


  return { token, user };
};

export const authServices = {
  loginUser,
};
