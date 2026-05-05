import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import { apiClient } from "../services/apiService";

const useUser = () => {
  const [data, setData] = useState<Post[] | null>();

  useEffect(() => {
    apiClient.get(`/posts`).then((res) => setData(res.data));
  }, []);

  return { data };
};

export default useUser;
