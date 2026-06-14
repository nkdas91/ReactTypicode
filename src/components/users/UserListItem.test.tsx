import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("UserListItem", () => {
  it("renders user name as link", () => {
    render(
      <MemoryRouter>
        <UserListItem user={user} onDelete={() => {}} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", {
      name: "John Doe",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/users/1");
  });

  it("renders posts button link", () => {
    render(
      <MemoryRouter>
        <UserListItem user={user} onDelete={() => {}} />
      </MemoryRouter>,
    );

    const postsLink = screen.getByRole("link", {
      name: "Posts",
    });

    expect(postsLink).toHaveAttribute("href", "/posts?userId=1");
  });

  it("renders edit button link", () => {
    render(
      <MemoryRouter>
        <UserListItem user={user} onDelete={() => {}} />
      </MemoryRouter>,
    );

    const editBtn = screen.getByRole("link", {
      name: /edit user/i,
    });

    expect(editBtn).toHaveAttribute("href", "/users/1/edit");
  });

  it("calls onDelete when delete button clicked", async () => {
    const userEventInstance = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <MemoryRouter>
        <UserListItem user={user} onDelete={onDelete} />
      </MemoryRouter>,
    );

    await userEventInstance.click(
      screen.getByRole("button", {
        name: /delete user/i,
      }),
    );

    expect(onDelete).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});
