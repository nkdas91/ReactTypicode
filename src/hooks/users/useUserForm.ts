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
 */
export default function useUserForm(initialForm: User | null) {
  const [form, setForm] = useState<User | null>(initialForm);

  const { errors, validateField, validateForm } = useFormValidation(
    userSchema,
    () => form!,
  );

  const [loading, setLoading] = useState(false);

  /**
   * Synchronizes async-loaded form data.
   */
  useEffect(() => {
    if (initialForm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(initialForm);
    }
  }, [initialForm]);

  /**
   * Updates a top-level field and validates it immediately.
   */
  const handleChange = (name: string, value: string) => {
    if (!form) {
      return;
    }

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);

    validateField(name, updatedForm);
  };

  /**
   * Updates an address field and validates it immediately.
   */
  const handleAddressChange = (name: string, value: string) => {
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

    setForm(updatedForm);

    validateField(`address.${name}`, updatedForm);
  };

  /**
   * Validates a top-level field on blur.
   */
  const handleBlur = (name: string, value: string) => {
    if (!form) {
      return;
    }

    validateField(name, {
      ...form,
      [name]: value,
    });
  };

  /**
   * Validates an address field on blur.
   */
  const handleAddressBlur = (name: string, value: string) => {
    if (!form) {
      return;
    }

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
