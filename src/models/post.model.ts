export interface Post{
    id: number;
    title: string;
    content: string;
    created_at: Date;
    user_id: number;
}

export type CreatePostDTO = Omit<Post, "id" | "created_at">;
export type UpdatePostDTO = Partial<Post>;
export type ResponsePostDTO = Omit<Post, "user_id" | "created_at" | "id">;
