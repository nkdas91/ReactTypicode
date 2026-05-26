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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { showNotification } = useNotification();

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    handleSubmit,
  };
}
