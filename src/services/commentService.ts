import type { AxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Comment } from "../types/Comment";
import APIClient from "./apiClient";

// Create API client for comment endpoints
const commentService = new APIClient<Comment>(API_ENDPOINTS.comments);

export default {
  // Fetch comments belonging to a specific post
  getByPost(postId: number, config?: AxiosRequestConfig) {
    return commentService.getAll({
      ...config,

      // Send postId as query parameter
      params: {
        postId,
      },
    });
  },
};
