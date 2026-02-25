import { AppError } from "../utils/AppError";
import { Router, Request, Response, NextFunction } from "express";
import userRoutes from "./user.routes";

const router = Router();
router.get("/test-error", 
    (_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Test error", 400));
})
router.use("/users", userRoutes);

export default router;