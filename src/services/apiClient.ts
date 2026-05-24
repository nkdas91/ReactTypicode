import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);

class APIClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig): Promise<T[]> => {
    const response = await axiosInstance.get<T[]>(this.endpoint, config);

    return response.data;
  };

  get = async (
    id: number | string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.get<T>(
      `${this.endpoint}/${id}`,
      config,
    );

    return response.data;
  };

  post = async (data: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(this.endpoint, data, config);

    return response.data;
  };

  put = async (
    id: number | string,
    data: Partial<T>,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.put<T>(
      `${this.endpoint}/${id}`,
      data,
      config,
    );

    return response.data;
  };

  patch = async (
    id: number | string,
    data: Partial<T>,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.patch<T>(
      `${this.endpoint}/${id}`,
      data,
      config,
    );

    return response.data;
  };

  delete = async (
    id: number | string,
    config?: AxiosRequestConfig,
  ): Promise<void> => {
    await axiosInstance.delete(`${this.endpoint}/${id}`, config);
  };
}

export default APIClient;
