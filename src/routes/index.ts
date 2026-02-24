import { AppError } from "../utils/AppError";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
router.get("/test-error", 
    (_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Test error", 400));
})

export default router;