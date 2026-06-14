import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

const baseForm = {
  name: "John",
  username: "john",
  email: "john@test.com",
  phone: "123",
  website: "https://test.com",
  address: {
    suite: "1",
    street: "Main",
    city: "NY",
    zipcode: "10001",
  },
};

describe("UserForm", () => {
  it("renders all main fields", () => {
    render(
      <UserForm
        form={baseForm}
        errors={{}}
        loading={false}
        handleChange={vi.fn()}
        handleAddressChange={vi.fn()}
        handleBlur={vi.fn()}
        handleAddressBlur={vi.fn()}
        handleSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Website")).toBeInTheDocument();
  });

  it("renders address section when address exists", () => {
    render(
      <UserForm
        form={baseForm}
        errors={{}}
        loading={false}
        handleChange={vi.fn()}
        handleAddressChange={vi.fn()}
        handleBlur={vi.fn()}
        handleAddressBlur={vi.fn()}
        handleSubmit={vi.fn()}
      />,
    );

    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Street")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("Zip")).toBeInTheDocument();
  });

  it("does not render address section when missing", () => {
    const formWithoutAddress = { ...baseForm, address: undefined };

    render(
      <UserForm
        form={formWithoutAddress}
        errors={{}}
        loading={false}
        handleChange={vi.fn()}
        handleAddressChange={vi.fn()}
        handleBlur={vi.fn()}
        handleAddressBlur={vi.fn()}
        handleSubmit={vi.fn()}
      />,
    );

    expect(screen.queryByText("Address")).not.toBeInTheDocument();
  });

  it("calls handleSubmit on form submit", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <UserForm
        form={baseForm}
        errors={{}}
        loading={false}
        handleChange={vi.fn()}
        handleAddressChange={vi.fn()}
        handleBlur={vi.fn()}
        handleAddressBlur={vi.fn()}
        handleSubmit={handleSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("shows loading state on button", () => {
    render(
      <UserForm
        form={baseForm}
        errors={{}}
        loading={true}
        handleChange={vi.fn()}
        handleAddressChange={vi.fn()}
        handleBlur={vi.fn()}
        handleAddressBlur={vi.fn()}
        handleSubmit={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /saving/i })).toBeInTheDocument();
  });
});
