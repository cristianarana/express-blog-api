import { Router } from "express";
import { PostController } from "../controllers/post.controller";


const router = Router();
const postController = new PostController();
router.post("/", postController.create);
router.patch("/", postController.update);
router.get("/user/:userId", postController.getPostsByUserId);


export default router;