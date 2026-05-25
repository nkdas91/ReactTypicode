import { useNavigate } from "react-router-dom";
import useNotification from "../context/useNotification";
import userService from "../services/userService";
import type { User } from "../types/User";
import useUserForm from "./useUserForm";

/**
 * Initial empty form state for creating users.
 */
const initialUserForm: User = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: {
    suite: "",
    street: "",
    city: "",
    zipcode: "",
  },
} as User;

/**
 * Hook for handling create user form logic.
 *
 * Responsibilities:
 * - form state
 * - validation
 * - submit handling
 * - notifications
 * - navigation
 */
export default function useCreateUserForm() {
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
  } = useUserForm(initialUserForm);

  /**
   * Handles form submission for creating a user.
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
       * Create new user.
       */
      await userService.post(form);

      showNotification("User created");

      /**
       * Redirect to user list page.
       */
      navigate("/users");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to create user",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    /**
     * Non-null assertion is safe here because
     * create form always starts with initial values.
     */
    form: form!,
    errors,
    loading,
    handleChange,
    handleAddressChange,
    handleSubmit,
  };
}
