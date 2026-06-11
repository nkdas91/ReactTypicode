import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import usePost from "./usePost";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../services/postService", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("usePost", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useQuery).mockReturnValue({} as ReturnType<typeof useQuery>);
  });

  it("configures React Query with the correct options", () => {
    usePost(5);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.post(5),
        enabled: true,
        staleTime: DEFAULT_STALE_TIME,
      }),
    );
  });

  it("disables the query when post id is null", () => {
    usePost(null);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: QUERY_KEYS.post(0),
        enabled: false,
      }),
    );
  });
});
