import type { Address } from "../../types/Address";
import Button from "../Button";
import TextField from "../TextField";

interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address?: Address;
}

interface UserFormProps {
  form: UserFormData;
  errors: Record<string, string>;
  loading: boolean;
  handleChange: (name: string, value: string) => void;
  handleAddressChange: (name: string, value: string) => void;
  handleBlur: (name: string, value: string) => void;
  handleAddressBlur: (name: string, value: string) => void;
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

/**
 * Shared user form used by both create and update user pages.
 *
 * Responsible only for rendering form fields and forwarding
 * user interactions to the parent form hook.
 */
export default function UserForm({
  form,
  errors,
  loading,
  handleChange,
  handleAddressChange,
  handleBlur,
  handleAddressBlur,
  handleSubmit,
}: UserFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid form-section mt-card">
        <TextField
          label="Name"
          type="text"
          name="name"
          value={form.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextField
          label="Username"
          type="text"
          name="username"
          value={form.username}
          error={errors.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="form-section">
        <h2 className="section-title">Contact</h2>

        <div className="form-grid">
          <TextField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            label="Phone"
            type="text"
            name="phone"
            value={form.phone}
            error={errors.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            label="Website"
            type="text"
            name="website"
            value={form.website}
            error={errors.website}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {form.address && (
        <div className="form-section">
          <h2 className="section-title">Address</h2>

          <div className="form-grid">
            <TextField
              label="Suite"
              type="text"
              name="suite"
              value={form.address.suite}
              error={errors["address.suite"]}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
            />

            <TextField
              label="Street"
              type="text"
              name="street"
              value={form.address.street}
              error={errors["address.street"]}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
            />

            <TextField
              label="City"
              type="text"
              name="city"
              value={form.address.city}
              error={errors["address.city"]}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
            />

            <TextField
              label="Zip"
              type="text"
              name="zipcode"
              value={form.address.zipcode}
              error={errors["address.zipcode"]}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading} variant="secondary">
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
