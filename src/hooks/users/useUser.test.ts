import {
  useQuery,
  type QueryFunctionContext,
  type UseQueryResult,
} from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QUERY_KEYS } from "../../constants/queryKeys";
import type { ApiError } from "../../errors/ApiError";
import userService from "../../services/userService";
import type { User } from "../../types/User";
import useUser from "./useUser";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../services/userService", () => ({
  default: {
    get: vi.fn(),
  },
}));

type UserQueryFn = (
  ctx: QueryFunctionContext<ReturnType<typeof QUERY_KEYS.user>>,
) => Promise<User>;

function getQueryFn() {
  const call = vi.mocked(useQuery).mock.calls[0]?.[0];

  if (!call?.queryFn) {
    throw new Error("useQuery was not called with queryFn");
  }

  return call.queryFn as UserQueryFn;
}

describe("useUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<User, ApiError>);
  });

  it("configures query correctly for a valid user id", () => {
    useUser(5);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.user(5),
        enabled: true,
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

  it("calls userService.get inside queryFn (success case)", async ({
    expect,
  }) => {
    useUser(7);

    vi.mocked(useQuery).mockReturnValue({} as UseQueryResult<User, ApiError>);

    const queryFn = getQueryFn();

    const signal = new AbortController().signal;

    await queryFn({
      signal,
      queryKey: QUERY_KEYS.user(7),
    } as Parameters<typeof queryFn>[0]);

    expect(userService.get).toHaveBeenCalledWith(7, { signal });
  });
});
