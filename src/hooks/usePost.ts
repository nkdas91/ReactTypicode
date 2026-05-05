import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import { apiClient } from "../services/apiService";

const usePost = (id?: number | null) => {
  const [data, setData] = useState<Post | null>();

  useEffect(() => {
    apiClient.get(`/posts/${id ?? ""}`).then((res) => setData(res.data));
  }, [id]);

  return { data };
};

export default usePost;
