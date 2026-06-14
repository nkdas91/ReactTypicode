import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";

import PostListItem from "./PostListItem";

vi.mock("../../hooks/users/useUser", () => ({
  default: () => ({ data: { id: 10, name: "John" } }),
}));

const post = {
  id: 1,
  title: "Test Post",
  body: "Body",
  userId: 10,
};

describe("PostListItem accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <ul>
          <PostListItem
            post={post}
            favourites={[]}
            toggleFavourite={() => {}}
            onDelete={() => {}}
          />
        </ul>
      </MemoryRouter>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
