import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import PostListItem from "./PostListItem";
import useUser from "../../hooks/users/useUser";

vi.mock("../../hooks/users/useUser");

const post = {
  id: 1,
  title: "Test Post",
  body: "Post body",
  userId: 10,
};

const mockUser = {
  id: 10,
  name: "John Doe",
};

const mockUseUser = (data: typeof mockUser | undefined) => {
  vi.mocked(useUser).mockReturnValue({
    data,
  } as ReturnType<typeof useUser>);
};

describe("PostListItem", () => {
  it("renders post title link", () => {
    mockUseUser(undefined);

    render(
      <MemoryRouter>
        <PostListItem
          post={post}
          favourites={[]}
          toggleFavourite={vi.fn()}
          onDelete={vi.fn()}
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", {
      name: "Test Post",
    });

    expect(link).toHaveAttribute("href", "/posts/1");
  });

  it("renders user link when user exists", () => {
    mockUseUser(mockUser);

    render(
      <MemoryRouter>
        <PostListItem
          post={post}
          favourites={[]}
          toggleFavourite={vi.fn()}
          onDelete={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", {
        name: "John Doe",
      }),
    ).toHaveAttribute("href", "/users/10");
  });

  it("does not render user when missing", () => {
    mockUseUser(undefined);

    render(
      <MemoryRouter>
        <PostListItem
          post={post}
          favourites={[]}
          toggleFavourite={vi.fn()}
          onDelete={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("link", {
        name: "John Doe",
      }),
    ).not.toBeInTheDocument();
  });

  it("toggles favourite", async () => {
    const user = userEvent.setup();
    const toggleFavourite = vi.fn();

    mockUseUser(undefined);

    render(
      <MemoryRouter>
        <PostListItem
          post={post}
          favourites={[]}
          toggleFavourite={toggleFavourite}
          onDelete={vi.fn()}
        />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /add to favorites/i,
      }),
    );

    expect(toggleFavourite).toHaveBeenCalledWith(1);
  });

  it("calls delete handler", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    mockUseUser(undefined);

    render(
      <MemoryRouter>
        <PostListItem
          post={post}
          favourites={[]}
          toggleFavourite={vi.fn()}
          onDelete={onDelete}
        />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /delete post/i,
      }),
    );

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
