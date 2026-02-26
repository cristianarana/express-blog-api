export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    is_active: boolean;
    deletedAt: Date
}

export type CreateUserDTO = Omit<User, "id" | "createdAt">;
export type UpdateUserDTO = Partial<CreateUserDTO>;
export type DeleteUserDTO = Partial<User>;
export type ResponseUserDTO = Omit<User, "id" |  "password" | "deletedAt" | "is_active">;
export type ResponseSearchUserDTO = Omit<User, "password" | "deletedAt">;
export type ResponseDeleteUserDTO = Omit<User, "password" | "deletedAt" | "is_active">;