import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Post } from "../types/Post";
import APIClient from "./apiClient";

const postService = new APIClient<Post>(API_ENDPOINTS.posts);

export default postService;
