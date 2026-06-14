import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal accessibility", () => {
  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <ConfirmModal
        isOpen={true}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={() => {}}
        onClose={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("does not render when closed", async () => {
    const { container } = render(
      <ConfirmModal
        isOpen={false}
        title="Delete User"
        message="Are you sure?"
        onConfirm={() => {}}
        onClose={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
