import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { apiClient } from "../services/apiService";

const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { users, setUsers, loading };
};

export default useUser;
