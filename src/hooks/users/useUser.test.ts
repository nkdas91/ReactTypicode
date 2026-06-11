import { useQuery } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import useUser from "./useUser";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../services/userService", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("useUser", () => {
  it("configures query correctly for a valid user id", () => {
    useUser(5);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.user(5),
        enabled: true,
        staleTime: DEFAULT_STALE_TIME,
      }),
    );
  });

  it("disables query when user id is null", () => {
    useUser(null);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.user(0),
        enabled: false,
      }),
    );
  });
});
