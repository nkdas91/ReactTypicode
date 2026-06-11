import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useListPageController from "./useListPageController";

vi.mock("../hooks/useDebouncedValue");

describe("useListPageController", () => {
  const mockSetQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes search input from query", () => {
    vi.mocked(useDebouncedValue).mockReturnValue("john");

    const { result } = renderHook(() =>
      useListPageController({
        query: "john",
        setQuery: mockSetQuery,
      }),
    );

    expect(result.current.searchInput).toBe("john");
  });

  it("syncs debounced value to query", () => {
    vi.mocked(useDebouncedValue).mockReturnValue("alice");

    renderHook(() =>
      useListPageController({
        query: "",
        setQuery: mockSetQuery,
      }),
    );

    expect(mockSetQuery).toHaveBeenCalledWith("alice");
  });

  it("updates search input through handleSearch", () => {
    vi.mocked(useDebouncedValue).mockImplementation((value) => value);

    const { result } = renderHook(() =>
      useListPageController({
        query: "",
        setQuery: mockSetQuery,
      }),
    );

    act(() => {
      result.current.handleSearch("search", "react");
    });

    expect(result.current.searchInput).toBe("react");
  });
});
