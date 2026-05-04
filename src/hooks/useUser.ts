import axios from "axios";
import { useEffect, useState } from "react";

const useUser = <User>() => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    axios
      .create({
        baseURL: "https://jsonplaceholder.typicode.com",
      })
      .get("/users")
      .then((res) => setData(res.data));
  }, []);

  return { data };
};

export default useUser;
