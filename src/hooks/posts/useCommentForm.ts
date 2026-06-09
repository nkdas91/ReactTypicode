import { useState } from "react";
import useNotification from "../../context/useNotification";
import { commentSchema } from "../../schemas/commentSchema";
import type { Comment } from "../../types/Comment";
import useFormValidation from "../forms/useFormValidation";

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

  const { errors, validateField, validateForm } = useFormValidation(
    commentSchema,
    () => form,
  );

  const { showNotification } = useNotification();

  /**
   * Updates form state and immediately re-validates
   * the field so errors disappear while typing.
   */
  const handleChange = (name: string, value: string) => {
    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);

    validateField(name, updatedForm);
  };

  /**
   * Validates a field when it loses focus.
   */
  const handleBlur = (name: string, value: string) => {
    validateField(name, {
      ...form,
      [name]: value,
    });
  };

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
