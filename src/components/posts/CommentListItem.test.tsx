import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import CommentListItem from "./CommentListItem";
import type { Comment } from "../../types/Comment";

describe("CommentListItem", () => {
  const mockComment: Comment = {
    id: 1,
    postId: 1,
    name: "John Doe",
    email: "john@example.com",
    body: "This is a test comment.",
  };

  it("renders comment details", () => {
    render(<CommentListItem comment={mockComment} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("john@example.com")).toBeInTheDocument();

    expect(screen.getByText("This is a test comment.")).toBeInTheDocument();
  });

  it("renders multiline comment body", () => {
    render(
      <CommentListItem
        comment={{
          ...mockComment,
          body: "Line one\nLine two",
        }}
      />,
    );

    const body = screen.getByText(/Line one/);

    expect(body).toHaveTextContent("Line one");
    expect(body).toHaveTextContent("Line two");
  });
});
