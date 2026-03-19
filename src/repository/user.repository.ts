import  pool  from "../config/db";
import { CreateUserDTO, ResponseUserDTO, User, ResponseSearchUserDTO,ResponseDeleteUserDTO } from "../models/user.model";

export class UserRepository {
    async create(userData: CreateUserDTO): Promise<ResponseUserDTO>{
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [userData.name, userData.email, userData.password]
        );
        return result.rows[0];
    }

    async findByEmail(email: string): Promise<ResponseSearchUserDTO | null> {
        const result = await pool.query(
            'SELECT name, email FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0] || null;
    }

    async updateUser(userData: Partial<User>): Promise<ResponseUserDTO> {
        const result = await pool.query(
            'UPDATE users SET name = COALESCE($1, name), password = COALESCE($3, password) WHERE email = $2 RETURNING name, email',
            [userData.name, userData.email, userData.password]
        );
        return result.rows[0];
    }

    async deleteUser(email: string): Promise<ResponseDeleteUserDTO> {
        const result = await pool.query(
            'UPDATE users SET deletedAt = NOW(), is_active = false WHERE email = $1 RETURNING name, email',
            [email]
        );
        return result.rows[0];
    }

    async findByEmailWithPassword(email: string) {
  const result = await pool.query(
    'SELECT id, name, email, password FROM users WHERE email = $1',
    [email]
  );

  return result.rows[0] || null;
}
}