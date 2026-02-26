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

  findByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.query.email as string;
        const user = await this.userService.findByEmail(email);
        res.json(user);
    } catch (error) {
        console.error("Unexpected error:", error);
        next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userService.updateUser(req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Unexpected error:", error);
      next(error);
    }
  };
}