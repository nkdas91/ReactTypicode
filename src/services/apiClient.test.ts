import { beforeEach, describe, expect, it, vi } from "vitest";
import { axiosInstance } from "../config/axios";
import APIClient from "./apiClient";

vi.mock("../config/axios", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

interface TestUser {
  id: number;
  name: string;
}

describe("APIClient", () => {
  let apiClient: APIClient<TestUser>;

  beforeEach(() => {
    apiClient = new APIClient<TestUser>("/users");

    vi.clearAllMocks();
  });

  describe("getAll", () => {
    it("should fetch all records and return data with total count", async () => {
      vi.mocked(axiosInstance.get).mockResolvedValue({
        data: [
          {
            id: 1,
            name: "John",
          },
        ],
        headers: {
          "x-total-count": "1",
        },
      });

      const result = await apiClient.getAll();

      expect(axiosInstance.get).toHaveBeenCalledWith("/users", undefined);

      expect(result).toEqual({
        data: [
          {
            id: 1,
            name: "John",
          },
        ],
        total: 1,
      });
    });

    it("should return total as zero when header is missing", async () => {
      vi.mocked(axiosInstance.get).mockResolvedValue({
        data: [],
        headers: {},
      });

      const result = await apiClient.getAll();

      expect(result).toEqual({
        data: [],
        total: 0,
      });
    });

    it("should pass request config to axios", async () => {
      const config = {
        signal: new AbortController().signal,
      };

      vi.mocked(axiosInstance.get).mockResolvedValue({
        data: [],
        headers: {},
      });

      await apiClient.getAll(config);

      expect(axiosInstance.get).toHaveBeenCalledWith("/users", config);
    });
  });

  describe("get", () => {
    it("should fetch a single record by id", async () => {
      const user = {
        id: 1,
        name: "John",
      };

      vi.mocked(axiosInstance.get).mockResolvedValue({
        data: user,
      });

      const result = await apiClient.get(1);

      expect(axiosInstance.get).toHaveBeenCalledWith("/users/1", undefined);

      expect(result).toEqual(user);
    });
  });

  describe("post", () => {
    it("should create a new record", async () => {
      const payload = {
        name: "John",
      };

      const response = {
        id: 1,
        name: "John",
      };

      vi.mocked(axiosInstance.post).mockResolvedValue({
        data: response,
      });

      const result = await apiClient.post(payload);

      expect(axiosInstance.post).toHaveBeenCalledWith(
        "/users",
        payload,
        undefined,
      );

      expect(result).toEqual(response);
    });
  });

  describe("put", () => {
    it("should replace an existing record", async () => {
      const payload = {
        name: "Updated John",
      };

      const response = {
        id: 1,
        name: "Updated John",
      };

      vi.mocked(axiosInstance.put).mockResolvedValue({
        data: response,
      });

      const result = await apiClient.put(1, payload);

      expect(axiosInstance.put).toHaveBeenCalledWith(
        "/users/1",
        payload,
        undefined,
      );

      expect(result).toEqual(response);
    });
  });

  describe("patch", () => {
    it("should partially update a record", async () => {
      const payload = {
        name: "Updated John",
      };

      const response = {
        id: 1,
        name: "Updated John",
      };

      vi.mocked(axiosInstance.patch).mockResolvedValue({
        data: response,
      });

      const result = await apiClient.patch(1, payload);

      expect(axiosInstance.patch).toHaveBeenCalledWith(
        "/users/1",
        payload,
        undefined,
      );

      expect(result).toEqual(response);
    });
  });

  describe("delete", () => {
    it("should delete a record", async () => {
      vi.mocked(axiosInstance.delete).mockResolvedValue({});

      await apiClient.delete(1);

      expect(axiosInstance.delete).toHaveBeenCalledWith("/users/1", undefined);
    });

    it("should pass request config when deleting", async () => {
      const config = {
        timeout: 5000,
      };

      vi.mocked(axiosInstance.delete).mockResolvedValue({});

      await apiClient.delete(1, config);

      expect(axiosInstance.delete).toHaveBeenCalledWith("/users/1", config);
    });
  });
});
