import { useMemo, useState } from "react";
import type { Comment } from "../../types/Comment";
import useCommentForm from "./useCommentForm";
import useComments from "./useComments";
import useLocalStorage from "./useLocalStorage";

/**
 * Custom hook that manages post comments from both API and local storage.
 *
 * Combines:
 * - API comments (server data)
 * - locally added comments (persisted in localStorage)
 * - comment form state and handlers
 *
 * @param {number} postId - ID of the post whose comments are being managed
 * @returns {{
 *   comments: Comment[];
 *   isLoading: boolean;
 *   formVisible: boolean;
 *   toggleFormVisibility: () => void;
 *   form: Comment;
 *   errors: Record<string, string>;
 *   handleChange: (name: string, value: string) => void;
 *   handleBlur: (name: string, value: string) => void;
 *   handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
 * }} Post comments state, merged data, and form handlers
 */
export default function usePostComments(postId: number) {
  /**
   * Fetch API comments.
   */
  const { data: commentsResponse, isLoading } = useComments(postId);

  /**
   * Locally persisted comments stored in localStorage.
   */
  const [savedComments, setSavedComments] = useLocalStorage<Comment[]>(
    `comments_${postId}`,
    [],
  );

  /**
   * Controls visibility of the comment form.
   */
  const [formVisible, setFormVisible] = useState<boolean>(false);

  /**
   * Combined list of API comments and locally added comments.
   */
  const allComments = useMemo<Comment[]>(() => {
    const comments = commentsResponse?.data ?? [];

    return [...savedComments, ...comments];
  }, [savedComments, commentsResponse?.data]);

  /**
   * Adds a new comment to local storage.
   *
   * @param {Comment} comment - New comment to add
   */
  const addComment = (comment: Comment) => {
    setSavedComments((prev) => [...prev, comment]);
  };

  /**
   * Toggles comment form visibility.
   */
  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
  };

  /**
   * Comment form logic and handlers.
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
