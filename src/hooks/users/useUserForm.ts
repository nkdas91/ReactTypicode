import { useEffect, useState } from "react";
import { userSchema } from "../../schemas/userSchema";
import type { User } from "../../types/User";
import { validateSchema } from "../../utils/validateSchema";

/**
 * Shared hook for managing user form state and validation.
 *
 * Used by:
 * useCreateUserForm
 * useUpdateUserForm
 */
export default function useUserForm(initialForm: User | null) {
  const [form, setForm] = useState<User | null>(initialForm);

  useEffect(() => {
    if (initialForm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(initialForm);
    }
  }, [initialForm]);

  /**
   * Stores validation errors by field name.
   *
   * Example:
   * {
   *   name: "Name is required",
   *   "address.city": "City is required",
   * }
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  /**
   * Validates the entire form and updates error state.
   *
   * Used:
   * on submit
   * for field-level validation
   */
  const getValidationErrors = (user: User) => {
    const validation = validateSchema(userSchema, user);

    return validation.success ? {} : validation.errors;
  };

  /**
   * Validates a single top-level field.
   *
   * Example:
   * validateField("name", "John")
   */
  const validateField = (name: string, value: string) => {
    if (!form) {
      return;
    }

    const updatedForm = {
      ...form,
      [name]: value,
    };

    const validationErrors = getValidationErrors(updatedForm);

    setErrors((prev) => {
      const next = { ...prev };

      if (validationErrors[name]) {
        next[name] = validationErrors[name];
      } else {
        delete next[name];
      }

      return next;
    });
  };

  /**
   * Validates a nested address field.
   *
   * Example:
   * validateAddressField("city", "London")
   */
  const validateAddressField = (name: string, value: string) => {
    if (!form) {
      return;
    }

    const updatedForm = {
      ...form,
      address: {
        ...form.address,
        [name]: value,
      },
    };

    const validationErrors = getValidationErrors(updatedForm);

    const errorKey = `address.${name}`;

    setErrors((prev) => {
      const next = { ...prev };

      if (validationErrors[errorKey]) {
        next[errorKey] = validationErrors[errorKey];
      } else {
        delete next[errorKey];
      }

      return next;
    });
  };

  /**
   * Validates a top-level field when it loses focus.
   */
  const handleBlur = (name: string, value: string) => {
    validateField(name, value);
  };

  /**
   * Validates an address field when it loses focus.
   */
  const handleAddressBlur = (name: string, value: string) => {
    validateAddressField(name, value);
  };

  /**
   * Updates top-level form fields.
   *
   * Validation runs immediately so errors
   * disappear while the user types.
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

    validateField(name, value);
  };

  /**
   * Updates nested address fields.
   *
   * Validation runs immediately so errors
   * disappear while the user types.
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

    validateAddressField(name, value);
  };

  /**
   * Validates the entire form using the schema.
   *
   * Returns:
   * true  => validation passed
   * false => validation failed
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
    handleBlur,
    handleAddressBlur,
    validateForm,
  };
}
