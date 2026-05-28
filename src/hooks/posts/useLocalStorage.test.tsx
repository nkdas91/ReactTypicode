import { act, renderHook } from "@testing-library/react";

import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage", () => {
  // Clear localStorage before each test
  // to avoid state leaking between tests.
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default value when localStorage is empty", () => {
    // Render the hook with an empty localStorage.
    const { result } = renderHook(() => useLocalStorage<string[]>("test", []));

    // The hook should return the provided initial value.
    expect(result.current[0]).toEqual([]);
  });

  it("returns stored value from localStorage", () => {
    // Pre-populate localStorage before rendering the hook.
    localStorage.setItem("test", JSON.stringify(["hello"]));

    const { result } = renderHook(() => useLocalStorage<string[]>("test", []));

    // The hook should read and return the stored value.
    expect(result.current[0]).toEqual(["hello"]);
  });

  it("falls back to initial value when stored JSON is invalid", () => {
    // Simulate corrupted or invalid JSON in localStorage.
    localStorage.setItem("test", "invalid-json");

    const { result } = renderHook(() => useLocalStorage<string[]>("test", []));

    // The hook should safely fall back to the initial value.
    expect(result.current[0]).toEqual([]);
  });

  it("updates localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage<string[]>("test", []));

    // result.current contains:
    // [currentValue, setValue]
    //
    // result.current[1] is the state setter function.
    //
    // act() ensures React processes state updates
    // and effects before assertions run.
    act(() => {
      result.current[1](["updated"]);
    });

    // Verify the updated value was persisted to localStorage.
    expect(JSON.parse(localStorage.getItem("test") || "[]")).toEqual([
      "updated",
    ]);
  });
});
