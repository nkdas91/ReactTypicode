import { useEffect, useState } from "react";
import { postSchema } from "../../schemas/postSchema";
import type { Post } from "../../types/Post";
import useFormValidation from "../forms/useFormValidation";

/**
 * Shared hook for managing post form state and validation.
 *
 * Used by:
 * useUpdatePostForm
 */
export default function usePostForm(initialForm: Post | null) {
  const [form, setForm] = useState<Post | null>(initialForm);

  const { errors, validateField, validateForm } = useFormValidation(
    postSchema,
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
   * Updates a field and immediately re-validates it.
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

    if (!form) return;

    validateField(name, {
      ...form,
      [name]: value,
    });
  };

  /**
   * Validates a field when it loses focus.
   */
  const handleBlur = (name: string, value: string) => {
    if (!form) return;

    validateField(name, {
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    setForm,
    errors,
    loading,
    setLoading,
    handleChange,
    handleBlur,
    validateForm,
  };
}
