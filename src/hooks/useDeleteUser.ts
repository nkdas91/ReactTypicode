import useNotification from "../context/useNotification";
import userService from "../services/userService";

export default function useDeleteUser(refetch: () => void) {
  const { showNotification } = useNotification();

  const deleteUser = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await userService.delete(id);

      showNotification("User deleted");

      refetch();
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to delete user",
        "error",
      );
    }
  };

  return deleteUser;
}
