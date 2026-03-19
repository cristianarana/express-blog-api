import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const userController = new UserController();

router.post("/create", authMiddleware, userController.create);
router.get("/", authMiddleware, userController.findByEmail);
router.patch("/update", authMiddleware, userController.update);
router.post("/delete", authMiddleware, userController.delete);


export default router;