import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { User } from "../types/User";
import APIClient from "./apiClient";

const userService = new APIClient<User>(API_ENDPOINTS.users);

export default userService;
