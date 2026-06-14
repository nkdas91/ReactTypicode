import { render } from "@testing-library/react";
import { axe } from "jest-axe";
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

describe("UserForm accessibility", () => {
  it("has no violations (full form)", async () => {
    const { container } = render(
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

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no violations (without address)", async () => {
    const formWithoutAddress = { ...baseForm, address: undefined };

    const { container } = render(
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

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
