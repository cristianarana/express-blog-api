import { CreatePostDTO, Post, ResponsePostDTO } from "../models/post.model";
import { PostRepository } from "../repository/post.repository";
import { AppError } from "../utils/AppError";

export class PostService{
    private postRepository = new PostRepository();
    async create(postData: CreatePostDTO): Promise<ResponsePostDTO>{
        if (!postData.title || !postData.content || !postData.user_id) {
            throw new AppError("Missing required fields", 400);
        }
        return this.postRepository.create(postData);
    }

    async getPostByUserId(userId: number): Promise<ResponsePostDTO[]>{
        return this.postRepository.findPostsByUserId(userId);
    }

    async updatePost(postData: Partial<Post>): Promise<ResponsePostDTO>{
        const existingPost = await this.postRepository.findPostById(postData.id!);
        if (!existingPost) {
            throw new AppError("Post not found", 404);
        }
        return this.postRepository.updatePost(postData);
    }

}