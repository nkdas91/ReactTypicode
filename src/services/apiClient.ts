import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../config/axios";
import type { APIListResponse } from "../types/APIListResponse";

/**
 * Generic API client for performing CRUD operations against a resource endpoint.
 *
 * Provides reusable methods for:
 * - fetching collections
 * - fetching single records
 * - creating records
 * - replacing records
 * - partially updating records
 * - deleting records
 *
 * @template T Resource type handled by the client
 */
class APIClient<T> {
  /**
   * API endpoint associated with this resource.
   */
  private endpoint: string;

  /**
   * Creates a new API client instance.
   *
   * @param {string} endpoint - Resource endpoint (e.g. "/posts")
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Fetches all records from the resource endpoint.
   *
   * Reads the total record count from the `x-total-count`
   * response header when available.
   *
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
   * @returns {Promise<APIListResponse<T>>} Collection response with data and total count
   */
  getAll = async (config?: AxiosRequestConfig): Promise<APIListResponse<T>> => {
    const response = await axiosInstance.get<T[]>(this.endpoint, config);

    /**
     * Total record count returned by the API.
     */
    const totalHeader = response.headers["x-total-count"];

    return {
      data: response.data,
      total: totalHeader ? Number(totalHeader) : 0,
    };
  };

  /**
   * Fetches a single record by ID.
   *
   * @param {number | string} id - Resource identifier
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
   * @returns {Promise<T>} Retrieved resource
   */
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

  /**
   * Creates a new record.
   *
   * @param {Partial<T>} data - Resource data to create
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
   * @returns {Promise<T>} Created resource
   */
  post = async (data: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(this.endpoint, data, config);

    return response.data;
  };

  /**
   * Replaces an existing record.
   *
   * Performs a full resource update using HTTP PUT.
   *
   * @param {number | string} id - Resource identifier
   * @param {Partial<T>} data - Replacement resource data
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
   * @returns {Promise<T>} Updated resource
   */
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

  /**
   * Partially updates an existing record.
   *
   * Performs a partial resource update using HTTP PATCH.
   *
   * @param {number | string} id - Resource identifier
   * @param {Partial<T>} data - Fields to update
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
   * @returns {Promise<T>} Updated resource
   */
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

  /**
   * Deletes a record by ID.
   *
   * @param {number | string} id - Resource identifier
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
   * @returns {Promise<void>}
   */
  delete = async (
    id: number | string,
    config?: AxiosRequestConfig,
  ): Promise<void> => {
    await axiosInstance.delete(`${this.endpoint}/${id}`, config);
  };
}

export default APIClient;
