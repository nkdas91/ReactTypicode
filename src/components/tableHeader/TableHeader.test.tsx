import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  const defaultProps = {
    searchQuery: "",
    onSearch: vi.fn(),
    limit: 10,
    onLimitChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<TableHeader {...defaultProps} />);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("renders current search value", () => {
    render(<TableHeader {...defaultProps} searchQuery="john" />);

    expect(screen.getByRole("searchbox")).toHaveValue("john");
  });

  it("calls onSearch when user types in search field", async () => {
    const user = userEvent.setup();

    const onSearch = vi.fn();

    render(<TableHeader {...defaultProps} onSearch={onSearch} />);

    await user.type(screen.getByRole("searchbox"), "john");

    expect(onSearch).toHaveBeenCalled();
  });

  it("renders records limit selector", () => {
    render(<TableHeader {...defaultProps} />);

    expect(
      screen.getByLabelText(
        "Select the number of records to display in the list",
      ),
    ).toBeInTheDocument();
  });

  it("renders selected limit value", () => {
    render(<TableHeader {...defaultProps} limit={20} />);

    expect(
      screen.getByLabelText(
        "Select the number of records to display in the list",
      ),
    ).toHaveValue("20");
  });

  it("calls onLimitChange when limit changes", async () => {
    const user = userEvent.setup();

    const onLimitChange = vi.fn();

    render(<TableHeader {...defaultProps} onLimitChange={onLimitChange} />);

    const select = screen.getByLabelText(
      "Select the number of records to display in the list",
    );

    await user.selectOptions(select, "20");

    expect(onLimitChange).toHaveBeenCalledWith("20");
  });
});
