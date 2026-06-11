import { act, renderHook } from "@testing-library/react";
import useNotification from "../../context/useNotification";
import useFormValidation from "../forms/useFormValidation";
import useCommentForm from "./useCommentForm";

vi.mock("../../context/useNotification");
vi.mock("../forms/useFormValidation");

const mockShowNotification = vi.fn();
const mockValidateField = vi.fn();
const mockValidateForm = vi.fn();

describe("useCommentForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNotification).mockReturnValue({
      showNotification: mockShowNotification,
    });

    vi.mocked(useFormValidation).mockReturnValue({
      errors: {},
      setErrors: vi.fn(),
      validateField: mockValidateField,
      validateForm: mockValidateForm,
      getValidationErrors: vi.fn(),
    });
  });

  it("initializes form with empty values", () => {
    const { result } = renderHook(() => useCommentForm(5, 0, vi.fn()));

    expect(result.current.form).toEqual({
      postId: 5,
      id: 0,
      name: "",
      email: "",
      body: "",
    });
  });

  it("updates form state and validates field on change", () => {
    const { result } = renderHook(() => useCommentForm(5, 0, vi.fn()));

    act(() => {
      result.current.handleChange("name", "John");
    });

    expect(result.current.form.name).toBe("John");

    expect(mockValidateField).toHaveBeenCalledWith(
      "name",
      expect.objectContaining({
        name: "John",
      }),
    );
  });

  it("validates field on blur", () => {
    const { result } = renderHook(() => useCommentForm(5, 0, vi.fn()));

    act(() => {
      result.current.handleBlur("email", "john@example.com");
    });

    expect(mockValidateField).toHaveBeenCalled();
  });

  it("does not submit when validation fails", () => {
    mockValidateForm.mockReturnValue(false);

    const onAddComment = vi.fn();

    const { result } = renderHook(() => useCommentForm(5, 10, onAddComment));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(onAddComment).not.toHaveBeenCalled();
    expect(mockShowNotification).not.toHaveBeenCalled();
  });

  it("adds comment and shows notification on successful submit", () => {
    mockValidateForm.mockReturnValue(true);

    const onAddComment = vi.fn();
    const onSuccess = vi.fn();

    const { result } = renderHook(() =>
      useCommentForm(5, 10, onAddComment, onSuccess),
    );

    act(() => {
      result.current.handleChange("name", "John");
      result.current.handleChange("email", "john@example.com");
      result.current.handleChange("body", "Test comment");
    });

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(onAddComment).toHaveBeenCalledWith({
      postId: 5,
      id: 11,
      name: "John",
      email: "john@example.com",
      body: "Test comment",
    });

    expect(onSuccess).toHaveBeenCalled();

    expect(mockShowNotification).toHaveBeenCalledWith(
      "Comment added successfully",
    );
  });

  it("resets form after successful submit", () => {
    mockValidateForm.mockReturnValue(true);

    const { result } = renderHook(() => useCommentForm(5, 0, vi.fn()));

    act(() => {
      result.current.handleChange("name", "John");
    });

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(result.current.form).toEqual({
      postId: 5,
      id: 0,
      name: "",
      email: "",
      body: "",
    });
  });
});
