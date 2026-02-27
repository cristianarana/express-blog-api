import { CommentService } from "../services/comment.service";

export class CommentController {
    private commentService = new CommentService();

    create = async (req: any, res: any, next: any) => {
        try {
            const comment = await this.commentService.create(req.body);
            res.status(201).json(comment);
        } catch (error) {
            console.error("Unexpected error:", error);
            next(error);
        }
    };

    getCommentsByPostId = async (req: any, res: any, next: any) => {
        try {
            const postId = parseInt(req.params.postId, 10);
            const comments = await this.commentService.getCommentsByPostId(postId);
            res.status(200).json(comments);
        } catch (error) {
            console.error("Unexpected error:", error);
            next(error);
        }
    };

    update = async (req: any, res: any, next: any) => {
        try {
            const comment = await this.commentService.updateComment(req.body);
            res.status(200).json(comment);
        } catch (error) {
            console.error("Unexpected error:", error);
            next(error);
        }
    };
}