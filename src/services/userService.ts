import axios, { AxiosError } from "axios";

interface APIResponse {
  data?: {};
  error?: AxiosError | string;
}

export const deleteUser = async (id: number | null): Promise<APIResponse> => {
  if (!id) return { error: "Id is missing." };

  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    return { data: res.data };
  } catch (err) {
    const error = err as AxiosError;

    return {
      error: error.message,
    };
  }
};
