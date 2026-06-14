import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";

import type { Comment } from "../../types/Comment";

import CommentList from "./CommentList";

const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    name: "John Doe",
    email: "john@example.com",
    body: "Great post!",
  },
];

describe("CommentList accessibility", () => {
  it("has no accessibility violations when comments exist", async () => {
    const { container } = render(<CommentList comments={comments} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations when there are no comments", async () => {
    const { container } = render(<CommentList comments={[]} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
