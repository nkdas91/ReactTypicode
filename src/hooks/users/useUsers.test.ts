import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import { QUERY_KEYS } from "../../constants/queryKeys";
import useUsers from "./useUsers";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-query")>(
    "@tanstack/react-query",
  );

  return {
    ...actual,
    useQuery: vi.fn(),
    keepPreviousData: Symbol("keepPreviousData"),
  };
});

vi.mock("../../services/userService", () => ({
  default: {
    getAll: vi.fn(),
  },
}));

describe("useUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useQuery).mockReturnValue({} as never);
  });

  it("uses default pagination values", () => {
    useUsers();

    const queryOptions = vi.mocked(useQuery).mock.calls[0][0];

    expect(queryOptions.queryKey).toEqual(
      QUERY_KEYS.users(DEFAULT_PAGE, DEFAULT_LIMIT),
    );

    expect(queryOptions.placeholderData).toBe(keepPreviousData);
  });

  it("uses search query key when searching", () => {
    useUsers({
      page: 2,
      limit: 20,
      query: "john",
    });

    const queryOptions = vi.mocked(useQuery).mock.calls[0][0];

    expect(queryOptions.queryKey).toEqual(
      QUERY_KEYS.usersSearch(2, 20, "john"),
    );
  });

  it("ignores blank search queries", () => {
    useUsers({
      query: "   ",
    });

    const queryOptions = vi.mocked(useQuery).mock.calls[0][0];

    expect(queryOptions.queryKey).toEqual(
      QUERY_KEYS.users(DEFAULT_PAGE, DEFAULT_LIMIT),
    );
  });
});
