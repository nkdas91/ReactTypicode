import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";
import useDeleteUser from "./useDeleteUser";

vi.mock("../../context/useNotification");
vi.mock("../../services/userService", () => ({
  default: {
    delete: vi.fn(),
  },
}));

const mockShowNotification = vi.fn();

describe("useDeleteUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNotification).mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  it("starts with confirmation modal closed", () => {
    const { result } = renderHook(() => useDeleteUser());

    expect(result.current.isConfirmOpen).toBe(false);
  });

  it("opens confirmation modal when requestDelete is called", () => {
    const { result } = renderHook(() => useDeleteUser());

    act(() => {
      result.current.requestDelete(5);
    });

    expect(result.current.isConfirmOpen).toBe(true);
  });

  it("closes confirmation modal when cancelDelete is called", () => {
    const { result } = renderHook(() => useDeleteUser());

    act(() => {
      result.current.requestDelete(5);
    });

    expect(result.current.isConfirmOpen).toBe(true);

    act(() => {
      result.current.cancelDelete();
    });

    expect(result.current.isConfirmOpen).toBe(false);
  });

  it("deletes user and calls success callback", async () => {
    vi.mocked(userService.delete).mockResolvedValue(undefined);

    const onSuccess = vi.fn();

    const { result } = renderHook(() => useDeleteUser({ onSuccess }));

    act(() => {
      result.current.requestDelete(10);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(userService.delete).toHaveBeenCalledWith(10);

    expect(mockShowNotification).toHaveBeenCalledWith("User deleted");

    expect(onSuccess).toHaveBeenCalled();
    expect(result.current.isConfirmOpen).toBe(false);
  });

  it("shows error notification when delete fails", async () => {
    vi.mocked(userService.delete).mockRejectedValue(new Error("Delete failed"));

    const { result } = renderHook(() => useDeleteUser());

    act(() => {
      result.current.requestDelete(10);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(mockShowNotification).toHaveBeenCalledWith("Delete failed", "error");
  });

  it("does nothing when no user is selected", async () => {
    const { result } = renderHook(() => useDeleteUser());

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(userService.delete).not.toHaveBeenCalled();
  });
});
