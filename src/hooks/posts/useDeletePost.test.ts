import { act, renderHook } from "@testing-library/react";
import useNotification from "../../context/useNotification";
import postService from "../../services/postService";
import useDeletePost from "./useDeletePost";

vi.mock("../../context/useNotification");
vi.mock("../../services/postService");

const mockShowNotification = vi.fn();

describe("useDeletePost", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNotification).mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  it("starts with confirmation modal closed", () => {
    const { result } = renderHook(() => useDeletePost());

    expect(result.current.isConfirmOpen).toBe(false);
  });

  it("opens confirmation modal when requesting delete", () => {
    const { result } = renderHook(() => useDeletePost());

    act(() => {
      result.current.requestDelete(123);
    });

    expect(result.current.isConfirmOpen).toBe(true);
  });

  it("closes confirmation modal when cancelling delete", () => {
    const { result } = renderHook(() => useDeletePost());

    act(() => {
      result.current.requestDelete(123);
    });

    expect(result.current.isConfirmOpen).toBe(true);

    act(() => {
      result.current.cancelDelete();
    });

    expect(result.current.isConfirmOpen).toBe(false);
  });

  it("deletes post and calls success callback", async () => {
    vi.mocked(postService.delete).mockResolvedValue(undefined);

    const onSuccess = vi.fn();

    const { result } = renderHook(() => useDeletePost({ onSuccess }));

    act(() => {
      result.current.requestDelete(123);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(postService.delete).toHaveBeenCalledWith(123);

    expect(mockShowNotification).toHaveBeenCalledWith("Post deleted");

    expect(onSuccess).toHaveBeenCalled();

    expect(result.current.isConfirmOpen).toBe(false);
  });

  it("shows error notification when delete fails", async () => {
    vi.mocked(postService.delete).mockRejectedValue(new Error("Delete failed"));

    const { result } = renderHook(() => useDeletePost());

    act(() => {
      result.current.requestDelete(123);
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(mockShowNotification).toHaveBeenCalledWith("Delete failed", "error");
  });
});
