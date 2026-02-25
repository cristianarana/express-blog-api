export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export type CreateUserDTO = Omit<User, "id" | "createdAt">;
export type ResponseUserDTO = Omit<User, "id" |  "password">;