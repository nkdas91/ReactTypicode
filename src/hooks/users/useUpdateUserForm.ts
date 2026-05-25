import { useNavigate } from "react-router-dom";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";
import type { User } from "../../types/User";
import useUserForm from "./useUserForm";

/**
 * Hook for handling update user form logic.
 *
 * Responsibilities:
 * - form state
 * - validation
 * - submit handling
 * - notifications
 * - navigation
 */
export default function useUpdateUserForm(
  id: number,
  initialForm?: User | null,
) {
  const navigate = useNavigate();

  const { showNotification } = useNotification();

  /**
   * Shared user form logic.
   */
  const {
    form,
    errors,
    loading,
    setLoading,
    handleChange,
    handleAddressChange,
    validateForm,
  } = useUserForm(initialForm ?? null);

  /**
   * Handles form submission for updating a user.
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
       * Update existing user.
       */
      await userService.patch(id, form);

      showNotification("User updated");

      /**
       * Redirect back to user details page.
       */
      navigate(`/users/${id}`);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to update user",
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
    handleAddressChange,
    handleSubmit,
  };
}
