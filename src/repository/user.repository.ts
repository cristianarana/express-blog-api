import  pool  from "../config/db";
import { CreateUserDTO, ResponseUserDTO, User } from "../models/user.model";

export class UserRepository {
    async create(userData: CreateUserDTO): Promise<ResponseUserDTO>{
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [userData.name, userData.email, userData.password]
        );
        return result.rows[0];
    }
}