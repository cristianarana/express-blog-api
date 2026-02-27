import pool from "../config/db";
import { CreatePostDTO, ResponsePostDTO, UpdatePostDTO } from "../models/post.model";

export class PostRepository{
    async create(data: CreatePostDTO): Promise<ResponsePostDTO>{
        const result = await pool.query(
            "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, user_id",
            [data.title, data.content, data.user_id]
        )
        return result.rows[0];
    }

    async findPostsByUserId(userId: number): Promise<ResponsePostDTO[]>{
        const result = await pool.query(
            "SELECT id, title, content, user_id FROM posts WHERE user_id = $1",
            [userId]
        )
        return result.rows;
    }

    async updatePost(dataPost: UpdatePostDTO): Promise<ResponsePostDTO>{
        const result = await pool.query(
            "UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING title, content",
            [dataPost.title, dataPost.content, dataPost.id]
        )
        return result.rows[0];
    }

    async findPostById(postId: number): Promise<ResponsePostDTO | null>{
        const result = await pool.query(
            "SELECT id, title, content, user_id FROM posts WHERE id = $1",
            [postId]
        )
        return result.rows[0] || null;
    }
}