export interface Comment{
    id: number;
    content: string;
    post_id: number;
    user_id: number;
    created_at: Date;
}

export type CreateCommentDTO = Omit<Comment, "id" | "created_at">;
export type UpdateCommentDTO = Omit<Comment, "user_id" | "created_at">;
export type ResponseCommentDTO = Omit<Comment, "user_id" | "created_at" | "id">;