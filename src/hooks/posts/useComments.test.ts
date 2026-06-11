import {
  useQuery,
  type QueryFunctionContext,
  type UseQueryResult,
} from "@tanstack/react-query";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import commentService from "../../services/commentService";
import useComments from "./useComments";
import type { Comment } from "../../types/Comment";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../services/commentService", () => ({
  default: {
    getByPost: vi.fn(),
  },
}));

type CommentsQueryFn = (
  ctx: QueryFunctionContext<ReturnType<typeof QUERY_KEYS.comments>>,
) => Promise<unknown>;

function getQueryFn() {
  const call = vi.mocked(useQuery).mock.calls[0]?.[0];

  if (!call?.queryFn) {
    throw new Error("useQuery was not called with queryFn");
  }

  return call.queryFn as CommentsQueryFn;
}

describe("useComments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<Comment>);
  });

  it("configures React Query with the correct options", () => {
    useComments(5);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.comments(5),
        enabled: true,
        staleTime: DEFAULT_STALE_TIME,
      }),
    );
  });

  it("disables the query when post id is invalid", () => {
    useComments(0);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      }),
    );
  });

  it("calls commentService.getByPost inside queryFn (success case)", async ({
    expect,
  }) => {
    useComments(5);

    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<unknown, Error>);

    const queryFn = getQueryFn();

    const signal = new AbortController().signal;

    await queryFn({
      signal,
      queryKey: QUERY_KEYS.comments(5),
    } as Parameters<typeof queryFn>[0]);

    expect(commentService.getByPost).toHaveBeenCalledWith(5, { signal });
  });

  it("still calls service even if id is valid but queryFn executes manually", async ({
    expect,
  }) => {
    useComments(10);

    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<Comment>);

    const queryFn = getQueryFn();

    const signal = new AbortController().signal;

    await queryFn({
      signal,
      queryKey: QUERY_KEYS.comments(10),
    } as Parameters<typeof queryFn>[0]);

    expect(commentService.getByPost).toHaveBeenCalledWith(10, { signal });
  });
});
