import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { User } from "../types/User";
import APIClient from "./apiClient";

/**
 * API service for user-related operations.
 *
 * Inherits standard CRUD functionality from APIClient:
 * - getAll
 * - get
 * - post
 * - put
 * - patch
 * - delete
 */
const userService = new APIClient<User>(API_ENDPOINTS.users);

export default userService;
