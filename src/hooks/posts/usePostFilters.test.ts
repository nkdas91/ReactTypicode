import { act, renderHook } from "@testing-library/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import usePostFilters from "./usePostFilters";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("usePostFilters", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ] as never);
  });

  it("returns default values when url params are empty", () => {
    const { result } = renderHook(() => usePostFilters());

    expect(result.current.userId).toBe("");
    expect(result.current.query).toBe("");
    expect(result.current.showFavourites).toBe(false);
    expect(result.current.page).toBe(DEFAULT_PAGE);
    expect(result.current.limit).toBe(DEFAULT_LIMIT);
  });

  it("reads values from search params", () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(
        "userId=5&title_like=test&page=2&limit=20&showFavourites=true",
      ),
      vi.fn(),
    ] as never);

    const { result } = renderHook(() => usePostFilters());

    expect(result.current.userId).toBe("5");
    expect(result.current.query).toBe("test");
    expect(result.current.page).toBe(2);
    expect(result.current.limit).toBe(20);
    expect(result.current.showFavourites).toBe(true);
  });

  it("updates user filter and resets page", () => {
    const { result } = renderHook(() => usePostFilters());

    act(() => {
      result.current.setUserId("10");
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/posts?userId=10&page=${DEFAULT_PAGE}`,
    );
  });

  it("updates page", () => {
    const { result } = renderHook(() => usePostFilters());

    act(() => {
      result.current.setPage(3);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/posts?page=3");
  });

  it("updates query and resets page when query changes", () => {
    const { result } = renderHook(() => usePostFilters());

    act(() => {
      result.current.setQuery("react");
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/posts?title_like=react&page=${DEFAULT_PAGE}`,
    );
  });
});
