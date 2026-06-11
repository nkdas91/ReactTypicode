import { useState } from "react";
import type { ZodType } from "zod";
import { validateSchema } from "../../utils/validateSchema";

/**
 * Shared form validation hook using a Zod schema.
 *
 * Provides:
 * - field-level validation
 * - full-form validation
 * - centralized error state management
 *
 * @template T - Shape of the form data
 * @param {ZodType<T>} schema - Zod schema used for validation
 * @param {() => T} getForm - Function that returns the latest form data
 * @returns {{
 *   errors: Record<string, string>;
 *   setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
 *   validateField: (fieldName: string, updatedData: T) => void;
 *   validateForm: () => boolean;
 *   getValidationErrors: (data: T) => Record<string, string>;
 * }} Validation utilities and error state for the form
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
   *
   * @param {T} data - Form data to validate
   * @returns {Record<string, string>} Field-level validation errors
   */
  const getValidationErrors = (data: T): Record<string, string> => {
    const validation = validateSchema(schema, data);

    return validation.success ? {} : validation.errors;
  };

  /**
   * Validates a single field and updates only that field's error state.
   *
   * @param {string} fieldName - Name of the field being validated
   * @param {T} updatedData - Latest form data after the change
   */
  const validateField = (fieldName: string, updatedData: T): void => {
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
   * Validates the entire form using the current form state.
   *
   * @returns {boolean} True if the form is valid, false otherwise
   */
  const validateForm = (): boolean => {
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
