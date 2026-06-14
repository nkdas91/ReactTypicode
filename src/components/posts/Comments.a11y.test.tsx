import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Comments from "./Comments";

vi.mock("../../hooks/posts/usePostComments", () => ({
  default: () => ({
    comments: [],
    isLoading: false,
    formVisible: false,
    toggleFormVisibility: () => {},
    form: {},
    errors: {},
    handleChange: () => {},
    handleBlur: () => {},
    handleSubmit: () => {},
  }),
}));

describe("Comments accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Comments id={1} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
