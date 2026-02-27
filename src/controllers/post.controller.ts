import { PostService } from "../services/post.service";

export class PostController{
    private postService = new PostService();
    
    create  = async (req: any, res: any, next: any) => {
        try {
            const post = await this.postService.create(req.body);
            res.status(201).json(post);
        } catch (error) {
            console.error("Unexpected error:", error);
            next(error);
        }
    };

    update = async (req: any, res: any, next: any) => {
        try {
            const post = await this.postService.updatePost(req.body);
            res.status(200).json(post);
        } catch (error) {
            console.error("Unexpected error:", error);
            next(error);
        }
    };

    getPostsByUserId = async (req: any, res: any, next: any) => {
        try {
            const userId = parseInt(req.params.userId, 10);
            const posts = await this.postService.getPostByUserId(userId);
            res.status(200).json(posts);
        } catch (error) {
            console.error("Unexpected error:", error);
            next(error);
        }
        };
}