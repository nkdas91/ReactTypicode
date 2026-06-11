import { act, renderHook } from "@testing-library/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import useUserFilters from "./useUserFilters";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("useUserFilters", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);
  });

  it("returns default values when params are missing", () => {
    const { result } = renderHook(() => useUserFilters());

    expect(result.current.page).toBe(DEFAULT_PAGE);
    expect(result.current.limit).toBe(DEFAULT_LIMIT);
    expect(result.current.query).toBe("");
  });

  it("reads values from search params", () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({
        page: "3",
        limit: "20",
        name_like: "john",
      }),
      vi.fn(),
    ]);

    const { result } = renderHook(() => useUserFilters());

    expect(result.current.page).toBe(3);
    expect(result.current.limit).toBe(20);
    expect(result.current.query).toBe("john");
  });

  it("updates page", () => {
    const { result } = renderHook(() => useUserFilters());

    act(() => {
      result.current.setPage(2);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/users?page=2");
  });

  it("updates limit and resets page", () => {
    const { result } = renderHook(() => useUserFilters());

    act(() => {
      result.current.setLimit("25");
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/users?limit=25&page=${DEFAULT_PAGE}`,
    );
  });

  it("updates search query", () => {
    const { result } = renderHook(() => useUserFilters());

    act(() => {
      result.current.setQuery("alice");
    });

    expect(mockNavigate).toHaveBeenCalledWith("/users?name_like=alice");
  });

  it("removes query param when search is cleared", () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({
        name_like: "john",
      }),
      vi.fn(),
    ]);

    const { result } = renderHook(() => useUserFilters());

    act(() => {
      result.current.setQuery("");
    });

    expect(mockNavigate).toHaveBeenCalledWith("/users?");
  });
});
