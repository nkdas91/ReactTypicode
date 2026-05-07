import axios, { AxiosError } from "axios";
import type { User } from "../types/User";

interface APIResponse<T> {
  data?: T;
  error?: AxiosError | string;
}

export const deleteUser = async (
  id: number | null,
): Promise<APIResponse<User>> => {
  if (!id) return { error: "Id is missing." };

  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    if (res.status === 200) {
      return { data: res.data };
    } else {
      return { error: "Invalid response from the API" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error };
    }

    return { error: "Unexpected error occurred" };
  }
};

export const updateUser = async (
  id: number | null,
  form: User | null,
): Promise<APIResponse<User>> => {
  if (!id) return { error: "Id is missing." };
  if (!form) return { error: "Form data is missing." };

  try {
    const res = await axios.patch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      form,
    );

    if (res.data) {
      return { data: res.data };
    } else {
      return { error: "Invalid response from the API" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error };
    }

    return { error: "Unexpected error occurred" };
  }
};
