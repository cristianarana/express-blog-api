import pool from "../config/db";
import { CreateCommentDTO, ResponseCommentDTO, UpdateCommentDTO } from "../models/comment.model";

export class CommentRepository{
    async create (commentData: CreateCommentDTO): Promise<ResponseCommentDTO> {
    const result = await pool.query(
        'INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING content, post_id',
        [commentData.content, commentData.post_id, commentData.user_id]
    );
    return result.rows[0];
    }

    async findCommentsByPostId(postId: number): Promise<ResponseCommentDTO[]> {
        const result = await pool.query(
            'SELECT content, post_id FROM comments WHERE post_id = $1',
            [postId]
        );
        return result.rows;
    }

    async updateComment(commentData: UpdateCommentDTO): Promise<ResponseCommentDTO> {
        const result = await pool.query(
            'UPDATE comments SET content = $1 WHERE id = $2 RETURNING content',
            [commentData.content, commentData.id]
        );
        return result.rows[0];
    }
}