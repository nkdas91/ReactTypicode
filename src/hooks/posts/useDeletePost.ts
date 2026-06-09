import { useState } from "react";
import useNotification from "../../context/useNotification";
import postService from "../../services/postService";

interface UseDeletePostOptions {
  onSuccess?: () => void;
}

export default function useDeletePost({
  onSuccess,
}: UseDeletePostOptions = {}) {
  const { showNotification } = useNotification();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  /**
   * Opens the confirmation modal for a post.
   */
  const requestDelete = (id: number) => {
    setSelectedPostId(id);
    setIsConfirmOpen(true);
  };

  /**
   * Closes the confirmation modal.
   */
  const cancelDelete = () => {
    setSelectedPostId(null);
    setIsConfirmOpen(false);
  };

  /**
   * Deletes the selected post after confirmation.
   */
  const confirmDelete = async () => {
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
