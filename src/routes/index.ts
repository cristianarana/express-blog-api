import { AppError } from "../utils/AppError";
import { Router, Request, Response, NextFunction } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import authRoutes from "./auth.routes";

const router = Router();
router.get("/test-error", 
    (_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Test error", 400));
})
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/auth", authRoutes)
export default router;