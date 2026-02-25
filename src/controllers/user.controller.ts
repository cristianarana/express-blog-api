import { UserService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";


export class UserController{
    private userService = new UserService();
    create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Unexpected error:", error);
      next(error);
    }
  };
}