import type { Post } from "../types/Post";
import APIClient from "./apiClient";

const postService = new APIClient<Post>("/posts");

export default postService;
