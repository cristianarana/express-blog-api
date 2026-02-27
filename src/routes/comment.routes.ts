import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";


const router = Router();
const commentController = new CommentController();

router.post("/create", commentController.create);
router.get("/post/:postId", commentController.getCommentsByPostId);
router.patch("/update", commentController.update);
export default router;