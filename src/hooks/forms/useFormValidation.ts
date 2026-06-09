import { useState } from "react";
import type { ZodType } from "zod";
import { validateSchema } from "../../utils/validateSchema";

/**
 * Shared form validation hook.
 *
 * Provides:
 * - field-level validation
 * - full-form validation
 * - validation error state
 */
export default function useFormValidation<T>(
  schema: ZodType<T>,
  getForm: () => T,
) {
  /**
   * Validation errors keyed by field path.
   *
   * Example:
   * {
   *   name: "Name is required",
   *   "address.city": "City is required",
   * }
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Returns validation errors for the supplied form data.
   */
  const getValidationErrors = (data: T) => {
    const validation = validateSchema(schema, data);

    return validation.success ? {} : validation.errors;
  };

  /**
   * Validates a single field and updates only
   * that field's error state.
   */
  const validateField = (fieldName: string, updatedData: T) => {
    const validationErrors = getValidationErrors(updatedData);

    setErrors((prev) => {
      const next = { ...prev };

      if (validationErrors[fieldName]) {
        next[fieldName] = validationErrors[fieldName];
      } else {
        delete next[fieldName];
      }

      return next;
    });
  };

  /**
   * Validates the entire form.
   *
   * Returns:
   * - true when validation passes
   * - false when validation fails
   */
  const validateForm = () => {
    const validation = validateSchema(schema, getForm());

    if (!validation.success) {
      setErrors(validation.errors);

      return false;
    }

    setErrors({});

    return true;
  };

  return {
    errors,
    setErrors,
    validateField,
    validateForm,
    getValidationErrors,
  };
}
