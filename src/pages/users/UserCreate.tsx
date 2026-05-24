import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import TextField from "../../components/TextField";
import { userSchema } from "../../schemas/userSchema";
import type { User } from "../../types/User";
import { validateSchema } from "../../utils/validateSchema";
import userService from "../../services/userService";
import useNotification from "../../context/useNotification";
import Button from "../../components/Button";

const INITIAL_USER_FORM = {
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
};

const UserCreate = () => {
  const [form, setForm] = useState<User>(INITIAL_USER_FORM as User);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
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

    setLoading(true);

    const validation = validateSchema(userSchema, form);

    if (!validation.success) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      await userService.post(form);

      showNotification("User added");

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

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-100 rounded-lg">
      <BackButton url="/users" label="Back to Users" />

      <form onSubmit={handleSubmit}>
        <div className="mb-6 mt-4 grid md:grid-cols-2 gap-2">
          <TextField
            label="Name"
            type="text"
            name="name"
            value={form.name}
            error={errors?.name}
            onChange={handleChange}
          />

          <TextField
            label="Username"
            type="text"
            name="username"
            value={form.username}
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
              value={form.email}
              error={errors?.email}
              onChange={handleChange}
            />

            <TextField
              label="Phone"
              type="text"
              name="phone"
              value={form.phone}
              error={errors?.phone}
              onChange={handleChange}
            />

            <TextField
              label="Website"
              type="text"
              name="website"
              value={form.website}
              error={errors?.website}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Address</h2>
          <div className="grid md:grid-cols-2 gap-2">
            <TextField
              label="Suite"
              type="text"
              name="suite"
              value={form.address?.suite}
              error={errors["address.suite"]}
              onChange={handleAddressChange}
            />

            <TextField
              label="Street"
              type="text"
              name="street"
              value={form.address?.street}
              error={errors["address.street"]}
              onChange={handleAddressChange}
            />

            <TextField
              label="City"
              type="text"
              name="city"
              value={form.address?.city}
              error={errors["address.city"]}
              onChange={handleAddressChange}
            />

            <TextField
              label="Zip"
              type="text"
              name="zipcode"
              value={form.address?.zipcode}
              error={errors["address.zipcode"]}
              onChange={handleAddressChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={loading} variant="secondary">
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
