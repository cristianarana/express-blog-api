import { UserRepository } from "../repository/user.repository";
import { AppError } from "../utils/AppError";
import { CreateUserDTO, ResponseUserDTO } from "../models/user.model";


export class UserService {
    private userRepository = new UserRepository();

    async create(data: CreateUserDTO): Promise<ResponseUserDTO> {

    if (!data.email || !data.password || !data.name) {
      throw new AppError("Missing required fields", 400);
    }

    const user = await this.userRepository.create(data);

    const { name, email } = user;

    return { name, email };
  }
}