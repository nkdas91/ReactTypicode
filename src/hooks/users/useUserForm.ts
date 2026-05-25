import { useState } from "react";
import { userSchema } from "../../schemas/userSchema";
import type { User } from "../../types/User";
import { validateSchema } from "../../utils/validateSchema";

/**
 * Shared hook for managing user form state and validation.
 *
 * Used by:
 * - useCreateUserForm
 * - useUpdateUserForm
 */
export default function useUserForm(initialForm: User | null) {
  /**
   * Stores the current form values.
   */
  const [form, setForm] = useState<User | null>(initialForm);

  /**
   * Stores validation errors by field name.
   *
   * Example:
   * {
   *   name: "Name is required"
   * }
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Tracks submit/loading state.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Updates top-level form fields.
   *
   * Example:
   * handleChange("name", "John")
   */
  const handleChange = (name: string, value: string) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev,
    );
  };

  /**
   * Updates nested address fields.
   *
   * Example:
   * handleAddressChange("city", "London")
   */
  const handleAddressChange = (name: string, value: string) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            address: {
              ...prev.address,
              [name]: value,
            },
          }
        : prev,
    );
  };

  /**
   * Validates the form using the user schema.
   *
   * Returns:
   * - true  => validation passed
   * - false => validation failed
   */
  const validateForm = () => {
    if (!form) {
      return false;
    }

    const validation = validateSchema(userSchema, form);

    if (!validation.success) {
      setErrors(validation.errors);

      return false;
    }

    setErrors({});

    return true;
  };

  return {
    form,
    setForm,
    errors,
    loading,
    setLoading,
    handleChange,
    handleAddressChange,
    validateForm,
  };
}
