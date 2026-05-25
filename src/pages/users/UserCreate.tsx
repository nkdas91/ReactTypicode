import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import useCreateUserForm from "../../hooks/users/useCreateUserForm";

const UserCreate = () => {
  const {
    form,
    errors,
    loading,
    handleChange,
    handleAddressChange,
    handleSubmit,
  } = useCreateUserForm();

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
