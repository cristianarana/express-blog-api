import { CreateCommentDTO, ResponseCommentDTO, UpdateCommentDTO } from "../models/comment.model";
import { CommentRepository } from "../repository/comment.repository";
import { AppError } from "../utils/AppError";

export class CommentService{
    private commentRepository = new CommentRepository();

    async create(commentData: CreateCommentDTO): Promise<ResponseCommentDTO>{
        if (!commentData.content || !commentData.post_id || !commentData.user_id) {
            throw new AppError("Missing required fields", 400);
        }
        return this.commentRepository.create(commentData);
    }

    async getCommentsByPostId(postId: number): Promise<ResponseCommentDTO[]>{
        return this.commentRepository.findCommentsByPostId(postId);
    }

    async updateComment(commentData: UpdateCommentDTO): Promise<ResponseCommentDTO>{
        const existingComment = await this.commentRepository.findCommentsByPostId(commentData.id!);
        if (!existingComment) {
            throw new AppError("Comment not found", 404);
        }
        return this.commentRepository.updateComment(commentData);
    }
}