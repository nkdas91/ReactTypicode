import { useState } from "react";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";

interface UseDeleteUserOptions {
  onSuccess?: () => void;
}

export default function useDeleteUser({
  onSuccess,
}: UseDeleteUserOptions = {}) {
  const { showNotification } = useNotification();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  /**
   * Opens the confirmation modal for a user.
   */
  const requestDelete = (id: number) => {
    setSelectedUserId(id);
    setIsConfirmOpen(true);
  };

  /**
   * Closes the confirmation modal and clears selection.
   */
  const cancelDelete = () => {
    setSelectedUserId(null);
    setIsConfirmOpen(false);
  };

  /**
   * Deletes the selected user after confirmation.
   */
  const confirmDelete = async () => {
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
