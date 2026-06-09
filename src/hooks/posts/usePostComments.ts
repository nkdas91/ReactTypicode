import { useMemo, useState } from "react";
import type { Comment } from "../../types/Comment";
import useCommentForm from "./useCommentForm";
import useComments from "./useComments";
import useLocalStorage from "./useLocalStorage";

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
   * Merge local + API comments.
   */
  const allComments = useMemo(() => {
    const comments = commentsResponse?.data ?? [];

    return [...savedComments, ...comments];
  }, [savedComments, commentsResponse?.data]);

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
  const { form, errors, handleChange, handleBlur, handleSubmit } =
    useCommentForm(postId, allComments.length, addComment, () => {
      setFormVisible(false);
    });

  return {
    comments: allComments,
    isLoading,
    formVisible,
    toggleFormVisibility,
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
