import { act, renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";
import type { User } from "../../types/User";
import useCreateUserForm from "./useCreateUserForm";
import useUserForm from "./useUserForm";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../context/useNotification");
vi.mock("../../services/userService");
vi.mock("./useUserForm");

describe("useCreateUserForm", () => {
  const mockNavigate = vi.fn();
  const mockShowNotification = vi.fn();
  const mockSetLoading = vi.fn();
  const mockValidateForm = vi.fn();

  const mockForm: User = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "1234567890",
    website: "example.com",
    address: {
      suite: "Apt 1",
      street: "Main St",
      city: "Delhi",
      zipcode: "110001",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useNotification).mockReturnValue({
      showNotification: mockShowNotification,
    });

    vi.mocked(useUserForm).mockReturnValue({
      form: mockForm,
      setForm: vi.fn(),
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

  const createSubmitEvent = () =>
    ({
      preventDefault: vi.fn(),
    }) as unknown as React.FormEvent<HTMLFormElement>;

  it("returns form state from useUserForm", () => {
    const { result } = renderHook(() => useCreateUserForm());

    expect(result.current.form).toEqual(mockForm);
    expect(result.current.loading).toBe(false);
  });

  it("does not submit when validation fails", async () => {
    mockValidateForm.mockReturnValue(false);

    const { result } = renderHook(() => useCreateUserForm());

    await act(async () => {
      await result.current.handleSubmit(
        createSubmitEvent() as unknown as React.SubmitEvent<HTMLFormElement>,
      );
    });

    expect(userService.post).not.toHaveBeenCalled();
    expect(mockSetLoading).not.toHaveBeenCalled();
  });

  it("creates user and navigates on success", async () => {
    mockValidateForm.mockReturnValue(true);

    vi.mocked(userService.post).mockResolvedValue(mockForm);

    const { result } = renderHook(() => useCreateUserForm());

    await act(async () => {
      await result.current.handleSubmit(
        createSubmitEvent() as unknown as React.SubmitEvent<HTMLFormElement>,
      );
    });

    expect(userService.post).toHaveBeenCalledWith(mockForm);
    expect(mockShowNotification).toHaveBeenCalledWith("User created");
    expect(mockNavigate).toHaveBeenCalledWith("/users");

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("shows error notification when creation fails", async () => {
    mockValidateForm.mockReturnValue(true);

    vi.mocked(userService.post).mockRejectedValue(
      new Error("Failed to create user"),
    );

    const { result } = renderHook(() => useCreateUserForm());

    await act(async () => {
      await result.current.handleSubmit(
        createSubmitEvent() as unknown as React.SubmitEvent<HTMLFormElement>,
      );
    });

    expect(mockShowNotification).toHaveBeenCalledWith(
      "Failed to create user",
      "error",
    );

    expect(mockNavigate).not.toHaveBeenCalled();

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
});
