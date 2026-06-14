import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Comment } from "../../types/Comment";

import CommentList from "./CommentList";

vi.mock("./CommentListItem", () => ({
  default: ({ comment }: { comment: Comment }) => (
    <li data-testid="comment-item">{comment.name}</li>
  ),
}));

const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    name: "John Doe",
    email: "john@example.com",
    body: "Great post!",
  },
  {
    id: 2,
    postId: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    body: "Very useful.",
  },
];

describe("CommentList", () => {
  it("renders empty state when there are no comments", () => {
    render(<CommentList comments={[]} />);

    expect(
      screen.getByText("This post doesn't have any comments."),
    ).toBeInTheDocument();
  });

  it("renders comments when comments are provided", () => {
    render(<CommentList comments={comments} />);

    const items = screen.getAllByTestId("comment-item");

    expect(items).toHaveLength(2);

    expect(items[0]).toHaveTextContent("John Doe");
    expect(items[1]).toHaveTextContent("Jane Smith");
  });

  it("renders comments inside an unordered list", () => {
    render(<CommentList comments={comments} />);

    expect(screen.getByRole("list")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
