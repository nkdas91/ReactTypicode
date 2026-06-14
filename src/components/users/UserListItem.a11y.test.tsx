import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import UserListItem from "./UserListItem";

const user = {
  id: 1,
  name: "John Doe",
  username: "john",
  email: "john@test.com",
  phone: "123",
  website: "test.com",
  address: {
    suite: "1",
    street: "Street",
    city: "City",
    zipcode: "12345",
  },
};

describe("UserListItem accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <ul>
          <UserListItem user={user} onDelete={() => {}} />
        </ul>
      </MemoryRouter>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
