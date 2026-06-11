import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useFormValidation from "../forms/useFormValidation";
import useUserForm from "./useUserForm";

vi.mock("../forms/useFormValidation");

const mockValidateField = vi.fn();
const mockValidateForm = vi.fn();

const user = {
  id: 1,
  name: "John",
  username: "john",
  email: "john@example.com",
  phone: "1234567890",
  website: "example.com",
  address: {
    suite: "A",
    street: "Main St",
    city: "Delhi",
    zipcode: "12345",
  },
};

describe("useUserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormValidation).mockReturnValue({
      errors: {},
      setErrors: vi.fn(),
      validateField: mockValidateField,
      validateForm: mockValidateForm,
      getValidationErrors: vi.fn(),
    });
  });

  it("initializes with provided form", () => {
    const { result } = renderHook(() => useUserForm(user));

    expect(result.current.form).toEqual(user);
  });

  it("updates top level fields", () => {
    const { result } = renderHook(() => useUserForm(user));

    act(() => {
      result.current.handleChange("name", "Jane");
    });

    expect(result.current.form?.name).toBe("Jane");

    expect(mockValidateField).toHaveBeenCalledWith(
      "name",
      expect.objectContaining({
        name: "Jane",
      }),
    );
  });

  it("updates nested address fields", () => {
    const { result } = renderHook(() => useUserForm(user));

    act(() => {
      result.current.handleAddressChange("city", "Mumbai");
    });

    expect(result.current.form?.address.city).toBe("Mumbai");

    expect(mockValidateField).toHaveBeenCalledWith(
      "address.city",
      expect.objectContaining({
        address: expect.objectContaining({
          city: "Mumbai",
        }),
      }),
    );
  });

  it("validates top level field on blur", () => {
    const { result } = renderHook(() => useUserForm(user));

    act(() => {
      result.current.handleBlur("name", "Jane");
    });

    expect(mockValidateField).toHaveBeenCalledWith(
      "name",
      expect.objectContaining({
        name: "Jane",
      }),
    );
  });

  it("validates nested address field on blur", () => {
    const { result } = renderHook(() => useUserForm(user));

    act(() => {
      result.current.handleAddressBlur("city", "Mumbai");
    });

    expect(mockValidateField).toHaveBeenCalledWith(
      "address.city",
      expect.objectContaining({
        address: expect.objectContaining({
          city: "Mumbai",
        }),
      }),
    );
  });

  it("does nothing when form is null", () => {
    const { result } = renderHook(() => useUserForm(null));

    act(() => {
      result.current.handleChange("name", "Jane");
      result.current.handleAddressChange("city", "Mumbai");
      result.current.handleBlur("name", "Jane");
      result.current.handleAddressBlur("city", "Mumbai");
    });

    expect(mockValidateField).not.toHaveBeenCalled();
    expect(result.current.form).toBeNull();
  });
});
