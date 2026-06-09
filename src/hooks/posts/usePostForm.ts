import { useEffect, useState } from "react";
import { postSchema } from "../../schemas/postSchema";
import type { Post } from "../../types/Post";
import { validateSchema } from "../../utils/validateSchema";

/**
 * Shared hook for managing post form state and validation.
 *
 * Used by:
 * useUpdatePostForm
 */
export default function usePostForm(initialForm: Post | null) {
  const [form, setForm] = useState<Post | null>(initialForm);

  // Validation errors keyed by field name.
  const [errors, setErrors] = useState<Record<string, string>>({});

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
   * Returns validation errors for a post object.
   */
  const getValidationErrors = (post: Post) => {
    const validation = validateSchema(postSchema, post);

    return validation.success ? {} : validation.errors;
  };

  /**
   * Validates a field and updates its error state.
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

    validateField(name, value);
  };

  /**
   * Validates a field when it loses focus.
   */
  const handleBlur = (name: string, value: string) => {
    validateField(name, value);
  };

  /**
   * Validates the entire form.
   */
  const validateForm = () => {
    if (!form) {
      return false;
    }

    const validation = validateSchema(postSchema, form);

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
    handleBlur,
    validateForm,
  };
}
