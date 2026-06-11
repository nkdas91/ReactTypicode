import { useState } from "react";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";

/**
 * Options for useDeleteUser hook.
 */
interface UseDeleteUserOptions {
  /**
   * Callback triggered after successful deletion.
   */
  onSuccess?: () => void;
}

/**
 * Custom hook for handling user deletion with confirmation flow.
 *
 * Responsibilities:
 * - confirmation modal state
 * - selected user tracking
 * - delete API call
 * - success/error notifications
 * - post-delete callback handling
 *
 * @param {UseDeleteUserOptions} [options] - Hook configuration options
 * @returns {{
 *   isConfirmOpen: boolean;
 *   requestDelete: (id: number) => void;
 *   cancelDelete: () => void;
 *   confirmDelete: () => Promise<void>;
 * }} User deletion state and actions
 */
export default function useDeleteUser({
  onSuccess,
}: UseDeleteUserOptions = {}) {
  const { showNotification } = useNotification();

  /**
   * Controls visibility of the confirmation modal.
   */
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  /**
   * Currently selected user ID for deletion.
   */
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  /**
   * Opens confirmation modal for a specific user.
   *
   * @param {number} id - User ID to delete
   */
  const requestDelete = (id: number) => {
    setSelectedUserId(id);
    setIsConfirmOpen(true);
  };

  /**
   * Cancels deletion and resets selected user state.
   */
  const cancelDelete = () => {
    setSelectedUserId(null);
    setIsConfirmOpen(false);
  };

  /**
   * Confirms deletion of selected user.
   *
   * Calls API, handles notifications, and triggers success callback.
   *
   * @returns {Promise<void>}
   */
  const confirmDelete = async (): Promise<void> => {
    if (selectedUserId === null) {
      return;
    }

    try {
      await userService.delete(selectedUserId);

      showNotification("User deleted");

      onSuccess?.();

      cancelDelete();
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to delete user",
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
