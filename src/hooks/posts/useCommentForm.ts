import { useState } from "react";
import useNotification from "../../context/useNotification";
import { commentSchema } from "../../schemas/commentSchema";
import type { Comment } from "../../types/Comment";
import { validateSchema } from "../../utils/validateSchema";

const createInitialCommentForm = (postId: number): Comment => ({
  postId,
  id: 0,
  name: "",
  body: "",
  email: "",
});

export default function useCommentForm(
  postId: number,
  commentsCount: number,
  onAddComment: (comment: Comment) => void,
  onSuccess?: () => void,
) {
  const [form, setForm] = useState<Comment>(createInitialCommentForm(postId));

  /**
   * Stores validation errors by field name.
   *
   * Example:
   * {
   *   name: "Name is required"
   * }
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { showNotification } = useNotification();

  /**
   * Validates the entire form and returns
   * a map of validation errors.
   */
  const getValidationErrors = (comment: Comment) => {
    const validation = validateSchema(commentSchema, comment);

    return validation.success ? {} : validation.errors;
  };

  /**
   * Validates a single field and updates
   * only that field's error state.
   */
  const validateField = (name: string, value: string) => {
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
   * Updates form state and immediately re-validates
   * the field so errors disappear while typing.
   */
  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  /**
   * Re-validates a field when it loses focus.
   */
  const handleBlur = (name: string, value: string) => {
    validateField(name, value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateSchema(commentSchema, form);

    if (!validation.success) {
      setErrors(validation.errors);

      return;
    }

    setErrors({});

    const newComment: Comment = {
      ...form,
      id: commentsCount + 1,
    };

    onAddComment(newComment);

    setForm(createInitialCommentForm(postId));

    onSuccess?.();

    showNotification("Comment added successfully");
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
