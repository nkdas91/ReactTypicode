import { act, renderHook } from "@testing-library/react";
import { z } from "zod";
import useFormValidation from "./useFormValidation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
});

describe("useFormValidation", () => {
  it("returns empty errors initially", () => {
    const form = { name: "", email: "" };

    const { result } = renderHook(() => useFormValidation(schema, () => form));

    expect(result.current.errors).toEqual({});
  });

  it("returns validation errors for invalid data", () => {
    const form = { name: "", email: "" };

    const { result } = renderHook(() => useFormValidation(schema, () => form));

    expect(result.current.getValidationErrors(form)).toEqual({
      name: "Name is required",
      email: "Invalid email",
    });
  });

  it("returns no validation errors for valid data", () => {
    const form = {
      name: "John",
      email: "john@example.com",
    };

    const { result } = renderHook(() => useFormValidation(schema, () => form));

    expect(result.current.getValidationErrors(form)).toEqual({});
  });

  it("adds field errors when validation fails", () => {
    const form = { name: "", email: "john@example.com" };

    const { result } = renderHook(() => useFormValidation(schema, () => form));

    act(() => {
      result.current.validateField("name", form);
    });

    expect(result.current.errors).toEqual({
      name: "Name is required",
    });
  });

  it("removes field errors when validation passes", () => {
    const { result } = renderHook(() =>
      useFormValidation(schema, () => ({
        name: "",
        email: "john@example.com",
      })),
    );

    act(() => {
      result.current.validateField("name", {
        name: "",
        email: "john@example.com",
      });
    });

    act(() => {
      result.current.validateField("name", {
        name: "John",
        email: "john@example.com",
      });
    });

    expect(result.current.errors).toEqual({});
  });

  it("returns false and sets errors when form is invalid", () => {
    const form = { name: "", email: "" };

    const { result } = renderHook(() => useFormValidation(schema, () => form));

    let isValid = true;

    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(false);

    expect(result.current.errors).toEqual({
      name: "Name is required",
      email: "Invalid email",
    });
  });

  it("returns true when form is valid", () => {
    const form = {
      name: "John",
      email: "john@example.com",
    };

    const { result } = renderHook(() => useFormValidation(schema, () => form));

    let isValid = false;

    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(true);
  });
});
