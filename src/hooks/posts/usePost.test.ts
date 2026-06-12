import {
  useQuery,
  type QueryFunctionContext,
  type UseQueryResult,
} from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QUERY_KEYS } from "../../constants/queryKeys";
import type { ApiError } from "../../errors/ApiError";
import postService from "../../services/postService";
import type { Post } from "../../types/Post";
import usePost from "./usePost";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../services/postService", () => ({
  default: {
    get: vi.fn(),
  },
}));

type PostQueryFn = (
  ctx: QueryFunctionContext<ReturnType<typeof QUERY_KEYS.post>>,
) => Promise<Post>;

function getQueryFn() {
  const call = vi.mocked(useQuery).mock.calls[0]?.[0];

  if (!call?.queryFn) {
    throw new Error("useQuery was not called with queryFn");
  }

  return call.queryFn as PostQueryFn;
}

describe("usePost", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<Post, ApiError>);
  });

  it("configures React Query with correct options", () => {
    usePost(5);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.post(5),
        enabled: true,
      }),
    );
  });

  it("disables query when post id is null", () => {
    usePost(null);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.post(0),
        enabled: false,
      }),
    );
  });

  it("calls postService.get inside queryFn (success case)", async ({
    expect,
  }) => {
    usePost(5);

    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<Post, ApiError>);

    const queryFn = getQueryFn();

    const signal = new AbortController().signal;

    await queryFn({
      signal,
      queryKey: QUERY_KEYS.post(5),
    } as Parameters<typeof queryFn>[0]);

    expect(postService.get).toHaveBeenCalledWith(5, { signal });
  });

  it("throws error when id is null in queryFn", async ({ expect }) => {
    usePost(null);

    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<ApiError>);

    const queryFn = getQueryFn();

    expect(() => {
      queryFn({
        signal: new AbortController().signal,
      } as Parameters<typeof queryFn>[0]);
    }).toThrow("Post ID is required");
  });
});
