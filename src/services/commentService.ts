import type { AxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Comment } from "../types/Comment";
import APIClient from "./apiClient";

/**
 * API client for comment-related operations.
 */
const commentService = new APIClient<Comment>(API_ENDPOINTS.comments);

/**
 * Comment service.
 *
 * Provides helper methods for working with comments.
 */
export default {
  /**
   * Fetches all comments belonging to a specific post.
   *
   * Sends the post ID as a query parameter and returns a
   * paginated API response containing matching comments.
   *
   * @param {number} postId - Post ID whose comments should be fetched
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
   * @returns {Promise<import("../types/APIListResponse").APIListResponse<Comment>>}
   * Comments associated with the specified post
   */
  getByPost(postId: number, config?: AxiosRequestConfig) {
    return commentService.getAll({
      ...config,

      /**
       * Query parameters sent to the API.
       */
      params: {
        postId,
      },
    });
  },
};
