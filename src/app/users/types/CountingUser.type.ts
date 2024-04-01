import { User } from "./User.type";

export interface CountingUser {
    totalUserCount: number,
    users: User[],
}