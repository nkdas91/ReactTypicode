import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";
import useUpdateUserForm from "./useUpdateUserForm";
import useUserForm from "./useUserForm";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../context/useNotification");
vi.mock("../../services/userService", () => ({
  default: {
    patch: vi.fn(),
  },
}));
vi.mock("./useUserForm");

const mockNavigate = vi.fn();
const mockShowNotification = vi.fn();
const mockSetLoading = vi.fn();
const mockValidateForm = vi.fn();

const mockForm = {
  id: 1,
  name: "John",
  username: "john",
  email: "john@example.com",
  phone: "1234567890",
  website: "example.com",
  address: {
    suite: "A",
    street: "Main Street",
    city: "London",
    zipcode: "12345",
  },
};

describe("useUpdateUserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useNotification).mockReturnValue({
      showNotification: mockShowNotification,
    });

    const mockSetForm = vi.fn();

    vi.mocked(useUserForm).mockReturnValue({
      form: mockForm,
      setForm: mockSetForm,
      errors: {},
      loading: false,
      setLoading: mockSetLoading,
      handleChange: vi.fn(),
      handleAddressChange: vi.fn(),
      handleBlur: vi.fn(),
      handleAddressBlur: vi.fn(),
      validateForm: mockValidateForm,
    });
  });

  it("returns values from useUserForm", () => {
    const { result } = renderHook(() => useUpdateUserForm(1, mockForm));

    expect(result.current.form).toEqual(mockForm);
    expect(result.current.loading).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it("does not submit when validation fails", async () => {
    mockValidateForm.mockReturnValue(false);

    const { result } = renderHook(() => useUpdateUserForm(1, mockForm));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(userService.patch).not.toHaveBeenCalled();
    expect(mockSetLoading).not.toHaveBeenCalled();
  });

  it("updates user and navigates on success", async () => {
    mockValidateForm.mockReturnValue(true);

    vi.mocked(userService.patch).mockResolvedValue(mockForm);

    const { result } = renderHook(() => useUpdateUserForm(5, mockForm));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(userService.patch).toHaveBeenCalledWith(5, mockForm);

    expect(mockShowNotification).toHaveBeenCalledWith("User updated");

    expect(mockNavigate).toHaveBeenCalledWith("/users/5");

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("shows error notification when update fails", async () => {
    mockValidateForm.mockReturnValue(true);

    vi.mocked(userService.patch).mockRejectedValue(new Error("Update failed"));

    const { result } = renderHook(() => useUpdateUserForm(5, mockForm));

    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.SubmitEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(mockShowNotification).toHaveBeenCalledWith("Update failed", "error");

    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
});
