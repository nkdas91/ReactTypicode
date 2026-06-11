import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import useComments from "./useComments";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../services/commentService", () => ({
  default: {
    getByPost: vi.fn(),
  },
}));

describe("useComments", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useQuery).mockReturnValue({} as ReturnType<typeof useQuery>);
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
});
