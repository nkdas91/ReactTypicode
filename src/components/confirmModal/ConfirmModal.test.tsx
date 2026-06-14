import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal", () => {
  const defaultProps = {
    isOpen: true,
    title: "Delete User",
    message: "Are you sure you want to delete this user?",
    onConfirm: vi.fn(),
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when closed", () => {
    render(<ConfirmModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders modal content when open", () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText("Delete User")).toBeInTheDocument();

    expect(
      screen.getByText("Are you sure you want to delete this user?"),
    ).toBeInTheDocument();
  });

  it("renders default button labels", () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Confirm",
      }),
    ).toBeInTheDocument();
  });

  it("renders custom button labels", () => {
    render(
      <ConfirmModal
        {...defaultProps}
        confirmLabel="Delete"
        cancelLabel="Go Back"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Delete",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Go Back",
      }),
    ).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Confirm",
      }),
    );

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when cancel button is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);

    fireEvent.click(screen.getByRole("dialog"));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when modal content is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Delete User"));

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it("has correct dialog attributes", () => {
    render(<ConfirmModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAttribute("aria-modal", "true");

    expect(dialog).toHaveAttribute("aria-labelledby", "confirm-modal-title");
  });
});
