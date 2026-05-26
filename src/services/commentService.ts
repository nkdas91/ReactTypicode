import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Comment } from "../types/Comment";
import APIClient from "./apiClient";

const commentService = new APIClient<Comment>(API_ENDPOINTS.comments);

export default {
  getByPost(postId: number) {
    return commentService.getAll({
      params: {
        postId,
      },
    });
  },
};
