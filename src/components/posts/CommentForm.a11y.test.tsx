import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";

import type { Comment } from "../../types/Comment";

import CommentForm from "./CommentForm";

const form: Comment = {
  id: 1,
  postId: 1,
  name: "",
  email: "",
  body: "",
};

describe("CommentForm accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <CommentForm
        form={form}
        errors={{}}
        onSubmit={() => {}}
        onChange={() => {}}
        onBlur={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations with errors", async () => {
    const { container } = render(
      <CommentForm
        form={form}
        errors={{
          name: "Name is required",
          email: "Email is required",
        }}
        onSubmit={() => {}}
        onChange={() => {}}
        onBlur={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
