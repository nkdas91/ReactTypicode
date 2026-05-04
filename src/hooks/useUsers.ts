import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../types/User";

const useUser = () => {
  const [data, setData] = useState<User[] | null>();

  useEffect(() => {
    axios
      .create({
        baseURL: "https://jsonplaceholder.typicode.com",
      })
      .get(`/users`)
      .then((res) => setData(res.data));
  }, []);

  return { data };
};

export default useUser;
