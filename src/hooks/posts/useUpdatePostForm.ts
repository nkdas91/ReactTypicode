import { useNavigate } from "react-router-dom";
import useNotification from "../../context/useNotification";
import postService from "../../services/postService";
import type { Post } from "../../types/Post";
import usePostForm from "./usePostForm";

/**
 * Hook for handling update post form logic.
 *
 * Responsibilities:
 * - form state management
 * - validation
 * - submit handling
 * - notifications
 * - navigation after update
 *
 * @param {number} id - ID of the post being updated
 * @param {Post | null} [initialForm] - Initial form data (optional, can be null while loading)
 * @returns {{
 *   form: Post | null;
 *   errors: Record<string, string>;
 *   loading: boolean;
 *   handleChange: (name: string, value: string) => void;
 *   handleBlur: (name: string, value: string) => void;
 *   handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
 * }} Update post form state and handlers
 */
export default function useUpdatePostForm(
  id: number,
  initialForm?: Post | null,
) {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  /**
   * Shared post form logic (state + validation).
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
   *
   * @param {React.SubmitEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    /**
     * Stop submission if validation fails or form is not ready.
     */
    if (!validateForm() || !form) {
      return;
    }

    setLoading(true);

    try {
      /**
       * Sends updated post data to API.
       */
      await postService.patch(id, form);

      showNotification("Post updated");

      /**
       * Navigate back to post detail page.
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
