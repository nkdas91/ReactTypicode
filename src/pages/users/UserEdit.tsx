import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import TextField from "../../components/TextField";
import useNotification from "../../context/useNotification";
import useUser from "../../hooks/useUser";
import { userSchema } from "../../schemas/userSchema";
import userService from "../../services/userService";
import type { User } from "../../types/User";
import { validateSchema } from "../../utils/validateSchema";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: user, error, isLoading } = useUser(Number(id));
  const { showNotification } = useNotification();

  useEffect(() => {
    if (user && !form) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(user);
    }
  }, [user, form]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) return <p role="alert">{error.message}</p>;

  if (!user && !isLoading) {
    return <div className="text-center">User not found</div>;
  }

  const handleChange = (name: string, value: string) => {
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
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
      setLoading(true);
      return;
    }

    setErrors({});

    try {
      await userService.patch(Number(id), form);

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

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-100 rounded-lg">
      <BackButton url="/users" label="Back to Users" />

      <form onSubmit={handleSubmit}>
        <div className="mb-6 mt-4 grid md:grid-cols-2 gap-2">
          <TextField
            label="Name"
            type="text"
            name="name"
            value={form?.name}
            error={errors?.name}
            onChange={handleChange}
          />

          <TextField
            label="Username"
            type="text"
            name="username"
            value={form?.username}
            error={errors?.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Contact</h2>
          <div className="grid md:grid-cols-2 gap-2">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={form?.email}
              error={errors?.email}
              onChange={handleChange}
            />

            <TextField
              label="Phone"
              type="text"
              name="phone"
              value={form?.phone}
              error={errors?.phone}
              onChange={handleChange}
            />

            <TextField
              label="Website"
              type="text"
              name="website"
              value={form?.website}
              error={errors?.website}
              onChange={handleChange}
            />
          </div>
        </div>

        {form?.address && (
          <div>
            <h2 className="text-lg font-medium mb-2">Address</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <TextField
                label="Suite"
                type="text"
                name="suite"
                value={form?.address?.suite}
                error={errors["address.suite"]}
                onChange={handleAddressChange}
              />

              <TextField
                label="Street"
                type="text"
                name="street"
                value={form?.address?.street}
                error={errors["address.street"]}
                onChange={handleAddressChange}
              />

              <TextField
                label="City"
                type="text"
                name="city"
                value={form?.address?.city}
                error={errors["address.city"]}
                onChange={handleAddressChange}
              />

              <TextField
                label="Zip"
                type="text"
                name="zipcode"
                value={form?.address?.zipcode}
                error={errors["address.zipcode"]}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={loading} variant="secondary">
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
