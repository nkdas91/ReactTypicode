import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../config/axios";
import type { APIListResponse } from "../types/APIListResponse";

class APIClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig): Promise<APIListResponse<T>> => {
    const response = await axiosInstance.get<T[]>(this.endpoint, config);

    const totalHeader = response.headers["x-total-count"];

    return {
      data: response.data,
      total: totalHeader ? Number(totalHeader) : 0,
    };
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
