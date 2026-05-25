import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotification from "../context/useNotification";
import { userSchema } from "../schemas/userSchema";
import userService from "../services/userService";
import type { User } from "../types/User";
import { validateSchema } from "../utils/validateSchema";

export default function useUpdateUserForm(
  id: number,
  initialForm?: User | null,
) {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [form, setForm] = useState<User | null>(initialForm ?? null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialForm && !form) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(initialForm);
    }
  }, [initialForm, form]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev,
    );
  };

  const handleAddressChange = (name: string, value: string) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            address: {
              ...prev.address,
              [name]: value,
            },
          }
        : prev,
    );
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form) {
      return;
    }

    setLoading(true);

    const validation = validateSchema(userSchema, form);

    if (!validation.success) {
      setErrors(validation.errors);

      setLoading(false);

      return;
    }

    setErrors({});

    try {
      await userService.patch(id, form);

      showNotification("User updated");

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
    setForm,
    errors,
    loading,
    handleChange,
    handleAddressChange,
    handleSubmit,
  };
}
