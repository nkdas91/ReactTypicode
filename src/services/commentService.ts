import type { Comment } from "../types/Comment";
import APIClient from "./apiClient";

const commentService = new APIClient<Comment>("/comments");

export default {
  getByPost(postId: number) {
    return commentService.getAll({
      params: {
        postId,
      },
    });
  },
};
