import { useEffect, useState } from "react";
import { apiClient } from "../services/apiService";
import type { Comment } from "../types/Comment";

const useComments = (id: number) => {
  const [data, setData] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
  };
};

export default useComments;
