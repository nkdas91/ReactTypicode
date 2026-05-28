import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../config/axios";
import type { APIListResponse } from "../types/APIListResponse";

class APIClient<T> {
  // API endpoint for this resource
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Fetch all records
  getAll = async (config?: AxiosRequestConfig): Promise<APIListResponse<T>> => {
    const response = await axiosInstance.get<T[]>(this.endpoint, config);

    // Read total count from response headers
    const totalHeader = response.headers["x-total-count"];

    return {
      data: response.data,
      total: totalHeader ? Number(totalHeader) : 0,
    };
  };

  // Fetch a single record by ID
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

  // Create a new record
  post = async (data: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(this.endpoint, data, config);

    return response.data;
  };

  // Replace an existing record
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

  // Update part of an existing record
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

  // Delete a record by ID
  delete = async (
    id: number | string,
    config?: AxiosRequestConfig,
  ): Promise<void> => {
    await axiosInstance.delete(`${this.endpoint}/${id}`, config);
  };
}

export default APIClient;
