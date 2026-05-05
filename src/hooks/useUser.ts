import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { apiClient } from "../services/apiService";

const useUser = (id?: number | null) => {
  const [data, setData] = useState<User | null>();

  useEffect(() => {
    apiClient.get(`/users/${id ?? ""}`).then((res) => setData(res.data));
  }, [id]);

  return { data };
};

export default useUser;
