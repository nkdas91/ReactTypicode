import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import TextField from "../../components/TextField";
import type { User } from "../../types/User";

interface UserCreateProps {
  onSubmit: (form: User) => void;
}

const UserCreate = ({ onSubmit }: UserCreateProps) => {
  const [form, setForm] = useState<User>({
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
  } as User);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

    try {
      const result = await onSubmit(form);

      // optional: only navigate if success
      navigate("/users/");
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
        <div className="mb-6 mt-4 grid md:grid-cols-2">
          <TextField
            label="Name"
            type="text"
            name="name"
            value={form?.name}
            handleChange={handleChange}
          />

          <TextField
            label="Username"
            type="text"
            name="username"
            value={form?.username}
            handleChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Contact</h2>
          <div className="grid md:grid-cols-2">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={form?.email}
              handleChange={handleChange}
            />

            <TextField
              label="Phone"
              type="text"
              name="phone"
              value={form?.phone}
              handleChange={handleChange}
            />

            <TextField
              label="Website"
              type="text"
              name="website"
              value={form?.website}
              handleChange={handleChange}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Address</h2>
          <div className="grid md:grid-cols-2">
            <TextField
              label="Suite"
              type="text"
              name="suite"
              value={form?.address?.suite}
              handleChange={handleAddressChange}
            />

            <TextField
              label="Street"
              type="text"
              name="street"
              value={form?.address?.street}
              handleChange={handleAddressChange}
            />

            <TextField
              label="City"
              type="text"
              name="city"
              value={form?.address?.city}
              handleChange={handleAddressChange}
            />

            <TextField
              label="Zip"
              type="text"
              name="zipcode"
              value={form?.address?.zipcode}
              handleChange={handleAddressChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            disabled={loading}
            className={`px-4 py-2 rounded-full transition
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

export default UserCreate;
