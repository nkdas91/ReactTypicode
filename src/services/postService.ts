import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Post } from "../types/Post";
import APIClient from "./apiClient";

/**
 * API service for post-related operations.
 *
 * Inherits standard CRUD functionality from APIClient:
 * - getAll
 * - get
 * - post
 * - put
 * - patch
 * - delete
 */
const postService = new APIClient<Post>(API_ENDPOINTS.posts);

export default postService;
