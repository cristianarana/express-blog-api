import { UserRepository } from "../repository/user.repository";
import { AppError } from "../utils/AppError";
import { CreateUserDTO, ResponseUserDTO, UpdateUserDTO, ResponseDeleteUserDTO } from "../models/user.model";


export class UserService {
    private userRepository = new UserRepository();

    async create(data: CreateUserDTO): Promise<ResponseUserDTO> {

    if (!data.email || !data.password || !data.name) {
      throw new AppError("Missing required fields", 400);
    }

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const user = await this.userRepository.create(data);

    const { name, email } = user;

    return { name, email };
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new AppError("Email is required", 400);
    }
    return this.userRepository.findByEmail(email);
  }

  async updateUser(data:UpdateUserDTO): Promise<ResponseUserDTO> {
    const email = data.email as string;
    const findUser = await this.userRepository.findByEmail(email!);
    
    if (!findUser) {
      throw new AppError("User not found", 404);
    }
    return this.userRepository.updateUser(data);
  }

  async deleteUser(email: string): Promise<ResponseDeleteUserDTO> {
    const findUser = await this.userRepository.findByEmail(email);
    if (!findUser) {
      throw new AppError("User not found", 404);
    }
    const deletedUser = this.userRepository.deleteUser(email)
    return deletedUser;
  }
}