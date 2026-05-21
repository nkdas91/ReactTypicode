import axios, { AxiosError } from "axios";

type EmptyObject = Record<string, never>;

interface APIResponse<T> {
  data?: T;
  error?: AxiosError | string;
}

export const deletePost = async (
  id: number | null,
): Promise<APIResponse<EmptyObject>> => {
  if (!id) return { error: "Id is missing." };

  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    return { data: res.data };
  } catch (err) {
    const error = err as AxiosError;

    return {
      error: error.message,
    };
  }
};
