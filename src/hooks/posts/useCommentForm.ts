import { useState } from "react";
import useNotification from "../../context/useNotification";
import { commentSchema } from "../../schemas/commentSchema";
import type { Comment } from "../../types/Comment";
import useFormValidation from "../forms/useFormValidation";

/**
 * Creates the initial state for a comment form.
 *
 * @param {number} postId - ID of the post the comment belongs to
 * @returns {Comment} Initial comment form state
 */
const createInitialCommentForm = (postId: number): Comment => ({
  postId,
  id: 0,
  name: "",
  body: "",
  email: "",
});

/**
 * Custom hook for managing comment form state, validation, and submission.
 *
 * Handles:
 * - form state management
 * - field-level validation
 * - full-form validation
 * - submission handling
 * - notifications
 *
 * @param {number} postId - ID of the post being commented on
 * @param {number} commentsCount - Current number of comments (used for ID generation)
 * @param {(comment: Comment) => void} onAddComment - Callback when a new comment is added
 * @param {() => void} [onSuccess] - Optional callback after successful submission
 * @returns {{
 *   form: Comment;
 *   errors: Record<string, string>;
 *   handleChange: (name: string, value: string) => void;
 *   handleBlur: (name: string, value: string) => void;
 *   handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
 * }} Comment form state and handlers
 */
export default function useCommentForm(
  postId: number,
  commentsCount: number,
  onAddComment: (comment: Comment) => void,
  onSuccess?: () => void,
) {
  /**
   * Form state for the comment.
   */
  const [form, setForm] = useState<Comment>(createInitialCommentForm(postId));

  /**
   * Form validation utilities and error state.
   */
  const { errors, validateField, validateForm } = useFormValidation(
    commentSchema,
    () => form,
  );

  const { showNotification } = useNotification();

  /**
   * Updates form state and immediately validates the changed field.
   *
   * @param {string} name - Name of the form field
   * @param {string} value - New value of the field
   */
  const handleChange = (name: string, value: string) => {
    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      validateField(name, updatedForm);

      return updatedForm;
    });
  };

  /**
   * Validates a field when it loses focus.
   *
   * @param {string} name - Field name
   * @param {string} value - Field value
   */
  const handleBlur = (name: string, value: string) => {
    validateField(name, {
      ...form,
      [name]: value,
    });
  };

  /**
   * Handles form submission.
   *
   * Validates the form, creates a new comment,
   * resets state, and triggers callbacks/notifications.
   *
   * @param {React.SubmitEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
