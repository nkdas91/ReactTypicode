import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import TextField from "../../components/TextField";
import { userSchema } from "../../schemas/userSchema";
import type { User } from "../../types/User";
import { validateSchema } from "../../utils/validateSchema";

interface UserEditProps {
  users: User[];
  isLoading: boolean;
  onSubmit: (form: User | null, id: number) => void;
}

const UserEdit = ({ users, isLoading, onSubmit }: UserEditProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const user = users.find((u) => u.id === Number(id));

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

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

    setLoading(true);

    const validation = validateSchema(userSchema, form);

    if (!validation.success) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      await onSubmit(form, Number(id));

      navigate(`/users/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-100 rounded-lg">
      <BackButton />

      <form onSubmit={handleSubmit}>
        <div className="mb-6 mt-4 grid md:grid-cols-2 gap-2">
          <TextField
            label="Name"
            type="text"
            name="name"
            value={form?.name}
            error={errors?.name}
            handleChange={handleChange}
          />

          <TextField
            label="Username"
            type="text"
            name="username"
            value={form?.username}
            error={errors?.username}
            handleChange={handleChange}
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
              handleChange={handleChange}
            />

            <TextField
              label="Phone"
              type="text"
              name="phone"
              value={form?.phone}
              error={errors?.phone}
              handleChange={handleChange}
            />

            <TextField
              label="Website"
              type="text"
              name="website"
              value={form?.website}
              error={errors?.website}
              handleChange={handleChange}
            />
          </div>
        </div>

        {user?.address && (
          <div>
            <h2 className="text-lg font-medium mb-2">Address</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <TextField
                label="Suite"
                type="text"
                name="suite"
                value={form?.address?.suite}
                error={errors["address.suite"]}
                handleChange={handleAddressChange}
              />

              <TextField
                label="Street"
                type="text"
                name="street"
                value={form?.address?.street}
                error={errors["address.street"]}
                handleChange={handleAddressChange}
              />

              <TextField
                label="City"
                type="text"
                name="city"
                value={form?.address?.city}
                error={errors["address.city"]}
                handleChange={handleAddressChange}
              />

              <TextField
                label="Zip"
                type="text"
                name="zipcode"
                value={form?.address?.zipcode}
                error={errors["address.zipcode"]}
                handleChange={handleAddressChange}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            disabled={loading}
            className={`px-4 py-2 rounded-full transition cursor-pointer
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }
            `}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
