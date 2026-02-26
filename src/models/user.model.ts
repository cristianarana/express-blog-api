export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export type CreateUserDTO = Omit<User, "id" | "createdAt">;
export type UpdateUserDTO = Partial<CreateUserDTO>;
export type ResponseUserDTO = Omit<User, "id" |  "password">;
export type ResponseSearchUserDTO = Omit<User, "password">;