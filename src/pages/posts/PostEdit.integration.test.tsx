import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import PostEdit from "./PostEdit";

import usePost from "../../hooks/posts/usePost";
import useUpdatePostForm from "../../hooks/posts/useUpdatePostForm";

vi.mock("../../hooks/posts/usePost");
vi.mock("../../hooks/posts/useUpdatePostForm");

const mockPost = {
  id: 1,
  title: "Test Post",
  body: "This is a test post body",
  userId: 1,
};

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={["/posts/edit/1"]}>
      <Routes>
        <Route path="/posts/edit/:id" element={<PostEdit />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("PostEdit integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading skeleton while fetching post", () => {
    vi.mocked(usePost).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as ReturnType<typeof usePost>);

    vi.mocked(useUpdatePostForm).mockReturnValue({
      form: null,
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });

    renderComponent();

    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("shows error message when loading post fails", () => {
    vi.mocked(usePost).mockReturnValue({
      data: undefined,
      error: new Error("Failed to load post"),
      isLoading: false,
    } as ReturnType<typeof usePost>);

    vi.mocked(useUpdatePostForm).mockReturnValue({
      form: null,
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText("Failed to load post")).toBeInTheDocument();
  });

  it("shows not found message when post does not exist", () => {
    vi.mocked(usePost).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    } as ReturnType<typeof usePost>);

    vi.mocked(useUpdatePostForm).mockReturnValue({
      form: null,
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText("Post not found")).toBeInTheDocument();
  });

  it("renders post form with existing data", () => {
    vi.mocked(usePost).mockReturnValue({
      data: mockPost,
      error: null,
      isLoading: false,
    } as ReturnType<typeof usePost>);

    vi.mocked(useUpdatePostForm).mockReturnValue({
      form: mockPost,
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });

    renderComponent();

    expect(screen.getByDisplayValue("Test Post")).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("This is a test post body"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeInTheDocument();
  });

  it("submits updated post data", () => {
    const handleSubmit = vi.fn((event) => event.preventDefault());

    vi.mocked(usePost).mockReturnValue({
      data: mockPost,
      error: null,
      isLoading: false,
    } as ReturnType<typeof usePost>);

    vi.mocked(useUpdatePostForm).mockReturnValue({
      form: {
        ...mockPost,
        title: "Updated Title",
      },
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleSubmit,
    });

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("shows saving state while updating", () => {
    vi.mocked(usePost).mockReturnValue({
      data: mockPost,
      error: null,
      isLoading: false,
    } as ReturnType<typeof usePost>);

    vi.mocked(useUpdatePostForm).mockReturnValue({
      form: mockPost,
      errors: {},
      loading: true,
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });

    renderComponent();

    expect(
      screen.getByRole("button", {
        name: "Saving...",
      }),
    ).toBeDisabled();
  });
});
