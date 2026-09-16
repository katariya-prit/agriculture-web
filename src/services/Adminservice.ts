import { httpClient } from "./httpClient";
import type { User } from "./authService";

export const adminService = {
    getUsers: () => httpClient.get<User[]>("/api/users"),
};