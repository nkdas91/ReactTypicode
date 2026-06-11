import { useEffect, useState } from "react";
import { postSchema } from "../../schemas/postSchema";
import type { Post } from "../../types/Post";
import useFormValidation from "../forms/useFormValidation";

/**
 * Shared hook for managing post form state and validation.
 *
 * Used by:
 * - useUpdatePostForm
 *
 * Handles:
 * - form state management
 * - async initialization
 * - field-level validation
 * - full-form validation
 *
 * @param {Post | null} initialForm - Initial post form data (can be null while loading)
 * @returns {{
 *   form: Post | null;
 *   setForm: React.Dispatch<React.SetStateAction<Post | null>>;
 *   errors: Record<string, string>;
 *   loading: boolean;
 *   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
 *   handleChange: (name: string, value: string) => void;
 *   handleBlur: (name: string, value: string) => void;
 *   validateForm: () => boolean;
 * }} Post form state and handlers
 */
export default function usePostForm(initialForm: Post | null) {
  /**
   * Post form state.
   */
  const [form, setForm] = useState<Post | null>(initialForm);

  /**
   * Validation utilities and error state.
   */
  const { errors, validateField, validateForm } = useFormValidation(
    postSchema,
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
   * Updates a form field and triggers validation.
   *
   * @param {string} name - Field name
   * @param {string} value - Field value
   */
  const handleChange = (name: string, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        [name]: value,
      };

      validateField(name, updated);

      return updated;
    });
  };

  /**
   * Validates a field when it loses focus.
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
