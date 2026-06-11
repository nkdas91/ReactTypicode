import { useState } from "react";
import useNotification from "../../context/useNotification";
import postService from "../../services/postService";

/**
 * Options for useDeletePost hook.
 */
interface UseDeletePostOptions {
  /**
   * Callback triggered after successful deletion.
   */
  onSuccess?: () => void;
}

/**
 * Custom hook for handling post deletion with confirmation flow.
 *
 * Provides:
 * - confirmation modal state
 * - delete request handling
 * - API deletion
 * - success/error notifications
 *
 * @param {UseDeletePostOptions} [options] - Hook configuration options
 * @returns {{
 *   isConfirmOpen: boolean;
 *   requestDelete: (id: number) => void;
 *   cancelDelete: () => void;
 *   confirmDelete: () => Promise<void>;
 * }} Delete workflow state and actions
 */
export default function useDeletePost({
  onSuccess,
}: UseDeletePostOptions = {}) {
  const { showNotification } = useNotification();

  /**
   * Controls visibility of the delete confirmation modal.
   */
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  /**
   * Currently selected post ID for deletion.
   */
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  /**
   * Opens the confirmation modal for a specific post.
   *
   * @param {number} id - ID of the post to delete
   */
  const requestDelete = (id: number) => {
    setSelectedPostId(id);
    setIsConfirmOpen(true);
  };

  /**
   * Cancels deletion and resets selected post state.
   */
  const cancelDelete = () => {
    setSelectedPostId(null);
    setIsConfirmOpen(false);
  };

  /**
   * Confirms deletion of the selected post.
   *
   * Calls API, shows notifications, and triggers success callback if provided.
   *
   * @returns {Promise<void>}
   */
  const confirmDelete = async (): Promise<void> => {
    if (selectedPostId === null) {
      return;
    }

    try {
      await postService.delete(selectedPostId);

      showNotification("Post deleted");

      onSuccess?.();

      cancelDelete();
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to delete post",
        "error",
      );
    }
  };

  return {
    isConfirmOpen,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
