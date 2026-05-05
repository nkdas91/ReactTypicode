import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { apiClient } from "../services/apiService";

const useUser = () => {
  const [data, setData] = useState<User[] | null>();

  useEffect(() => {
    apiClient.get(`/users`).then((res) => setData(res.data));
  }, []);

  return { data };
};

export default useUser;
