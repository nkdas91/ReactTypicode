import { act, renderHook } from "@testing-library/react";
import useFormValidation from "../forms/useFormValidation";
import usePostForm from "./usePostForm";

vi.mock("../forms/useFormValidation");

describe("usePostForm", () => {
  const mockValidateField = vi.fn();
  const mockValidateForm = vi.fn();

  const post = {
    id: 1,
    userId: 1,
    title: "Original Title",
    body: "Original Body",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormValidation).mockReturnValue({
      errors: {},
      validateField: mockValidateField,
      validateForm: mockValidateForm,
    } as never);
  });

  it("initializes form with supplied data", () => {
    const { result } = renderHook(() => usePostForm(post));

    expect(result.current.form).toEqual(post);
    expect(result.current.loading).toBe(false);
  });

  it("updates a field and validates it", () => {
    const { result } = renderHook(() => usePostForm(post));

    act(() => {
      result.current.handleChange("title", "Updated Title");
    });

    expect(result.current.form?.title).toBe("Updated Title");

    expect(mockValidateField).toHaveBeenCalledWith(
      "title",
      expect.objectContaining({
        title: "Updated Title",
      }),
    );
  });

  it("validates a field on blur", () => {
    const { result } = renderHook(() => usePostForm(post));

    act(() => {
      result.current.handleBlur("title", "Blur Title");
    });

    expect(mockValidateField).toHaveBeenCalledWith(
      "title",
      expect.objectContaining({
        title: "Blur Title",
      }),
    );
  });

  it("does nothing when form is null", () => {
    const { result } = renderHook(() => usePostForm(null));

    act(() => {
      result.current.handleChange("title", "Test");
      result.current.handleBlur("title", "Test");
    });

    expect(result.current.form).toBeNull();
    expect(mockValidateField).not.toHaveBeenCalled();
  });

  it("exposes validateForm from useFormValidation", () => {
    const { result } = renderHook(() => usePostForm(post));

    expect(result.current.validateForm).toBe(mockValidateForm);
  });
});
