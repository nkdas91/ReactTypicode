import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import type { User } from "../types/User";
import { useEffect, useState } from "react";
import TextField from "./TextField";
import axios from "axios";

const UserEdit = () => {
  const { id } = useParams();
  const { data: user } = useUser(id ? parseInt(id) : null);
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

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

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!form) return;

    try {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${id}`, form)
        .then((res) => console.log(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-100 rounded-lg">
      <Link to={`/users/${id}`}>
        <ArrowLeftCircleIcon className="size-12 text-indigo-500" />
      </Link>

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

        {user?.address && (
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
        )}

        <div className="flex justify-end gap-2">
          <button className="bg-indigo-500 px-4 py-2 text-white rounded-full cursor-pointer hover:bg-indigo-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
