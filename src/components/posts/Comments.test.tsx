import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import Comments from "./Comments";
import usePostComments from "../../hooks/posts/usePostComments";
import type { Comment as CommentType } from "../../types/Comment";

vi.mock("../../hooks/posts/usePostComments");

vi.mock("./CommentForm", () => ({
  default: () => <div data-testid="comment-form" />,
}));

vi.mock("./CommentList", () => ({
  default: ({ comments }: { comments: CommentType[] }) => (
    <div data-testid="comment-list">{comments.length}</div>
  ),
}));

describe("Comments", () => {
  const mockComment: CommentType = {
    id: 1,
    postId: 1,
    name: "John Doe",
    email: "john@example.com",
    body: "Test comment",
  };

  const baseMock = {
    comments: [mockComment],
    isLoading: false,
    formVisible: false,
    toggleFormVisibility: vi.fn(),
    form: mockComment,
    errors: {},
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    handleSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows skeleton when loading", () => {
    vi.mocked(usePostComments).mockReturnValue({
      ...baseMock,
      isLoading: true,
    });

    render(<Comments id={1} />);

    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders comments section", () => {
    vi.mocked(usePostComments).mockReturnValue(baseMock);

    render(<Comments id={1} />);

    expect(screen.getByText("Comments")).toBeInTheDocument();

    expect(screen.getByTestId("comment-list")).toHaveTextContent("1");
  });

  it("toggles comment form visibility", async () => {
    const user = userEvent.setup();

    const toggleFormVisibility = vi.fn();

    vi.mocked(usePostComments).mockReturnValue({
      ...baseMock,
      toggleFormVisibility,
    });

    render(<Comments id={1} />);

    await user.click(
      screen.getByRole("button", {
        name: "Show comment form",
      }),
    );

    expect(toggleFormVisibility).toHaveBeenCalledTimes(1);
  });

  it("renders comment form when visible", () => {
    vi.mocked(usePostComments).mockReturnValue({
      ...baseMock,
      formVisible: true,
    });

    render(<Comments id={1} />);

    expect(screen.getByTestId("comment-form")).toBeInTheDocument();
  });

  it("uses hide label when form is visible", () => {
    vi.mocked(usePostComments).mockReturnValue({
      ...baseMock,
      formVisible: true,
    });

    render(<Comments id={1} />);

    expect(
      screen.getByRole("button", {
        name: "Hide comment form",
      }),
    ).toBeInTheDocument();
  });
});
