import type { User } from "../types/User";
import APIClient from "./apiClient";

const userService = new APIClient<User>("/users");

export default userService;
