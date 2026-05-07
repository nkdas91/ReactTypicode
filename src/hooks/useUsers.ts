import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { apiClient } from "../services/apiService";

const useUser = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/users`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

export default useUser;
