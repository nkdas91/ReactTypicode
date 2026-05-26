import { useMemo, useState } from "react";

import useComments from "./useComments";
import useCommentForm from "./useCommentForm";
import useLocalStorage from "./useLocalStorage";

import type { Comment } from "../../types/Comment";

export default function usePostComments(postId: number) {
  /**
   * Fetch API comments.
   */
  const { data: commentsResponse, isLoading } = useComments(postId);

  /**
   * Local persisted comments.
   */
  const [savedComments, setSavedComments] = useLocalStorage<Comment[]>(
    `comments_${postId}`,
    [],
  );

  /**
   * Toggle add comment form.
   */
  const [formVisible, setFormVisible] = useState(false);

  /**
   * API comments array.
   */
  const comments = commentsResponse?.data ?? [];

  /**
   * Merge local + API comments.
   */
  const allComments = useMemo(
    () => [...savedComments, ...comments],
    [savedComments, comments],
  );

  /**
   * Add comment handler.
   */
  const addComment = (comment: Comment) => {
    setSavedComments((prev) => [...prev, comment]);
  };

  /**
   * Toggle comment form visibility.
   */
  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
  };

  /**
   * Comment form logic.
   */
  const { form, errors, handleChange, handleSubmit } = useCommentForm(
    postId,
    allComments.length,
    addComment,
    () => {
      setFormVisible(false);
    },
  );

  return {
    comments: allComments,
    isLoading,
    formVisible,
    toggleFormVisibility,
    form,
    errors,
    handleChange,
    handleSubmit,
  };
}
