import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import { QUERY_KEYS } from "../../constants/queryKeys";
import usePosts from "./usePosts";

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

describe("usePosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses default pagination values", () => {
    usePosts();

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.posts(
          DEFAULT_PAGE,
          DEFAULT_LIMIT,
          undefined,
          undefined,
          undefined,
        ),
        placeholderData: keepPreviousData,
      }),
    );
  });

  it("uses search query key when searching", () => {
    usePosts({
      query: "react",
    });

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.postsSearch(
          DEFAULT_PAGE,
          DEFAULT_LIMIT,
          undefined,
          "react",
          undefined,
          undefined,
        ),
      }),
    );
  });

  it("includes user filter in query key", () => {
    usePosts({
      userId: "5",
    });

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.posts(
          DEFAULT_PAGE,
          DEFAULT_LIMIT,
          "5",
          undefined,
          undefined,
        ),
      }),
    );
  });

  it("includes favourites filter in query key", () => {
    usePosts({
      showFavourites: true,
      favourites: [1, 2, 3],
    });

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.posts(
          DEFAULT_PAGE,
          DEFAULT_LIMIT,
          undefined,
          true,
          [1, 2, 3],
        ),
      }),
    );
  });
});
