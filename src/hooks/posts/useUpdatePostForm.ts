import { useNavigate } from "react-router-dom";
import useNotification from "../../context/useNotification";
import postService from "../../services/postService";
import type { Post } from "../../types/Post";
import usePostForm from "./usePostForm";

/**
 * Hook for handling update post form logic.
 *
 * Responsibilities:
 * - form state
 * - validation
 * - submit handling
 * - notifications
 * - navigation
 */
export default function useUpdatePostForm(
  id: number,
  initialForm?: Post | null,
) {
  const navigate = useNavigate();

  const { showNotification } = useNotification();

  /**
   * Shared post form logic.
   */
  const {
    form,
    errors,
    loading,
    setLoading,
    handleChange,
    handleBlur,
    validateForm,
  } = usePostForm(initialForm ?? null);

  /**
   * Handles form submission for updating a post.
   */
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    /**
     * Stop submission if validation fails.
     */
    if (!validateForm() || !form) {
      return;
    }

    setLoading(true);

    try {
      /**
       * Update existing post.
       */
      await postService.patch(id, form);

      showNotification("Post updated");

      /**
       * Redirect back to post details page.
       */
      navigate(`/posts/${id}`);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to update post",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
