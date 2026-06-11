import { useNavigate } from "react-router-dom";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";
import type { User } from "../../types/User";
import useUserForm from "./useUserForm";

/**
 * Hook for handling update user form logic.
 *
 * Responsibilities:
 * - form state management
 * - validation
 * - submit handling
 * - notifications
 * - navigation after update
 *
 * @param {number} id - ID of the user being updated
 * @param {User | null} [initialForm] - Initial form data (optional, can be null while loading)
 * @returns {{
 *   form: User | null;
 *   errors: Record<string, string>;
 *   loading: boolean;
 *   handleChange: (name: string, value: string) => void;
 *   handleAddressChange: (name: string, value: string) => void;
 *   handleBlur: (name: string, value: string) => void;
 *   handleAddressBlur: (name: string, value: string) => void;
 *   handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
 * }} Update user form state and handlers
 */
export default function useUpdateUserForm(
  id: number,
  initialForm?: User | null,
) {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  /**
   * Shared user form logic (state + validation).
   */
  const {
    form,
    errors,
    loading,
    setLoading,
    handleChange,
    handleAddressChange,
    handleBlur,
    handleAddressBlur,
    validateForm,
  } = useUserForm(initialForm ?? null);

  /**
   * Handles form submission for updating a user.
   *
   * @param {React.SubmitEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
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
       * Sends updated user data to API.
       */
      await userService.patch(id, form);

      showNotification("User updated");

      /**
       * Navigate back to user detail page.
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
    handleBlur,
    handleAddressBlur,
    handleSubmit,
  };
}
