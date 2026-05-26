import { useEffect, useState } from "react";
import { postSchema } from "../../schemas/postSchema";
import type { Post } from "../../types/Post";
import { validateSchema } from "../../utils/validateSchema";

/**
 * Shared hook for managing post form state and validation.
 *
 * Used by:
 * - useUpdatePostForm
 */
export default function usePostForm(initialForm: Post | null) {
  /**
   * Stores the current form values.
   */
  const [form, setForm] = useState<Post | null>(initialForm);

  /**
   * Sync async-loaded form data.
   */
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
   *   title: "Title is required"
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
   * handleChange("title", "What is typescript")
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
   * Validates the form using the post schema.
   *
   * Returns:
   * - true  => validation passed
   * - false => validation failed
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
    validateForm,
  };
}
