import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { UserRepository } from "../repository/user.repository";
import { CreateUserDTO } from "../models/user.model";

export class AuthService {
  private userRepository = new UserRepository();

  async register(data: CreateUserDTO) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new AppError("Missing required fields", 400);
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        is_active: false,
    });

    return user;
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("Email and password required", 400);
    }

    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}