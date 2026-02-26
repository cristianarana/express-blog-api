import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/create", userController.create);
router.get("/", userController.findByEmail);
router.patch("/update", userController.update);
router.post("/delete", userController.delete);


export default router;