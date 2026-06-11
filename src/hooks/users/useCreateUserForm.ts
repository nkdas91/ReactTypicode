import { useNavigate } from "react-router-dom";
import useNotification from "../../context/useNotification";
import userService from "../../services/userService";
import type { User } from "../../types/User";
import useUserForm from "./useUserForm";

/**
 * Initial empty form state for creating a new user.
 *
 * Used to initialize the create user form with default values.
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
 * - form state management
 * - field validation
 * - nested address handling
 * - form submission
 * - notifications
 * - navigation after success
 *
 * @returns {{
 *   form: User;
 *   errors: Record<string, string>;
 *   loading: boolean;
 *   handleChange: (name: string, value: string) => void;
 *   handleAddressChange: (name: string, value: string) => void;
 *   handleBlur: (name: string, value: string) => void;
 *   handleAddressBlur: (name: string, value: string) => void;
 *   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
 * }} Create user form state and handlers
 */
export default function useCreateUserForm() {
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
  } = useUserForm(initialUserForm);

  /**
   * Handles form submission for creating a new user.
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
       * Sends new user data to API.
       */
      await userService.post(form);

      showNotification("User created");

      /**
       * Navigate to user list page after success.
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
     * Form state is guaranteed to be non-null in create flow.
     */
    form: form!,
    errors,
    loading,
    handleChange,
    handleAddressChange,
    handleBlur,
    handleAddressBlur,
    handleSubmit,
  };
}
