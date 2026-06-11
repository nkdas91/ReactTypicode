import { useEffect, useState } from "react";
import useFormValidation from "../forms/useFormValidation";
import { userSchema } from "../../schemas/userSchema";
import type { User } from "../../types/User";

/**
 * Shared hook for managing user form state and validation.
 *
 * Used by:
 * - useCreateUserForm
 * - useUpdateUserForm
 *
 * Handles:
 * - form state management
 * - nested address updates
 * - field-level validation
 * - full-form validation
 * - async form initialization
 *
 * @param {User | null} initialForm - Initial user form data (can be null while loading)
 * @returns {{
 *   form: User | null;
 *   setForm: React.Dispatch<React.SetStateAction<User | null>>;
 *   errors: Record<string, string>;
 *   loading: boolean;
 *   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
 *   handleChange: (name: string, value: string) => void;
 *   handleAddressChange: (name: string, value: string) => void;
 *   handleBlur: (name: string, value: string) => void;
 *   handleAddressBlur: (name: string, value: string) => void;
 *   validateForm: () => boolean;
 * }} User form state and handlers
 */
export default function useUserForm(initialForm: User | null) {
  /**
   * User form state.
   */
  const [form, setForm] = useState<User | null>(initialForm);

  /**
   * Validation utilities and error state.
   */
  const { errors, validateField, validateForm } = useFormValidation(
    userSchema,
    () => form!,
  );

  /**
   * Loading state for async form operations.
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Syncs async-loaded initial form data into state.
   */
  useEffect(() => {
    if (initialForm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(initialForm);
    }
  }, [initialForm]);

  /**
   * Updates a top-level form field and triggers validation.
   *
   * @param {string} name - Field name
   * @param {string} value - Field value
   */
  const handleChange = (name: string, value: string) => {
    if (!form) return;

    const updatedForm: User = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
    validateField(name, updatedForm);
  };

  /**
   * Updates a nested address field and triggers validation.
   *
   * @param {string} name - Address field name
   * @param {string} value - Field value
   */
  const handleAddressChange = (name: string, value: string) => {
    if (!form) return;

    const updatedForm: User = {
      ...form,
      address: {
        ...form.address,
        [name]: value,
      },
    };

    setForm(updatedForm);
    validateField(`address.${name}`, updatedForm);
  };

  /**
   * Validates a top-level field on blur.
   *
   * @param {string} name - Field name
   * @param {string} value - Field value
   */
  const handleBlur = (name: string, value: string) => {
    if (!form) return;

    validateField(name, {
      ...form,
      [name]: value,
    });
  };

  /**
   * Validates a nested address field on blur.
   *
   * @param {string} name - Address field name
   * @param {string} value - Field value
   */
  const handleAddressBlur = (name: string, value: string) => {
    if (!form) return;

    validateField(`address.${name}`, {
      ...form,
      address: {
        ...form.address,
        [name]: value,
      },
    });
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
