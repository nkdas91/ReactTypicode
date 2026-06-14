import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Comment } from "../../types/Comment";

import CommentForm from "./CommentForm";

vi.mock("../TextField", () => ({
  default: ({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
  }: {
    label: string;
    name: string;
    value: string;
    error?: string;
    onChange: (name: string, value: string) => void;
    onBlur: (name: string, value: string) => void;
  }) => (
    <div>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name, value)}
      />

      {error && <span>{error}</span>}
    </div>
  ),
}));

vi.mock("../Button", () => ({
  default: ({
    children,
    disabled,
    type,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
  }) => (
    <button type={type} disabled={disabled}>
      {children}
    </button>
  ),
}));

const form: Comment = {
  id: 1,
  postId: 1,
  name: "John Doe",
  email: "john@example.com",
  body: "Test comment",
};

describe("CommentForm", () => {
  it("renders all form fields", () => {
    render(
      <CommentForm
        form={form}
        errors={{}}
        onChange={vi.fn()}
        onBlur={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
  });

  it("renders existing form values", () => {
    render(
      <CommentForm
        form={form}
        errors={{}}
        onChange={vi.fn()}
        onBlur={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Title")).toHaveValue("John Doe");

    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");

    expect(screen.getByLabelText("Comment")).toHaveValue("Test comment");
  });

  it("calls onChange when field value changes", () => {
    const onChange = vi.fn();

    render(
      <CommentForm
        form={form}
        errors={{}}
        onChange={onChange}
        onBlur={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: {
        value: "Updated title",
      },
    });

    expect(onChange).toHaveBeenCalledWith("name", "Updated title");
  });

  it("calls onBlur when field loses focus", () => {
    const onBlur = vi.fn();

    render(
      <CommentForm
        form={form}
        errors={{}}
        onBlur={onBlur}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    fireEvent.blur(screen.getByLabelText("Email"));

    expect(onBlur).toHaveBeenCalledWith("email", "john@example.com");
  });

  it("calls onSubmit when form is submitted", () => {
    const onSubmit = vi.fn((e) => e.preventDefault());

    render(
      <CommentForm
        form={form}
        errors={{}}
        onSubmit={onSubmit}
        onChange={vi.fn()}
        onBlur={vi.fn()}
      />,
    );

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    expect(onSubmit).toHaveBeenCalled();
  });

  it("shows saving state when loading", () => {
    render(
      <CommentForm
        form={form}
        errors={{}}
        loading
        onSubmit={vi.fn()}
        onChange={vi.fn()}
        onBlur={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Saving...",
      }),
    ).toBeDisabled();
  });

  it("displays validation errors", () => {
    render(
      <CommentForm
        form={form}
        errors={{
          email: "Invalid email",
        }}
        onSubmit={vi.fn()}
        onChange={vi.fn()}
        onBlur={vi.fn()}
      />,
    );

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});
