import { act, renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import useNotification from "../../context/useNotification";
import postService from "../../services/postService";
import usePostForm from "./usePostForm";
import useUpdatePostForm from "./useUpdatePostForm";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../context/useNotification");
vi.mock("../../services/postService");
vi.mock("./usePostForm");

describe("useUpdatePostForm", () => {
  const mockNavigate = vi.fn();
  const mockShowNotification = vi.fn();
  const mockSetLoading = vi.fn();
  const mockValidateForm = vi.fn();

  const post = {
    id: 1,
    userId: 1,
    title: "Test Post",
    body: "Test Body",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useNotification).mockReturnValue({
      showNotification: mockShowNotification,
    });

    vi.mocked(usePostForm).mockReturnValue({
      form: post,
      errors: {},
      loading: false,
      setLoading: mockSetLoading,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      validateForm: mockValidateForm,
    } as never);
  });

  it("returns values from usePostForm", () => {
    const { result } = renderHook(() => useUpdatePostForm(1, post));

    expect(result.current.form).toEqual(post);
    expect(result.current.loading).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it("does not submit when validation fails", async () => {
    mockValidateForm.mockReturnValue(false);

    const { result } = renderHook(() => useUpdatePostForm(1, post));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(postService.patch).not.toHaveBeenCalled();
  });

  it("updates post and navigates on success", async () => {
    mockValidateForm.mockReturnValue(true);

    vi.mocked(postService.patch).mockResolvedValue(post);

    const { result } = renderHook(() => useUpdatePostForm(1, post));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(postService.patch).toHaveBeenCalledWith(1, post);

    expect(mockShowNotification).toHaveBeenCalledWith("Post updated");

    expect(mockNavigate).toHaveBeenCalledWith("/posts/1");
  });

  it("shows error notification when update fails", async () => {
    mockValidateForm.mockReturnValue(true);

    vi.mocked(postService.patch).mockRejectedValue(new Error("Update failed"));

    const { result } = renderHook(() => useUpdatePostForm(1, post));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(mockShowNotification).toHaveBeenCalledWith("Update failed", "error");
  });

  it("toggles loading state during submission", async () => {
    mockValidateForm.mockReturnValue(true);

    vi.mocked(postService.patch).mockResolvedValue(post);

    const { result } = renderHook(() => useUpdatePostForm(1, post));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
    expect(mockSetLoading).toHaveBeenLastCalledWith(false);
  });
});
